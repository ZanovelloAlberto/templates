const std = @import("std");
const zap = @import("zap");
const p = @import("proto/ok.pb.zig");
const proto = @import("protobuf");
const WebSockets = zap.WebSockets;

const all: std.mem.Allocator = std.heap.page_allocator;

const Context = struct {
    userName: []const u8,
    channel: []const u8,
    // we need to hold on to them and just re-use them for every incoming
    // connection
    subscribeArgs: WebsocketHandler.SubscribeArgs,
    //
    settings: WebsocketHandler.WebSocketSettings,
};

const ContextList = std.ArrayList(*Context);

const ContextManager = struct {
    allocator: std.mem.Allocator,
    channel: []const u8,
    usernamePrefix: []const u8,
    lock: std.Thread.Mutex = .{},
    contexts: ContextList = undefined,

    const Self = @This();

    pub fn init(
        allocator: std.mem.Allocator,
        channelName: []const u8,
        usernamePrefix: []const u8,
    ) Self {
        return .{
            .allocator = allocator,
            .channel = channelName,
            .usernamePrefix = usernamePrefix,
            .contexts = ContextList.init(allocator),
        };
    }

    pub fn deinit(self: *Self) void {
        for (self.contexts.items) |ctx| {
            self.allocator.free(ctx.userName);
        }
        self.contexts.deinit();
    }

    pub fn newContext(self: *Self) !*Context {
        self.lock.lock();
        defer self.lock.unlock();

        var ctx = try self.allocator.create(Context);
        var userName = try std.fmt.allocPrint(
            self.allocator,
            "{s}{d}",
            .{ self.usernamePrefix, self.contexts.items.len },
        );
        ctx.* = .{
            .userName = userName,
            .channel = self.channel,
            // used in subscribe()
            .subscribeArgs = .{
                .channel = self.channel,
                .force_binary = true,
                // .force_text = true,
                .context = ctx,
            },
            // used in upgrade()
            .settings = .{
                .on_open = on_open_websocket,
                .on_close = on_close_websocket,
                .on_message = handle_websocket_message,
                .context = ctx,
            },
        };
        try self.contexts.append(ctx);
        return ctx;
    }
};

//
// Websocket Callbacks
//
fn on_open_websocket(context: ?*Context, handle: WebSockets.WsHandle) void {
    if (context) |ctx| {
        _ = WebsocketHandler.subscribe(handle, &ctx.subscribeArgs) catch |err| {
            std.log.err("Error opening websocket: {any}", .{err});
            return;
        };
        // ctx.settings.binaryType = "arraybuffer";
        // ctx.

        var st: p.Person = .{};

        st.name = proto.ManagedString.static("AAA");
        st.age = 10;
        const r = st.encode(all) catch unreachable;

        std.debug.print("\n --start-- \n", .{});
        for (r) |rvalue| {
            std.debug.print("{}-", .{rvalue});
        }

        std.debug.print("\n --end-- \n", .{});
        const e = proto.MessageMixins(p.Person).decode(r, all) catch unreachable;

        std.debug.print("decoded: {s}\n", .{e.name.getSlice()});
        // say hello
        // var buf: [128]u8 = undefined;
        // const message = std.fmt.bufPrint(
        //     &buf,
        //     "{s} joined the chat.",
        //     .{ctx.userName},
        // ) catch unreachable;

        // // send notification to all others
        WebsocketHandler.publish(.{ .channel = ctx.channel, .message = r });
    }
}

fn on_close_websocket(context: ?*Context, uuid: isize) void {
    _ = uuid;
    if (context) |ctx| {
        _ = ctx;
        // say goodbye
        // var buf: [128]u8 = undefined;
        // const message = std.fmt.bufPrint(
        //     &buf,
        //     "{s} left the chat.",
        //     .{ctx.userName},
        // ) catch unreachable;

        // send notification to all others
        // WebsocketHandler.publish(.{ .channel = ctx.channel, .message = message });
        // std.log.info("websocket closed: {s}", .{message});
    }
}
fn handle_websocket_message(
    context: ?*Context,
    handle: WebSockets.WsHandle,
    message: []const u8,
    is_text: bool,
) void {
    _ = is_text;
    _ = handle;
    if (context) |ctx| {
        // send message
        const buflen = 128; // arbitrary len
        var buf: [buflen]u8 = undefined;

        const format_string = "{s}: {s}";
        const fmt_string_extra_len = 2; // ": " between the two strings
        //
        const max_msg_len = buflen - ctx.userName.len - fmt_string_extra_len;
        if (max_msg_len > 0) {
            // there is space for the message, because the user name + format
            // string extra do not exceed the buffer now, let's check: do we
            // need to trim the message?
            var trimmed_message: []const u8 = message;
            if (message.len > max_msg_len) {
                trimmed_message = message[0..max_msg_len];
            }
            const chat_message = std.fmt.bufPrint(
                &buf,
                format_string,
                .{ ctx.userName, trimmed_message },
            ) catch unreachable;

            // send notification to all others
            WebsocketHandler.publish(
                .{ .channel = ctx.channel, .message = chat_message },
            );
            std.log.info("{s}", .{chat_message});
        } else {
            std.log.warn(
                "Username is very long, cannot deal with that size: {d}",
                .{ctx.userName.len},
            );
        }
    }
}

//
// HTTP stuff
//
//
//
//
var script: []u8 = undefined;
fn on_request(r: zap.SimpleRequest) void {
    const indexhtml = @embedFile("index.html");
    r.setHeader("Server", "zap.example") catch unreachable;

    if (r.path) |rpath| {
        if (std.mem.eql(u8, rpath, "/out.js")) {
            // r.setHeader("Content-Type", "application/wasm") catch unreachable;
            r.sendBody(script) catch unreachable;
        }
    }

    r.sendBody(indexhtml) catch return;
}

fn on_upgrade(r: zap.SimpleRequest, target_protocol: []const u8) void {
    // make sure we're talking the right protocol
    if (!std.mem.eql(u8, target_protocol, "websocket")) {
        std.log.warn("received illegal protocol: {s}", .{target_protocol});
        r.setStatus(.bad_request);
        r.sendBody("400 - BAD REQUEST") catch unreachable;
        return;
    }
    var context = GlobalContextManager.newContext() catch |err| {
        std.log.err("Error creating context: {any}", .{err});
        return;
    };

    WebsocketHandler.upgrade(r.h, &context.settings) catch |err| {
        std.log.err("Error in websocketUpgrade(): {any}", .{err});
        return;
    };
    std.log.info("connection upgrade OK", .{});
}

// global variables, yeah!
var GlobalContextManager: ContextManager = undefined;

const WebsocketHandler = WebSockets.Handler(Context);

// here we go
pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{
        .thread_safe = true,
    }){};
    var allocator = gpa.allocator();

    // const fd = try std.os.open(std.os.argv[1], 0, .{});
    const arg1 = std.mem.span(std.os.argv[1]);
    std.debug.print("file:{s}\n", .{arg1});
    const file = try std.fs.openFileAbsolute(arg1, .{});
    std.debug.print("ok open...\n", .{});
    // c
    script = try file.readToEndAlloc((allocator), 999999);

    GlobalContextManager = ContextManager.init(allocator, "chatroom", "user-");
    defer GlobalContextManager.deinit();

    // setup listener
    var listener = zap.SimpleHttpListener.init(
        .{
            .port = 3010,
            .on_request = on_request,
            .on_upgrade = on_upgrade,
            .max_clients = 1000,
            .max_body_size = 1 * 1024,
            .log = true,
        },
    );
    try listener.listen();
    zap.start(.{
        .threads = 1,
        .workers = 1,
    });
}

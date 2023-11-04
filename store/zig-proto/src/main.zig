const std = @import("std");
const p = @import("protobuf");
const mp = @import("./proto/ok.pb.zig");
const all: std.mem.Allocator = std.heap.page_allocator;
pub fn main() !void {
    // const a: mp.WithEnum = {};
    var a: mp.Person = .{};
    a.name = p.ManagedString.static("ciao");
    a.age = 10;
    const r = try a.encode(all);
    // std.debug.print("to encode: {s}", .{r});

    const e = try p.MessageMixins(mp.Person).decode(r, all);

    std.debug.print("decoded: {s}", .{e.name.getSlice()});
}

test "simple test" {
    var list = std.ArrayList(i32).init(std.testing.allocator);
    defer list.deinit(); // try commenting this out and see if zig detects the memory leak!
    try list.append(42);
    try std.testing.expectEqual(@as(i32, 42), list.pop());
}

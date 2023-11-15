"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyServiceClientImpl = exports.MyServiceServiceName = exports.MyMessage = exports.protobufPackage = void 0;
/* eslint-disable */
var _m0 = require("protobufjs/minimal");
exports.protobufPackage = "myapp";
function createBaseMyMessage() {
    return { name: "", age: 0 };
}
exports.MyMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.age !== 0) {
            writer.uint32(16).int32(message.age);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMyMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.age = reader.int32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            name: isSet(object.name) ? globalThis.String(object.name) : "",
            age: isSet(object.age) ? globalThis.Number(object.age) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.age !== 0) {
            obj.age = Math.round(message.age);
        }
        return obj;
    },
    create: function (base) {
        return exports.MyMessage.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseMyMessage();
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : "";
        message.age = (_b = object.age) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
exports.MyServiceServiceName = "myapp.MyService";
var MyServiceClientImpl = /** @class */ (function () {
    function MyServiceClientImpl(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || exports.MyServiceServiceName;
        this.rpc = rpc;
        this.DoSomething = this.DoSomething.bind(this);
    }
    MyServiceClientImpl.prototype.DoSomething = function (request) {
        var data = exports.MyMessage.encode(request).finish();
        var promise = this.rpc.request(this.service, "DoSomething", data);
        return promise.then(function (data) { return exports.MyMessage.decode(_m0.Reader.create(data)); });
    };
    return MyServiceClientImpl;
}());
exports.MyServiceClientImpl = MyServiceClientImpl;
function isSet(value) {
    return value !== null && value !== undefined;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = exports.Person = exports.Info = exports.protobufPackage = void 0;
/* eslint-disable */
var _m0 = require("protobufjs/minimal");
exports.protobufPackage = "ok";
function createBaseInfo() {
    return {};
}
exports.Info = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    create: function (base) {
        return exports.Info.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (_) {
        var message = createBaseInfo();
        return message;
    },
};
function createBasePerson() {
    return { name: "", age: 0 };
}
exports.Person = {
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
        var message = createBasePerson();
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
        return exports.Person.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBasePerson();
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : "";
        message.age = (_b = object.age) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseAddressBook() {
    return { people: [] };
}
exports.AddressBook = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        for (var _i = 0, _a = message.people; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.Person.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseAddressBook();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.people.push(exports.Person.decode(reader, reader.uint32()));
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
            people: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.people) ? object.people.map(function (e) { return exports.Person.fromJSON(e); }) : [],
        };
    },
    toJSON: function (message) {
        var _a;
        var obj = {};
        if ((_a = message.people) === null || _a === void 0 ? void 0 : _a.length) {
            obj.people = message.people.map(function (e) { return exports.Person.toJSON(e); });
        }
        return obj;
    },
    create: function (base) {
        return exports.AddressBook.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseAddressBook();
        message.people = ((_a = object.people) === null || _a === void 0 ? void 0 : _a.map(function (e) { return exports.Person.fromPartial(e); })) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}

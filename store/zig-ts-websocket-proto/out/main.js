"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = exports.endpoint = exports.port = void 0;
// import env from "./env.json"
exports.port = 3010;
exports.endpoint = "ws://127.0.0.1:".concat(exports.port);
exports.socket = new WebSocket(exports.endpoint);
exports.socket.binaryType = "arraybuffer";
var all_1 = require("./proto/all");
var p = all_1.Person.create({ age: 10, name: "AAA" });
// let writ = Writer()
var bytes = all_1.Person.encode(p).finish();
bytes.forEach(function (element) {
    console.log(element);
});
exports.socket.addEventListener("close", function () {
    console.log("close");
});
exports.socket.addEventListener("open", function (event) {
    console.log("open");
});
exports.socket.addEventListener("message", function (e) {
    var a = all_1.Person.decode(new Uint8Array(e.data));
    console.log(a);
    var bytes = new Uint8Array(e.data);
    bytes.forEach(function (element) {
        console.log(element);
    });
});

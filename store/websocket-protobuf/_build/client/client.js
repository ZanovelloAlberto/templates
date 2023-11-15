"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.ctx = exports.canvas = exports.socket = void 0;
var config_1 = require("../lib/config");
var example_ts_1 = require("../lib/example.ts");
exports.socket = new WebSocket(config_1.endpoint);
exports.canvas = document.createElement("canvas");
exports.ctx = exports.canvas.getContext('2d');
// socket.on('message', (message) => {
//   console.log(`Received from server: ${message}`);
// });
function main() {
    // uiInit()
}
exports.main = main;
exports.socket.addEventListener("close", function () {
    console.log("close");
});
// Connection opened
exports.socket.addEventListener("open", function (event) {
    var u = { age: 1, name: "cento" };
    var v = example_ts_1.MyMessage.encode(u);
    console.log(v);
    // socket.send(v.)
});
// Listen for messages
// socket.addEventListener("message", handle);
main();

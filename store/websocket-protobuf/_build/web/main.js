"use strict";
// socket.on('open', () => {
//   console.log('Connected to the server.');
//   socket.send('Hello, server!');
// });
// let enda = "ws://localhost:4444"
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.socket = void 0;
var config_1 = require("../lib/config");
exports.socket = new WebSocket(config_1.endpoint);
// socket.on('message', (message) => {
//   console.log(`Received from server: ${message}`);
// });
function main() {
    // socket.onmessage = (e) => {
    //   console.log(`Received from server: ${e.data}}`);
    // }
    // socket.send("ciao")
    // return `Hello ${who}! `;
    //   socket.send("prova")
}
exports.main = main;
// Create WebSocket connection.
// Connection opened
exports.socket.addEventListener("open", function (event) {
    exports.socket.send(JSON.stringify({ type: "due", b: "fanculo" }));
});
// Listen for messages
exports.socket.addEventListener("message", function (event) {
    console.log("Message from server ", event.data);
});
main();

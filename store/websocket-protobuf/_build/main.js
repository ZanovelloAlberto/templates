"use strict";
// socket.on('open', () => {
//   console.log('Connected to the server.');
//   socket.send('Hello, server!');
// });
// let enda = "ws://localhost:4444"
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var endpoint = "ws://127.0.0.1:8080";
var socket = new WebSocket(endpoint);
// socket.on('message', (message) => {
//   console.log(`Received from server: ${message}`);
// });
function main() {
    // socket.onmessage = (e) => {
    //   console.log(`Received from server: ${e.data}}`);
    // }
    // socket.send("ciao")
    // return `Hello ${who}! `;
    var canvas = document.createElement("canvas");
    document.title = "ciao";
    canvas.id = 'myCanvas';
    // document.append(document.createElement('body'))
    document.body.appendChild(canvas);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'red';
            ctx.fillRect(50, 50, 200, 100);
        }
        else {
            alert('2D context is not supported by your browser.');
        }
    }
    else {
        alert('Canvas is not supported by your browser.');
    }
    //   socket.send("prova")
}
exports.main = main;
// Create WebSocket connection.
// Connection opened
socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({ type: "due", b: "fanculo" }));
});
// Listen for messages
socket.addEventListener("message", function (event) {
    console.log("Message from server ", event.data);
});
main();

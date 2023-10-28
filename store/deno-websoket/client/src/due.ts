

// socket.on('open', () => {
//   console.log('Connected to the server.');
//   socket.send('Hello, server!');
// });
const endpoint = "ws://127.0.0.1:8080";
const socket = new WebSocket(endpoint);
// socket.on('message', (message) => {
//   console.log(`Received from server: ${message}`);
// });
export function main() {

  
  
  socket.onmessage = (e) => {
    console.log(`Received from server: ${e.data}}`);
  }
  // socket.send("ciao")
  // return `Hello ${who}! `;
  let canvas = document.createElement("canvas")

  document.title = "ciao"
  canvas.id = 'myCanvas';
  // document.append(document.createElement('body'))
  document.body.appendChild(canvas)

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(50, 50, 200, 100);
    } else {
      alert('2D context is not supported by your browser.');
    }
  } else {
    alert('Canvas is not supported by your browser.');
  }
  socket.send("prova")

}
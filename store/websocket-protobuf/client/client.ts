

import { endpoint } from "../lib/config";
import { MyMessage } from "../lib/example.ts";

export const socket = new WebSocket(endpoint);
export let canvas = document.createElement("canvas")
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
// socket.on('message', (message) => {
//   console.log(`Received from server: ${message}`);
// });
export function main() {
  // uiInit()
}
socket.addEventListener("close", () =>{
  console.log("close");
  
})
// Connection opened

socket.addEventListener("open", (event) => {
  let u = {age : 1, name: "cento"} as MyMessage;
  let v =  MyMessage.encode(u)
  console.log(v);
  
  // socket.send(v.)
});

// Listen for messages

// socket.addEventListener("message", handle);
main()
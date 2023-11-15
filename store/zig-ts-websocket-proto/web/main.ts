

// import env from "./env.json"
export const port = 3010;
export const endpoint = `ws://127.0.0.1:${port}`;
export const socket = new WebSocket(endpoint);
socket.binaryType = "arraybuffer"
import { Person } from "./proto/all"

let p = Person.create({age: 10, name: "AAA"})
// let writ = Writer()
let bytes =Person.encode(p).finish()
bytes.forEach(element => {
    console.log(element);
    
});
socket.addEventListener("close", () => {
    console.log("close");

})

socket.addEventListener("open", (event) => {
    console.log("open");
    
});

socket.addEventListener("message", (e) => {

    let a = Person.decode(new Uint8Array(e.data))
    console.log(a);
    
    
    let bytes = new Uint8Array(e.data)
    bytes.forEach(element => {
        console.log(element);
        
    });

});


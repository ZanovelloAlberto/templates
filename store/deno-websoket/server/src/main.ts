// import { Webview } from "https://deno.land/x/webview/mod.ts";

// const html = `
//   <html>
//   <body>
//     <h1>Hello from deno v${Deno.version.deno}</h1>
//     <button onClick={luca}>luca</button>
//   </body>
//   </html>
// `;

// // Deno.args
// const webview = new Webview();
// webview.bind("luca", async () => {
//   const file = await Deno.create("foo.txt");
//   const encoder = new TextEncoder();
//   console.log("perche ")
//   file.write(encoder.encode("caio"));
// });
// webview.run();
import { Webview } from "https://deno.land/x/webview/mod.ts";

// import { connectWebSocket, WebSocket } from "https://deno.land/std/ws/mod.ts";

// import {
//   serveDir,
//   serveFile,
// } from "https://deno.land/std@0.202.0/http/file_server.ts";

import {
  WebSocketClient,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.1.4/mod.ts";

const wss = new WebSocketServer(8080);
wss.on("connection", function (ws: WebSocketClient) {
  ws.on("message", function (message: string) {
    console.log(message);
    ws.send(message);
  });
});

// let uno = Deno.serve((req: Request) => {
//   const pathname = new URL(req.url).pathname;

//   return serveDir(req, {
//     fsRoot: Deno.args[0],
//   });

//   return new Response("404: Not Found", {
//     status: 404,
//   });
// });
let a = Deno.args[0] + "/index.js";
let script = await Deno.readTextFile(a); // import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
// Deno.open(a).then((e)=> {e.statSync})
console.log(script);
const html = `

  <html>
  <body>
  ok
  <script>
${script} 
</script>
  </body>
  </html>
`;

// console.log(Deno.args)

// const controller = new AbortController();
// const server = serve(() =>
//   new Response("<h1>Hello World</h1>", {
//     headers: new Headers({
//       "content-type": "text/html",
//     }),
//   }), { port: 8080, signal: controller.signal });

const webview = new Webview();

// webview.init();
webview.navigate(`data:text/html,${encodeURIComponent(html)}`);
// let counter = 0;
// webview.bind("press",async (a, b, c) => {
//   console.log(a, b, c);
//   let f = await Deno.create("file")
//     const encoder = new TextEncoder();
//     f.write(encoder.encode("caio"));
//     console.log("done create and write caio ")
//     return { times: counter++ };
// });
// webview.bind("write", () => {
//   Deno.open("file", { read: true, write: true }).then((file) => {
//     const encoder = new TextEncoder();
//     file.write(encoder.encode("ddd"));
//   });
// });

// webview.bind("log", (...args) => console.log(...args));

webview.run();

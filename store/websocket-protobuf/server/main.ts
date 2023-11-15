import { port } from "../lib/config.ts";
import { MyMessage } from "../lib/example.ts";

import { serveHtml } from "./serveHtml.ts";


Deno.serve({ port }, (request: Request): Response => {

  if (request.headers.get("upgrade") == "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(request);
    socket.addEventListener("open", () => {
      console.log("a client connected!");
    });
    socket.addEventListener("message", (event: MessageEvent) => {
      // let d = JSON.parse(event.data);
      let r = MyMessage.decode(event.data)
      console.log(r);
      
    
    });
    return response;
  }


  return serveHtml()


});

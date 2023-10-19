import { Webview } from "https://deno.land/x/webview@0.7.6/mod.ts";

import { marked } from 'https://deno.land/x/marked/mod.ts';

const html = marked.parse(`
  # Hello, World!
  ok no play 
  - uno 
  - due 
  - tre

  slfll 
  ad
  f
  asd
  f
  // `);


// const html = `
//   <html>
//   <body>
//     <h1>Hello from deno v${Deno.version.deno}</h1>
//   </body>
//   </html>
// `;

const webview = new Webview();

webview.navigate(`data:text/html,${encodeURIComponent(html)}`);
webview.run();

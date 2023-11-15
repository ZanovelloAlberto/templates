let s = await Deno.readTextFile(Deno.args[0]);


export const serveHtml = () => {
  const body = `
    <html>
    <body>
    <script>
    ${s}
    </script>
    </body>
    </html>
    `;

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
};

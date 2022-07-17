export const generateHTMLByHttp = (_http: string): string => {
  const http = _http || "";
  return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                html,
                body,
                iframe {
                    height:100%;
                    width:100%;
                    position:absolute;
                    padding:0;
                    margin:0;
                    overflow:hidden;
                    background:#ffffff;
                }
            </style>
            <title>Document</title>
        </head>
        <body>
            <iframe id="browser" frameBorder="0" src="${http}"></iframe>
        </body>
    </html>`;
};

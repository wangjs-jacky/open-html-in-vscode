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
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    padding: 0;
                    margin: 0;
                    overflow: hidden;
                    background: #ffffff;
                }
            </style>
            <title>Document</title>
        </head>

        <body>
            <iframe id="browser" frameBorder="0" src="${http}"></iframe>
            <script>
                const iframeElement = document.getElementById("browser");
                window.addEventListener("message", event => {
                    console.log("event", event);
                    const message = event.data;
                    if (message.command === "reload") {
                        console.log("reload");
                        updateIframeUrl();
                    };
                });
                function updateIframeUrl() {
                    iframeElement.src = "${http}";
                }
            </script>
        </body>
        </html>
    `;
};

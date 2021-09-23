"use strict";
const port = 3000,
    http = require("http"),
    httpStatus= require("http-status-codes"),
    app = http.createServer((request, response) => {
        console.log("received an incoming request!");
        response.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
    

        let responseMessage = "<h1>Hello, Universe!</h1>";
        response.write(responseMessage);
        response.end();
        console.log(`Sent a response : ${responseMessage}`);
    });

    app.listen(port);
    console.log(`The server has started an is listening on port number : ${port}`);
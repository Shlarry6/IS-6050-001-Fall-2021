"use strict";

const port = 3000,
    http = require('http'),
    httpStatus = require('http-status-codes'),
    fs = require('fs');

const routeMap = {
    "/": "view/index.html"
};

http
    .createServer((request, response) => {
        response.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        if(routeMap[request.url]) {
            fs.readFile(routeMap[request.url], (error, data) => {
                response.write(data);
                response.end();
            });
        } else {
            response.end("<h1>Sorry, not found.</h1>");
        }
    })
    .listen(port);
    console.log(`The server has started and is listening on port number: ${port}`);
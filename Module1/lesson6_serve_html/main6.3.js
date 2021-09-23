"use strict";

const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs");

const getViewUrl = (url) => {
    return `views${url}.html`;
};

http.createServer((request, response) => {
    let viewUrl = getViewUrl(request.url);
    fs.readFile(viewUrl,(error, data) => {
        if(error) {
            response.writeHead(httpStatus.NOT_FOUND);
            response.write("<h1>FILE NOT FOUND</h1>");
        } else {
            response.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            });
            response.write(data);
        }
        response.end();
    });
})
.listen(port);
console.log(`The server has started and is listening to port number: ${port}`);
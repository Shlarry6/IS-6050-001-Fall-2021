"use strict";

const port = 3000,
    http = require('http'),
    httpStatusCodes = require('http-status-codes'),
    router = require('./router'),
    fs = require('fs'),
    plainTextContentType = {
        "Content-Type": "text/plain"
    },
    htmlContentType = {
        "Content-Type": "text/html"
    },
    customReadFile = (file, response) => {
        fs.readFile(`./${file}`, (errors, data) => {
            if(errors) {
                console.log("Error reading the file...");
            }
            response.end(data);
        });
    };

router.get("/", (request, response) => {
    response.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("INDEX");
});

router.get("/index.html", (request, response) => {
    response.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", response);
});

// adding GET route to the about.html page
router.get("/about.html", (request, response) => {
    response.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/about.html", response);
});

router.post("/", (request, response) => {
    response.writeHead(httpStatusCodes.OK, plainTextContentType);
    response.end("POSTED");
});

http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);
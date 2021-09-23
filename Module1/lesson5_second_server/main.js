"use strict";

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
}

const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us here</h1>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
};

const port = 3000,
    http = require('http'),
    httpStatus = require('http-status-codes'),
    app = http.createServer((request, response) => {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });

        if (routeResponseMap[request.url]) {
            setTimout(() => response.end(routeResponseMap[request.url]), 2000);
        } else {
            response.end("<h1>Welcome!</h1>");
        }
    });

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);    



// first setup for port that responds with url method and headers when the client accesses the site.

// const port = 3000,
//     http = require('http'),
//     httpStatus = require('http-status-codes'),
//     app = http.createServer();

// app.on("request", (request, response) => {
//     var body = [];
//     request.on("data", (bodyData) => {
//         body.push(bodyData);
//     });
//     request.on("end", () => {
//         body = Buffer.concat(body).toString();
//         console.log(`Request Body Content: ${body}`);
//     });

//     console.log(`Method: ${getJSONString(request.method)}`);
//     console.log(`URL: ${getJSONString(request.url)}`);
//     console.log(`Headers: ${getJSONString(request.headers)}`);

//     response.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html"
//     });

//     let responseMessage = "<h1>This will show on the screen.</h1>";
//     response.end(responseMessage);
// });

// app.listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);
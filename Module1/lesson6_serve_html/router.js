"use strict";

const httpStatus = require('http-status-codes'),
    htmlContentType = {
        "Content-Type": "text/html"
    },
    routes = {
        "GET": {
            "/info": (request, response) => {
                response.writeHead(httpStatus.OK, {
                    "Content-Type": "text/plain"
                })
                response.end("Welcome to the Info Page!")
            }
        },
        'POST': {}
    };

exports.handle = (request, response) => {
    try {
        if(routes[request.method][request.url]) {
            routes[request.method][request.url](request, response);
        } else {
            response.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            response.end("<h1>No such file exists</h1>");
        }
    } catch(ex) {
        console.log("error: " + ex);
    }
};

exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};
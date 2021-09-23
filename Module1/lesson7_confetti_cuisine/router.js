// This module provides a "routes" object that stores all application routes for both GET and POST requests
// The post and get methods of this module register a new route by adding a new key/value pair to the GET and POST nested objects
// The handle method is called to execute the proper method when a route is called

"use strict";

const httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");

// routes is an object used as a data structure to associate different URLs (such as "/contact.html") with specific route-handler functions.
// A route-handler function executes when an HTTP request is made to a certain URL.
// The routes object is divided into two keys, GET and POST, each of which are objects themselves.
// The routes object starts out empty, but is populated when an external module calls the post and get export functions below.
const routes = {
  "GET": {},
  "POST": {}
};

// this function will be invoked by the server to run the proper handler function, looked up in the routes object.
exports.handle = (req, res) => {
  try {
    //Look up and call the function in the routes object for the given request type and given URL.
    routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.html);
    utils.getFile("views/error.html", res);
  }
};

// this function is used to register GET routes
exports.get = (url, action) => {             
  routes["GET"][url] = action;
};

// this function is used to register POST routes
exports.post = (url, action) => {
  routes["POST"][url] = action;
};

exports.routes = routes;

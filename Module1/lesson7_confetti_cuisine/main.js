"use strict";

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  router = require("./router"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");

// These function calls (router.get and router.post) associate a certain URL (or route) with a certain route handler function in router.js.
// For example, the following function registers a GET route for the URL "/" (the home page) with a handler function that retrieves the
// contents of index.html and sends the contents back in the response.
// All route handler functions take at least two arguments:  req (representing the HTTP request) and res (representing the HTTP response).
  router.get("/", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.html);
    utils.getFile("views/index.html", res);
  });

  router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.html);
    utils.getFile("views/courses.html", res);
  });

  router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.html);
    utils.getFile("views/contact.html", res);
  });

  router.post("/", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.html);
    utils.getFile("views/thanks.html", res);
  });

  router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.png);
    utils.getFile("public/images/graph.png", res);
  });
  router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.jpg);
    utils.getFile("public/images/people.jpg", res);
  });
  router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.jpg);
    utils.getFile("public/images/product.jpg", res);
  });
  router.get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.css);
    utils.getFile("public/css/confetti_cuisine.css", res);
  });
  router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap.css", res);
  });
  router.get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.js);
    utils.getFile("public/js/confetti_cuisine.js", res);
  });
  
  //inclass addition for about.html
  router.get("/about.html", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, contentTypes.html);
    utils.getFile("views/about.html", res);
  });

  // Start the server and pass in route.handle as the request listener.
  // This means that the router.handle function will execute each time the server receives an HTTP request.
  // This function looks up and executes the appropriate route handler function depending on the URL in the request.
  http.createServer(router.handle).listen(port);         
  console.log(`The server is listening on
   port number: ${port}`);

   console.log(router.routes);



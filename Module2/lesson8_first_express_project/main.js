"use strict";

// Import required libraries
const port = 3000,
  express = require("express"),
  app = express();

//building a new one for in class excersise
// 3 componenets of an express route
// 1. HTTP method (GET, POST, etc...). Using the corresponding method of the app object. (e.g., app.get)
// 2. Path of the request. (part of the url after the domain name)
// 3. Handler function. Callback function that executes when the path is requested.

//define a middleware function for authenticating a user
const authenticateUser = (req, res, next) => {
  console.log("authenticating user");
  next();
}

const writeDataToDatabase = (req, res, next) => {
  console.log("write data to database");
  next();
}

const prepareResponse = (req, res, next) => {
  console.log("Prepare the response");
  next();
}
// use authenticate user middleware for any request.
app.use(authenticateUser);

app.get("/test", (req, res) => {
  console.log("Request URL: " + req.url);
  res.send("This is the test route");
});

app.get("/about", (req, res) => {
  res.send("This is our about page");
});

//test route parameters
app.get("/testrouteparams/:id/param2/:id2", (req, res) => {
  console.log("Route Parameters: ", req.params);
  res.send("Testing route parameters");
});

//test query string parameters
app.get("/testqueryparams", (req, res) => {
  console.log("Query string param: ", req.query);
  console.log("Value 1 is: ", req.query.val1)
  res.send("Testing query string params");
});

app.get("/testmiddleware", authenticateUser, writeDataToDatabase, prepareResponse, (req, res) => {
  res.send("Sending response to client");
});


// Register a GET route for the home page
app.get("/", (req, res) => {

  // Log various properties of the req object
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);

  // Send back text in the response
  res.send("Hello, Universe!");
});

// Launch server on port defined above
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
  });

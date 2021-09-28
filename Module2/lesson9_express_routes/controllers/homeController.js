"use strict";

// Function for reporting request parameters passed in a particular path:  /items/:vegatable
exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

// Middleware Function that logs basic info about requests
exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

// Function for handling POST requests
exports.handlePosts = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
};

// Function for handling a GET request to /
exports.showHomePage = (req, res) => {
  res.send("Welcome to the home page!");
}
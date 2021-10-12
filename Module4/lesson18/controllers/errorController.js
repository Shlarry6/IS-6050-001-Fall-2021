"use strict";

const httpStatus = require("http-status-codes").StatusCodes;

// Regular middleware function that catches all requested routes that are not handled elsewhere
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};


// Error-handling middleware function that logs the error stack to the console and logs the next error-handling middleware function
// Note that all error-handling middleware functions take FOUR parameters:  error, req, res, next
// This distinguishes them from "regular" middleware functions that have only two (req, res) or three (req, res, next) parameters
// Calling next(error) will call the next error-handling middleware function in the chain
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};


// Error handling middleware function that sets the error type and returns an error message in the response.
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

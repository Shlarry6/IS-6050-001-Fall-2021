"use strict";

exports.logErrors = (error, req, res, next) => { //add middleware to handle errors
    console.error(error.stack); // log the error stack.
    next(error); // pass the error to the next middleware
};

const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res) => { // respond with a 404 status code.
    let erroCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {
        root: "./"
    });
};

exports.respondInternalError = (error, req, res, next) => { // catch all errors and respond with a 500 status.
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
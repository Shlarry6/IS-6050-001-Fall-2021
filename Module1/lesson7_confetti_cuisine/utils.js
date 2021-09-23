// This module exports a single function, getFile, that uses the fs module to read a file and send it's contents back in the http response.
// If there is an error reading the file an error is sent back in the response.

"use strict";

const fs = require("fs"),
  httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes");

  
  module.exports = {

    // getFile is a function that reads the contents of a file (an html page) and sends it back in an HTTP resonse.
    // It is exported so other modules can use it.

    getFile: (file, res) => {

      // Call fs.readFile (which is ASYNCHRONOUS) to read the contents of a given html file
      // Takes two arguments:  (1) The file name and (2) a callback function that is called when the file is read.
      // The callback function uses the error-first pattern.  If something goes wrong in the read operation,
      // the callback is called with a non-null error parameter and a null data parameter.  Otherwise, error is null and data 
      // contains the file contents.

      fs.readFile(`./${file}`, (error, data) => {
        if (error) {
          
          // Write an error back to the response
          res.writeHead(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.html);
          res.end("There was an error serving content!");
        }

        // Pass the file contents and end the response
        res.end(data);
      });
    }
  };

const httpStatus = require("http-status-codes").StatusCodes;

// Handle client-side file-not-found error
exports.pageNotFoundError = (req, res) => {               
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("error");
};

// Handle server-side processing error
exports.internalServerError = (error, req, res, next) => {   
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`)
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is taking a nap!`);
};
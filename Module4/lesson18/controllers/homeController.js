"use strict";

module.exports = {

  // Render the contact view
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  // Render the index view (homepage)
  index: (req, res) => {
    res.render("index");
  },

  // Log all incoming requests to the console (middleware)
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
};

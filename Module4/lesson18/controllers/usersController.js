"use strict";

const User = require("../models/user");

module.exports = {

  // Retrieve all users from database and attach the results to res.locals
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  // Render the users/index view to display all users
  indexView: (req, res) => {
    res.render("users/index");
  }
};

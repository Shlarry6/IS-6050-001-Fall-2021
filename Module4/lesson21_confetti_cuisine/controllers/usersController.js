"use strict";

const User = require("../models/user"),

// Internal utility function that takes a request body and extracts it's values into an object that matches the user schema
  getUserParams = body => {
    return {
      name: {
        first: body.first,
        last: body.last
      },
      email: body.email,
      password: body.password,
      zipCode: body.zipCode
    };
  };

// Exported request-handler functions

module.exports = {

  // Retrieve all users from the database, attach user data to res.locals, and call next() (another function will render the view)
  // index: (req, res, next) => {
  //   User.find()
  //     .then(users => {
  //       res.locals.users = users;
  //       next();
  //     })
  //     .catch(error => {
  //       console.log(`Error fetching users: ${error.message}`);
  //       next(error);
  //     });
  // },

  //new vesion in class exercise vesrion of index using async/await
  // async-await can only be used in functions but its WAY easier to read and understand.
  index: async (req, res, next) => {
    try{
      let users = await User.find();
      res.locals.users = users;
      next();
    } catch (error) {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    }
  },

  // Render the users/index view to display all users
  indexView: (req, res) => {
    res.render("users/index");
  },

  // Render the users/new view to allow inserting a new user
  new: (req, res) => {
    res.render("users/new");
  },

  // Create (insert) a new user using data submitted in the users/new view
  // Attach a redirect path and the new user to res.locals and call next() (another function will render the view)
  // create: (req, res, next) => {
  //   let userParams = getUserParams(req.body);

  //   User.create(userParams)
  //     .then(user => {
  //       res.locals.redirect = "/users";
  //       res.locals.user = user;
  //       next();
  //     })
  //     .catch(error => {
  //       console.log(`Error saving user: ${error.message}`);
  //       next(error);
  //     });
  // },

  create: async (req, res, next) => {
    let userParams = getUserParams(req.body);
    try {
      let user = await User.create(userParams);
      res.locals.redirect = "/users";
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    }
  },

  // Utility function that redirects the request to the value stored in res.locals.redirect (if it exists)
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  // Retreive a single user from the database by id.
  // Attach the user object to res.locals and call next() (another function will render the view)
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId).populate("courses")
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  // Render the view that shows data for a single user
  showView: (req, res) => {
    res.render("users/show");
  },


  // Retrieve a single user from the database by id
  // Render the users/edit view passing in the user data to be edited
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  // Update a single user by their id
  // Attach a redirect path and the updated user to res.locals and call next() (another function will render the view)
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = getUserParams(req.body);

    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

  // Delete a single user by their id
  // Attach a redirect path to res.locals and call next() (another function will render the view)
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  }
};

"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),

  // Import express.Router() to set up an independent router instance for the app
  // This will be useful later for creating a more modular route structure
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController.js"),
  usersController = require("./controllers/usersController.js"),
  coursesController = require("./controllers/coursesController.js"),
  mongoose = require("mongoose"),

  // Use methodOverride package as middleware to override GET and POST requests with other HTTP methods (such as PUT and DELETE)
  methodOverride = require("method-override");

// Connect mongoose to database
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson21?retryWrites=true&w=majority"); // ATLAS CONNECTION STRING HERE

// Set app variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Use methodOverride package as middleware to override GET and POST requests with other HTTP methods (such as PUT for updates and DELETE for deletes)
// The overriding method is passed in the query string as a _method parameter (e.g., /users/:id/update?_method=PUT)
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
})
);

// Use other built-in middleware
router.use(layouts);
router.use(express.static("public"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


// ************  ROUTES ***************** //

//!!!THE ORDER OR ROUTES AND MIDDLEWARE MATTERS!!!

// Home route
router.get("/", homeController.index);

//User routes
router.get("/users", usersController.index, usersController.indexView);                   // GET: Retrieve an array of all users in the database and display in a view (users/index)
router.get("/users/new", usersController.new);                                            // GET: Render the view for inserting a new user (users/new)
router.post("/users/create", usersController.create, usersController.redirectView);       // POST: Create (insert) a new user in the database and redirect to the users/index view
router.get("/users/:id/edit", usersController.edit);                                      // GET: Render the view for editing an existing user (users/edit)
router.put("/users/:id/update", usersController.update, usersController.redirectView);    // PUT: Update a user in the database and redirect to the users/show view
router.get("/users/:id", usersController.show, usersController.showView);                 // GET: Render the view to show data for an individual user (users/show)
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView); // DELETE: Delete a user and redirect to the users/index view

// Subscriber routes (same functions as for users)
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

// Course routes (same functions as for users)
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);


// Error-handling middleware
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// Tell app that we want to use the router object to route all requests
// If a path is provided to app.use as the first argument, it will match any requests that START WITH that path
// Providing the path "/" means that this middleware will apply to ALL requests
app.use("/", router);

// Launch the app
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

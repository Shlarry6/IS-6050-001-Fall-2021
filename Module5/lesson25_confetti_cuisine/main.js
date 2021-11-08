"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController.js"),
  usersController = require("./controllers/usersController.js"),
  coursesController = require("./controllers/coursesController.js"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  expressSession = require("express-session"),
  expressValidator = require("express-validator"),
  connectFlash = require("connect-flash"),
  User = require("./models/user"),
  MongoStore = require("connect-mongo");

mongoose.connect("mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson25?retryWrites=true&w=majority"); //ATLAS CONNECTION STRING HERE

// ********  APP SETTINGS ********

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// ********  APP MIDDLEWARE ********

router.use(methodOverride("_method", {methods: ["POST", "GET"] }));
router.use(layouts);
router.use(express.static("public"));
router.use(express.urlencoded({extended: false}));
router.use(express.json());

// Set up session
router.use(
  expressSession({
    secret: "secretCuisine123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson25?retryWrites=true&w=majority"
    })
  })
);

// Flash mesagges
router.use(connectFlash());

// Configure Passport
router.use(passport.initialize()); // Initialize passport
router.use(passport.session()); // Connect passport to the session
passport.use(User.createStrategy()); // Tell passport to use the User model to create a new local authentication strategy with the correct options (from passport-local-mongoose)
passport.serializeUser(User.serializeUser()); // Tell passport to use the User model to add a basic user identifier to the session
passport.deserializeUser(User.deserializeUser()); // Tell passport to use the User model to retrieve the full user object based on the user identifier stored in the session


// Middleware function to attach user and flash info to res.locals for easy access in views
router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// ********  ROUTES ********

router.get("/", homeController.index);

//topsecret
router.get("/topsecret", usersController.verifyAuthentication, (req, res) => {
  res.send("This is a top-secret resource");
})

// User routes
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id/edit", usersController.verifyAuthentication, usersController.edit);
router.put("/users/:id/update", usersController.verifyAuthentication, usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.verifyAuthentication, usersController.delete, usersController.redirectView);

// Subscriber routes
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post( "/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

// Course routes
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// Error-handling routes
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// Mount router as app middleware
app.use("/", router);

// Launch app
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

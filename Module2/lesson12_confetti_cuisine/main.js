"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController");

  // Set port and view engine
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Tell app to use EJS layouts
app.use(layouts);

// Tell app where to find static files
app.use(express.static("public"));

// Tell app to use json and urlencoded Express.js middleware functions to interpret incoming request bodies
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Set default route for home
app.get("/", homeController.showHome);


// Add callback functions for other routes
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

// Add error routes after all other routes (act as catch-alls)
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Tell app to listen
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
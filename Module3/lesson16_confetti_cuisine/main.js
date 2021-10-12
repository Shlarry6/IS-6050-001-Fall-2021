"use strict";

// Import required libraries
const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  layouts = require("express-ejs-layouts");

// Import Mongoose rather than working with MongoDB directly
const mongoose = require("mongoose");
const subscriber = require("./models/subscriber");

// Tell Mongoose to connect to database
const dbconnectionstring = "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson16?retryWrites=true&w=majority";  //PUT YOUR ATLAS CONNECTION STRING HERE!!!!!!
mongoose.connect(dbconnectionstring).then(() => {
  console.log("Mongoose connected!");
}).catch((error) => {
  console.log("Error: ", error);
});

// Set application variables
app.set("view engine", "ejs"); // Use EJS
app.set("port", process.env.PORT || 3000); // Set port to PORT env variable or 3000
app.use(express.urlencoded({extended: false})); // Use built-in middleware to parse request body data from html forms (urlencoded)
app.use(express.json()); // Use built-in middleware to parse request body data in JSON format
app.use(layouts); // Tell the app that it should use express-ejs-layouts
app.use(express.static("public")); // Tell the app where to find static resources

// ***** ROUTES ********
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers/delete/:id", subscribersController.deleteSubscriber);

app.get("/courses", homeController.showCourses);
app.post("/contact", homeController.postedSignUpForm);

// ******* Error-handling middleware **********

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// ************ Launch server **************

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

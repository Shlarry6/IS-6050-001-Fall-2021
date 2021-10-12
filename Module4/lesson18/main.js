"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  Subscriber = require("./models/subscriber");

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson17?retryWrites=true&w=majority"); // ATLAS CONNECTION STRING HERE

// Test connection (this is soon to be deprecated)
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// Set app variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Set app middleware
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(homeController.logRequestPaths);

// Routes
app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

app.get("/users", usersController.index, usersController.indexView);
app.get("/subscribers", subscribersController.index, subscribersController.indexView);
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/subscribersapi", subscribersController.index, subscribersController.sendBackDataAsJSON);

app.post("/subscribe", subscribersController.saveSubscriber);


// Error-handling middleware
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// Launch app
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

"use strict";
// Import needed modules
const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  Recipe = require("./models/recipe");

//adding Mongoose Promises
mongoose.Promise = global.Promise;

// Set application variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/recipe_db?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

var recipe1 = new Recipe({
  name: "tacos",
  ingredient: "meat, cheese, toppings",
  timeToMake: 4
});
recipe1.save((error, savedDocument) => {
  if(error) console.log(error);
  console.log(savedDocument);
});
Recipe.create(
  {
    name: "tacos",
    ingredient: "meat, cheese, toppings",
    timeToMake: 4
  },
  function (error, savedDocument) {
    if(error) console.log(error);
    console.log(savedDocument);
  }
);

var query2 = Recipe.findOne({
  name: "tacos"
})
.where("ingredient", /meat/);
query2.exec((error, data) => {
  if(data) console.log(data.name);
});

//Add subscribers to the database
var subscriber1 = new Subscriber({
  name: "Mike Sears",
  email: "m@sears.com"
});
subscriber1.save((error, savedDocument) => {
  if (error) console.log(error);
  console.log(savedDocument);
});
Subscriber.create(
  {
    name: "Mike Sears",
    email: "m@sears.com"
  },
  function (error, savedDocument) {
  if (error) console.log(error);
  console.log(savedDocument);
  }
);

//Example query to run in main.js
var myQuery = Subscriber.findOne({
  name: "Mike Sears"
})
.where("email", /sears/);
myQuery.exec((error, data) => {
  if(data) console.log(data.name);
});

// Set up application middleware
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(homeController.logRequestPaths);

//  Routes for testing
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => { // pass the request to the getAllSubscribers function.
  console.log(req.data);                          //log data from the request object
  res.render("subscribers", {subscribers: req.data});                             //render the data on the browser window
});
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);


// Routes for home page, courses page, and contact page
app.get("/", homeController.index);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showContact);
app.post("/contact", homeController.postContact);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);


// Set up error handling middleware at the end
// These should only be applied if no other routes apply
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);


// Launch the server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

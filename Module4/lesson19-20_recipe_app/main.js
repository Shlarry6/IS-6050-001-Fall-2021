"use strict";

const { application } = require("express");

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  router = express.Router(),
  methodOverride = require("method-override"),
  Subscriber = require("./models/subscriber");

mongoose.connect("mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/recipe_db?retryWrites=true&w=majority"); // ATLAS CONNECTION STRING HERE

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use("/", router);
router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());
router.use(homeController.logRequestPaths);

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/courses", coursesController.index, coursesController.indexView);

//create new user routes
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);

//show user id view
router.get("/users/:id", usersController.show, usersController.showView);

//edit and update users routes
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);

//delete route
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.post("/subscribe", subscribersController.saveSubscriber);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

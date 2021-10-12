"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {

  // Retrieve all subscribers from database and attach the results to res.locals
  index: (req, res, next) => {
    Subscriber.find({})
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },

  // Render the subscribers/index view to display all subscribers
  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  //send subscribers back to database
  sendBackDataAsJSON: (req, res) => {
    res.json(res.locals.subscribers);
  },

  // Save a new subscriber to the database and render the "thanks" view
  saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });
    newSubscriber
      .save()
      .then(result => {
        res.render("thanks");
      })
      .catch(error => {
        if (error) res.send(error);
      });
  }
};

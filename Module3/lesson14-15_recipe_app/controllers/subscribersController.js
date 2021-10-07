"use strict";
const mongoose = require("mongoose"),
    Subscriber = require("../models/subscriber");

    /* before using promises
exports.getAllSubscribers = (req, res, next) => { //Export getAllSubscirbers to pass data from teh database to the next middleware function
    Subscriber.find({}, (error, subscribers) => { //Query with find on the subscriber model.
        if (error) next(error);                   //Pass an error to the next middleware function
        req.data = subscribers;                   //Set data that comes back from MongoDB on request object
        next();                                   //Continue to the next middlware function.
    });
};
    */

//after using promises
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
    .exec() //return a promise from the find query.
    .then((subscribers) => {
        res.render("subscribers", {
            subscribers: subscribers
        });
    })
    .catch((error) => {
        console.log(error.message);
        return [];
    })
    .then(() => {
        console.log("promise complete");
    });
};


exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};
/* before promises
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save((error, result) => {
        if(error) res.send(error);
        res.render("thanks");
    });
};*/
//after promises
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save()
    .then(result => {
        res.render("thanks");
    })
    .catch(error => {
        if(error) res.send(error);
    });

};

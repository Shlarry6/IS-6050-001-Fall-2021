"use strict";

const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    Course = require("./models/course"),
    User = require("./models/user");

var testUser;

mongoose.connect(
    "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson17?retryWrites=true&w=majority"
);

User.create({
    name: {
        first: "Mike",
        last: "Sears"
    },
    email: "Mike@Mikegang.com",
    password: "admin",
})
.then(user => {
    testUser = user;
    return Subscriber.findOne({
        email: user.email
    });
})
.then(subscriber => {
    testUser.subscribedAccount = subscriber;
        testUser.save().then(user => console.log("user updated"));
})
.catch(error => console.log(error.message));
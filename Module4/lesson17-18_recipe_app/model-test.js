"use strict";

const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    Course = require("./models/course");

var testCourse,
    testSubscriber;

mongoose.connect(
    "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson17?retryWrites=true&w=majority"
);

mongoose.Promise = global.Promise;

Subscriber.deleteMany({})
    .then((items) => console.log(`Removed ${items.deletedCount} records!`))
    .then(() => {
        return Course.deleteMany({})
    })
    .then((items) => console.log(`Removed ${items.deletedCount} records!`))
    .then(() => {
        return Subscriber.create({
            name: "Mike",
            email: "Mike@Sears.Com",
            zipCode: "84555"
        });
    })
    .then(subscriber => {
        console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Subscriber.findOne( {
            name: "Mike"
        });
    })
    .then(subscriber => {
        testSubscriber = subscriber;
        console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Course.create({
            title: "Tomato Land",
            description: "Locally farmed tomatoes only",
            zipCode: "84555",
            items: ["cherry", "heirloom"]
        });
    })
    .then(course => {
        testCourse = course;
        console.log(`Created course: ${course.title}`);
    })
    .then(() => {
        testSubscriber.courses.push(testCourse);
        testSubscriber.save();
    })
    .then( () => {
        return Subscriber.populate(testSubscriber, "courses");
    })
    .then(subscriber => console.log(subscriber))
    .then(() => {
        return Subscriber.find({ courses: mongoose.Types.ObjectId(testCourse._id)});
    })
    .then(subscriber => console.log(subscriber));

"use strict";

// Create a list of courses as an array of objects

let courses = [
    {
        title: "Event Driven Cakes",
        cost: 50
    },
    {
        title: "Anonymouse Artichoke",
        cost: 25
    },
    {
        title: "Object Oriented Orange Juice",
        cost: 10
    }
];


//Create routing callback functions

exports.showHome = (req, res) => {
    res.render("index");
}

exports.showCourses = (req, res) =>
{
    // Pass in array of courses as value for offeredCourses
    res.render("courses", {offeredCourses:courses});
}

exports.showSignUp = (req, res) =>
{
    res.render("contact");
}

exports.postedSignUpForm = (req, res) =>
{    
    console.log(req.body);
    res.render("thanks", {name: req.body.name, email: req.body.email});
}


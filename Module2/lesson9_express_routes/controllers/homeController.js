"use strict";

exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

exports.createPostRoute = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
}

exports.sendHomeParam = (req, res) => {
    res.send(`Hello World!\nThis is the home page`);
}
"use strict";

exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName; // assign a local variable to a request parameter
    res.render("index", { name: paramsName }); // pass a local variable to a rendered view
}

exports.respondWithNotification = (req, res) => {
    let notification = req.params.name;
    res.render("index", { name: notification });
}
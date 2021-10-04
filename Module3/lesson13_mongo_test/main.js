"use strict";

const MongoDB = require("mongodb").MongoClient,
    dbURL = "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/recipe_db?retryWrites=true&w=majority",
    dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
    if(error) throw error;
    let db = client.db(dbName);
    db.collection("contacts")
    .insertOne({
        name: "Freddie Mercury",
        email: "fred@queen.com"
    }, (error, data) => {
        if(error) throw error;
        console.log(db)
    });
    db.collection("contacts")
    .find()
    .toArray((error, data) => {
        if(error) throw error;
        console.log(data);
    });
});
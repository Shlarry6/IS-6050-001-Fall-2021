"use strict";

// Define schema to specify the fields and data types of a subscriber
const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });

// Export a model object that uses the above schema
// The model is the object that handles reading from/writing to the database
module.exports = mongoose.model("Subscriber", subscriberSchema)
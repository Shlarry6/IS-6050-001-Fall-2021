"use strict"

const mongoose = require("mongoose"),
    recipeSchema = mongoose.Schema({
        name: String,
        ingredient: String,
        timeToMake: Number
    });


// Export the Subscriber model as the only module export.
module.exports = mongoose.model("Recipe", recipeSchema);
"use strict";

const Course = require("../models/course");

module.exports = {

  // Retrieve all courses from database and attach the results to res.locals
  index: (req, res, next) => {
    Course.find({})
      .then(courses => {
        res.locals.courses = courses;
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },

   // Render the courses/index view to display all courses
  indexView: (req, res) => {
    res.render("courses/index");
  }
};

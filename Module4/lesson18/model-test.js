const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  Course = require("./models/course");

// Delcare variables to hold course and subscriber objects to be created later
let testCourse, testSubscriber;

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson17?retryWrites=true&w=majority");  // ATLAS CONNECTION STRING HERE

// ********** BEGIN DATA OPERATIONS *************

// Delete any existing subscribers and courses from the database (start fresh)
Subscriber.deleteMany({})
  .then(items => console.log(`Removed ${items.deletedCount} records!`))
  .then(() => {
    return Course.deleteMany({});
  })
  .then(items => console.log(`Removed ${items.deletedCount} records!`))

  // Create a new subscriber
  .then(() => {
    return Subscriber.create({
      name: "Jon",
      email: "jon@jonwexler.com",
      zipCode: "12345"
    });
  })

  // Log the info for the newly created subscriber to the console
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })



  // Find (select) the subscriber we just created by their name
  .then(() => {
    return Subscriber.findOne({
      name: "Jon"
    });
  })

  // Log the info for the subscriber retreived from the database
  .then(subscriber => {
    // Save the subscriber object to the global testSubscriber variable so it can be accessed later
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    console.log(`Here is the full document for the subscriber ${subscriber}`);
  })



  // Create (insert) a new course in the database
  .then(() => {
    return Course.create({
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "heirloom"]
    });
  })

  // Log information about the new course to the console
  .then(course => {
    // Save the course object to the global testCourse variable so it can be accessed later
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })



  // Create a relationship between the new course and the new subscriber (i.e., subscriber enrolls in the course)
  .then(() => {
    // Add (push) the course ID to the subscriber's courses array
    // Note that only the course ID will be pushed, even though the entire object is passed
    testSubscriber.courses.push(testCourse);

    // Update the subscriber object in the database
    return testSubscriber.save();
  })

  .then(updatedSubscriber => {
    console.log(`Course ${testCourse.title} added to ${updatedSubscriber.name}'s courses`);
  })



  // Find (select) the subscriber(s) in the database that are registered for a specific course
  // (This means that the subscribers' courses array includes the course ID)
  .then(() => {
    return Subscriber.find({
      courses: mongoose.Types.ObjectId(testCourse._id)
    });
  })

  // Log the unpopulated subsriber document(s) to the console (shows only the course IDs in the courses array)
  .then(subscribers => {
    console.log(`Unpopulated subscribers enrolled for course ${testCourse._id}: `, subscribers);
    return subscribers;
  })



  // Populate the list of subscribers so that all course information shows up in the courses array
  .then(subscribers => {
    return Subscriber.populate(subscribers, "courses");
  })

  // Log the populated subscriber document(s) to the console (shows the full course objects in the courses array)
  .then((populatedSubscribers) => {
    console.log(`Populated subscribers enrolled for course ${testCourse._id}: `);
    populatedSubscribers.forEach(subscriber => console.log(subscriber));
  })

  

  // Catch any errors that occur anywhere along the chain
  .catch(error => {
    console.log(`Something went wrong!  ${error}`);
  })



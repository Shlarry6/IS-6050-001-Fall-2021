const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  Course = require("./models/course");

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/lesson21?retryWrites=true&w=majority"); // ATLAS CONNECTION STRING HERE

// ********** BEGIN DATA OPERATIONS *************

// Declare a function using the **async** keyword that will contain asynchronous data operations
// The async keyword can only be applied to functions, not to top-level code (although there are some caveats to this)
async function doDataOperations() {

  // Use a conventional try/catch block to run "risky" code and handle any errors that might occur

  try {
    // Delete any existing subscribers and courses from the database (start fresh)

    // Use the **await** keyword before calling any ascynchronous function that returns a promise (such as a mongoose data operation) 
    // The await keyword can only be used inside a function defined with the async keyword
    // The await keyword allows us to treat asynchronous operations as if they were syncrhonous
    // This means we can store the returned result of the functions in an in-line variable, rather than using promise chaining with .then() functions
    let items = await Subscriber.deleteMany({});
    console.log(`Removed ${items.deletedCount} records!`);
    items = await Course.deleteMany({});
    console.log(`Removed ${items.deletedCount} records!`);

    // Create a new subscriber
    let newSubscriber = await Subscriber.create({
      name: "Jon",
      email: "jon@jonwexler.com",
      zipCode: "12345"
    });

    // Log the info for the newly created subscriber to the console
    console.log(`Created Subscriber: ${newSubscriber.getInfo()}`);

    // Find (select) the subscriber we just created by their name
    let foundSubscriber = await Subscriber.findOne({
      name: "Jon"
    });

    // Log the info for the subscriber retreived from the database
    console.log(`Found one subscriber: ${foundSubscriber.getInfo()}`);
    console.log(`Here is the full document for the subscriber ${foundSubscriber}`);

    // Create (insert) a new course in the database
    let newCourse = await Course.create({
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "heirloom"]
    });


    // Log information about the new course to the console
    console.log(`Created course: ${newCourse.title}`);

    // Create a relationship between the new course and the new subscriber (i.e., subscriber enrolls in the course)
    // Add (push) the course ID to the subscriber's courses array
    // Note that only the course ID will be pushed, even though the entire object is passed
    foundSubscriber.courses.push(newCourse);

    // Update the subscriber object in the database
    let updatedSubscriber = await foundSubscriber.save();

    // Log a message confirming course registration to the console
    console.log(`Course ${newCourse.title} added to ${updatedSubscriber.name}'s courses`);

    // Find (select) the subscriber(s) in the database that are registered for a specific course
    // (This means that the subscribers' courses array includes the course ID)
    let subscribers = await Subscriber.find({
      courses: mongoose.Types.ObjectId(newCourse._id)
    });

    // Log the unpopulated subsriber document(s) to the console (shows only the course IDs in the courses array)
    console.log(`Unpopulated subscribers enrolled for course ${newCourse._id}: `, subscribers);

    // Populate the list of subscribers so that all course information shows up in the courses array
    let populatedSubscribers = await Subscriber.populate(subscribers, "courses");

    // Log the populated subscriber document(s) to the console (shows the full course objects in the courses array)
    console.log(`Populated subscribers enrolled for course ${newCourse._id}: `);
    populatedSubscribers.forEach(subscriber => console.log(subscriber));


  } catch (error)  // Catch any errors that occur anywhere in the try block
  {
    console.log(`Something went wrong!  ${error}`);
  }

}

// Call the async function
doDataOperations();



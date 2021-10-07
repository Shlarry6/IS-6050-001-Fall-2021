// This file uses MongoDB and includes all CRUD operations embedded in route handlers  
// Install the mondodb package with << npm i mongodb -S >>
// See the following for mapping of SQL to MongoDB:
// https://docs.mongodb.com/manual/reference/sql-comparison/

/**************** IMPORT PACKAGES ****************/

const express = require("express");
const app = express();
const path = require("path");


// Require driver package for MongoDB database
const mongodb = require("mongodb"); // Require mongo driver
const MongoClient = mongodb.MongoClient; // Used to make connection to Mongo database
const ObjectID = mongodb.ObjectId; // Used to convert string IDs to BSON objectID type

// Alternative import syntax using object desctructuring
//const {MongoClient, ObjectId} = require("mongodb");

/**************** CONFIGURE SERVER ****************/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

/**************** CONFIGURE AND INITIALIZE DATABASE ****************/

// Connection URL and database name
const connectionURL = "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/crud-test?retryWrites=true&w=majority"; // ********* ATLAS CONNECTION STRING HERE!! ********* //
const databaseName = "crud-test";
const collectionName = "books";

// Make sure a connectionURL is set before proceeding
if (!connectionURL) {
    throw new Error("Error. Please enter Atlas connection string on line 16 of bookControllerMondoDB.js before running.");
 }

// Create a collection variable that can be used by all route handlers to execute queries
let collection;

// Utility function for running MongoDB queries.
// The callback function passed in should execute the desired query
// If the collection is not null (has already been retrieved), calls the callback function with the collection
// If the collection is null (has not been retrieved), initiates a new connection and calls the callback function with the collection
let executeMongoQuery = (callback) => {

    // Reuse the collection if it has already been initialized.
    // Otherwise, initiate a new connection
    if (collection) {
        console.log("reusing collection...")
        callback(collection);
    } else {
        console.log("initiating new connection to retrieve collection...");
        MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            collection = client.db(databaseName).collection(collectionName);
            callback(collection);
        });
    }

}

// Initialize the Books collection by adding some documents
// Add documents only if there are not already 3 in the collection (done to limit size of collection for this example)
executeMongoQuery((collection) => {

    collection.countDocuments((error, count) => {
        if (error) {
            return console.log("Error counting documents");
        }

        if (count < 3) {
            collection.insertMany([
                {
                    "title": "To Kill a Mockingbird",
                    "author": "Harper Lee",
                    "comment": "Published in 1960"
                },
                {
                    "title": "1984",
                    "author": "George Orwell",
                    "comment": "Published in 1949"
                },
                {
                    "title": "The Great Gatsby",
                    "author": "F. Scott Fitzgerald",
                    "comment": "Published in 1925"
                }


            ], (err, result) => {
                if (err) return console.log("Error: ", err);
                console.log("Records inserted: ", result.insertedCount);
            });

        } else {
            console.log("Nothing inserted - Collection already contains at least 3 documents.");
        }
    });

});


/**************** REGISTER ROUTES ****************/

// GET /
// Show index view
app.get("/", (req, res) => {
  // res.send("Hello world!...");
  res.render("index");
});

// GET /about
// Show about view
app.get("/about", (req, res) => {
  res.render("about");
});

// GET /data
// Show a view with a simple test data object
app.get("/data", (req, res) => {
  const test = {
    title: "Test",
    items: ["one", "two", "three"]
  };
  res.render("data", { model: test });
});

// GET /books
// Show all books in the database
app.get("/books", (req, res) => {
  executeMongoQuery((collection) => {
    // Use collection.find() to retrieve all records
    // https://docs.mongodb.com/manual/tutorial/query-documents/
    collection.find({}).toArray((error, books) => {
        if (error)
            return console.log(error.message);

        res.render("books", { model: books });
    });
});
});

// GET /create
// Show the view to create a new book
app.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

// POST /create
// Insert data from HTML form as a new book in the database
app.post("/create", (req, res) => {
  executeMongoQuery((collection) => {
    // Use collection.insertOne() to insert a single book
    collection.insertOne(req.body, (err, result) => {
      if (err) {
        return console.log(err.message);
      }
      res.redirect("/books");
    });
     
    // https://docs.mongodb.com/manual/tutorial/insert-documents/
    
});
});

// GET /edit/:id
// Retrieve a book to edit.  Book ID passed as route parameter :id
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  executeMongoQuery((collection) => {
    // Use collection.findOne() to retrieve one record
    // https://docs.mongodb.com/manual/tutorial/query-documents/
   


});
});

// POST /edit/:id
// Update a book using data posted from an HTML form. Book ID passed as route parameter :id
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  executeMongoQuery((collection) => {
    // Use collection.updateOne() to update a single document
    // https://docs.mongodb.com/manual/tutorial/update-documents/



});
});

// GET /delete/:id
// Retrieve a book to delete.  Book ID passed as route parameter :id
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  executeMongoQuery((collection) => {
    // Use collection.findOne() to retrieve one record
    // https://docs.mongodb.com/manual/tutorial/query-documents/


}); 
});

// POST /delete/:id
// Delete a book using data posted from an HTML form. Book ID passed as route parameter :id
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  executeMongoQuery((collection) => {
    // Use collection.deleteOne() to delete one record
    // https://docs.mongodb.com/manual/tutorial/remove-documents/


    
});
});


/****************  START EXPRESS SERVER ****************/

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/ !");
});
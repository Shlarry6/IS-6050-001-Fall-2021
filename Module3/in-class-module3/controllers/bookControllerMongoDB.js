// This module handles routes related to books and performs CRUD operations using MongoDB
// Install the mondodb package with << npm i mongodb -S >>
// See the following for mapping of SQL to MongoDB:
// https://docs.mongodb.com/manual/reference/sql-comparison/

/**************** IMPORT PACKAGES ****************/

// Require driver package for MongoDB database
const mongodb = require("mongodb"); // Require mongo driver
const MongoClient = mongodb.MongoClient; // Used to make connection to Mongo database
const ObjectID = mongodb.ObjectId; // Used to convert string IDs to BSON objectID type

// Alternative import syntax using object desctructuring
//const {MongoClient, ObjectId} = require("mongodb");


/**************** CONFIGURE AND INITIALIZE DATABASE ****************/

// Connection URL and database name
const connectionURL = "mongodb+srv://dbUser:dbUserPassword@is6050cluster.ckwsf.mongodb.net/crud-test?retryWrites=true&w=majority"; // ********* ATLAS CONNECTION STRING HERE!! ********* //
const databaseName = "crud-test";
const collectionName = "books";

// Make sure a connectionURL is set before proceeding
if (!connectionURL) {
    throw new Error("Error. Please enter Atlas connection string in bookControllerMondoDB.js before running.");
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
    })

});

/**************** ROUTE HANDLER FUNCTIONS ****************/

// Retrieve all books
exports.getBooks = (req, res) => {
    executeMongoQuery((collection) => {
        // Use collection.find() to retrieve all records
        // https://docs.mongodb.com/manual/tutorial/query-documents/
        collection.find({}).toArray((error, books) => {
            if (error)
                return console.log(error.message);

            res.render("books", { model: books });
        });
    });
};

// Render the view to insert a new book
exports.newBook = (req, res) => {
    res.render("create", { model: {} });
};

// Insert a new book
exports.insertBook = (req, res) => {

    executeMongoQuery((collection) => {
        // Use collection.insertOne() to insert a single book
        // https://docs.mongodb.com/manual/tutorial/insert-documents/
        collection.insertOne(req.body, (error, result) => {
            if (error)
                return console.log(error.message);
            console.log("Record inserted");
            res.redirect("/books");
        });
    });

};

// Render the view to edit a book
exports.editBook = (req, res) => {
    const id = req.params.id;

    executeMongoQuery((collection) => {
        // Use collection.findOne() to retrieve one record
        // https://docs.mongodb.com/manual/tutorial/query-documents/
        collection.findOne({ _id: new ObjectID(id) }, (error, book) => {
            if (error)
                return console.log(error.message);
            console.log(book);
            res.render("edit", { model: book });
        });
    });

    
};

  // Update a book
  exports.updateBook = (req, res) => {
    const id = req.params.id; // Retrieve book id from route parameter

    executeMongoQuery((collection) => {
        // Use collection.updateOne() to update a single document
        // https://docs.mongodb.com/manual/tutorial/update-documents/
        collection.updateOne({ 
            _id: new ObjectID(id) 
        }, {
            $set:  {
                title: req.body.title,
                author: req.body.author,
                comment: req.body.comment 
            }
        }, (error, result) => {
            if (error)
                return console.log(error.message);
            console.log(result.modifiedCount + " document updated.")
            res.redirect("/books");
        });
    });
  };

  // Select a book for deletion
  exports.selectForDelete = (req, res) => {
    const id = req.params.id; // Retrieve book id from route parameter

    executeMongoQuery((collection) => {
        // Use collection.findOne() to retrieve one record
        // https://docs.mongodb.com/manual/tutorial/query-documents/
        collection.findOne({ _id: new ObjectID(id) }, (error, book) => {
            if (error)
                return console.log(error.message);
            console.log(book);
            res.render("delete", { model: book });
        });
    });   
   
  };

  // Delete a book
  exports.deleteBook = (req, res) => {
    const id = req.params.id; // Retrieve book id from route parameter
    
    executeMongoQuery((collection) => {
        // Use collection.deleteOne() to delete one record
        // https://docs.mongodb.com/manual/tutorial/remove-documents/
        collection.deleteOne({ 
            _id: new ObjectID(id) 
        }, (error, result) => {
            if (error)
                return console.log(error.message);
            console.log(result.deletedCount + " document deleted.")
            res.redirect("/books");
        });
    });
  };
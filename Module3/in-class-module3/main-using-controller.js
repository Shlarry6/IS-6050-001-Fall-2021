// This version of index offloads CRUD operations to a controller.
// The data store will change depending on which controller is imported.
// To use SQLite, import bookControllerSqlite
// To use MongoDB, import bookControllerMongoDB

/**************** IMPORT PACKAGES ****************/

const express = require("express");
const app = express();
const path = require("path");
const homeController = require("./controllers/homeController");

/**************** IMPORT BOOK CONTROLLER ****************/
// DATA ACCESS CONTROLLERS (use ONE of the following):

// Uncomment the following line to use SQLite
// const bookController = require("./controllers/bookControllerSqlite");

// Uncomment the following line to use MongoDB
 const bookController = require("./controllers/bookControllerMongoDB");

// Uncomment the following line to use MySql
//const bookController = require('./controllers/bookControllerMySql');

/**************** CONFIGURE SERVER ****************/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));


/**************** REGISTER ROUTES ****************/

// GET /
// Show index view
app.get("/", homeController.renderHome);

// GET /about
// Show about view
app.get("/about", homeController.renderAbout);

// GET /data
// Show a view with a simple test data object
app.get("/data", homeController.renderData);

// GET /books
// Show all books in the database
app.get("/books", bookController.getBooks);

// GET /create
// Show the view to create a new book
app.get("/create", bookController.newBook);

// POST /create
// Insert data from HTML form as a new book in the database
app.post("/create", bookController.insertBook);

// GET /edit/:id
// Retrieve a book to edit.  Book ID passed as route parameter :id
app.get("/edit/:id", bookController.editBook);

// POST /edit/:id
// Update a book using data posted from an HTML form. Book ID passed as route parameter :id
app.post("/edit/:id", bookController.updateBook);

// GET /delete/:id
// Retrieve a book to delete.  Book ID passed as route parameter :id
app.get("/delete/:id", bookController.selectForDelete);

// POST /delete/:id
// Delete a book using data posted from an HTML form. Book ID passed as route parameter :id
app.post("/delete/:id", bookController.deleteBook);


/****************  START EXPRESS SERVER ****************/

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/ !");
  });

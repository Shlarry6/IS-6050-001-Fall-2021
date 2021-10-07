// This file uses SQLite and includes all CRUD operations embedded in route handlers  

/**************** IMPORT PACKAGES ****************/

const express = require("express");
const app = express();
const path = require("path");


// Require driver package for SQLite database
const sqlite3 = require("sqlite3").verbose();

/**************** CONFIGURE SERVER ****************/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

/**************** CONFIGURE AND INITIALIZE DATABASE ****************/

// Connect to SQLite database
const db_name = path.join(__dirname, "data", "crud-test.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection to database 'crud-test.db' successful");
});

// Create table Books (_id, Title, Author, Comment)
const sql_create = `CREATE TABLE IF NOT EXISTS books (
  _id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  comment TEXT
);`;
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Creation of 'books' table successful");
  
  // Populate the table
  const sql_insert = `INSERT INTO books (_id, title, author, comment) VALUES
  (1, 'Pride and Prejudice', 'Jane Austen', 'Published in 1813'),
  (2, 'The Catcher in the Rye', 'J.D. Salinger', 'Published in 1951'),
  (3, 'The Count of Monte Cristo', 'Alexandre Dumas', 'Published in 1844');`;
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Data inserted into 'books' table");
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
  const sql = "SELECT * FROM books ORDER BY title";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("books", { model: rows });
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
  const sql = "INSERT INTO books (title, author, comment) VALUES (?, ?, ?)";
  const book = [req.body.title, req.body.author, req.body.comment];
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});

// GET /edit/:id
// Retrieve a book to edit.  Book ID passed as route parameter :id
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM books WHERE _id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("edit", { model: row });
  });
});

// POST /edit/:id
// Update a book using data posted from an HTML form. Book ID passed as route parameter :id
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = [req.body.title, req.body.author, req.body.comment, id];
  const sql = "UPDATE books SET title = ?, author = ?, comment = ? WHERE (_id = ?)";
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});

// GET /delete/:id
// Retrieve a book to delete.  Book ID passed as route parameter :id
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM books WHERE _id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("delete", { model: row });
  });
});

// POST /delete/:id
// Delete a book using data posted from an HTML form. Book ID passed as route parameter :id
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM books WHERE _id = ?";
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});

/****************  START EXPRESS SERVER ****************/

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/ !");
});

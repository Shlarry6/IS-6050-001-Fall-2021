// This module handles routes related to books and performs CRUD operations using SQLite
// Install the sqllite3 package with << npm i sqlite3 -S >>

/**************** IMPORT PACKAGES ****************/

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

/**************** CONFIGURE AND INITIALIZE DATABASE ****************/

// Connect to SQLite database
const db_name = path.join(__dirname, "../data", "crud-test2.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection to database 'crud-test2.db' successful");
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
  (1, 'Adventures of Huckleberry Finn', 'Mark Twain', 'Published in 1844'),
  (2, 'Lord of the Flies', 'William Golding', 'Published in 1954'),
  (3, 'Brave New World', 'Aldous Huxley', 'Published in 1932');`;
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Data inserted into 'books' table");
  });
});

// Retrieve all books
exports.getBooks = (req, res) => {
    const sql = "SELECT * FROM books ORDER BY title";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("books", { model: rows });
    });
  };

  // Render the view to insert a new book
  exports.newBook = (req, res) => {
    res.render("create", { model: {} });
  };

  // Insert a new book
  exports.insertBook = (req, res) => {
    const sql = "INSERT INTO books (title, author, comment) VALUES (?, ?, ?)";
    const book = [req.body.title, req.body.author, req.body.comment];
    db.run(sql, book, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    });
  };

  // Render the view to edit a book
  exports.editBook = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM books WHERE _id = ?";
    db.get(sql, id, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("edit", { model: row });
    });
  };

  // Update a book
  exports.updateBook = (req, res) => {
    const id = req.params.id;
    const book = [req.body.title, req.body.author, req.body.comment, id];
    const sql = "UPDATE books SET title = ?, author = ?, comment = ? WHERE (_id = ?)";
    db.run(sql, book, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    });
  };

  // Select a book for deletion
  exports.selectForDelete = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM books WHERE _id = ?";
    db.get(sql, id, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("delete", { model: row });
    });
  };

  // Delete a book
  exports.deleteBook = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM books WHERE _id = ?";
    db.run(sql, id, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    });
  };

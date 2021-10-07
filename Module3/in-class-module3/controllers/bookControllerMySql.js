// See Canvas video series "Connecting Node.js to a MySql database"

// Install the mysql package using << npm i mysql -S >>
// This is the driver for running mysql queries
const mysql = require('mysql');

// Connect to your database --> This information is sent to you in an email after your register with https://www.freesqldatabase.com/
const connection = mysql.createConnection({
    host: "sql3.freesqldatabase.com", // Enter your host name
    user: "sql3386655",  // Enter your username
    password: "vareIulIGC", //  Enter the password
    database: "sql3386655" // Enter the database name -- Again, all of this information is sent in an email
});

// Retrieve all books
exports.getBooks = (req, res) => {
    let query = `SELECT * FROM booksTable`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.render("books", { model: results });
        }
    });

    // This function will end the connection to the database, making further queries do nothing.
    // It's best to use if you have a defined end to the db connection.
    // connection.end();
  };

   // Render the view to insert a new book
   exports.newBook = (req, res) => {
      res.render("create", { model: {} });
  };

  // Insert a new book
  exports.insertBook = (req, res) => {
    let title = req.body.title.replace("'", "''"),
      author = req.body.author,
      comment = req.body.comment;
    let query = `INSERT INTO booksTable (title, author, comment) VALUES ('${title}', '${author}', '${comment}')`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.redirect("/books");
        }
    });
  };

  // Render the view to edit a book
  exports.editBook = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM booksTable WHERE _id = ${id}`;
    connection.query(query, (error, results, fields) => {
      if (error) {
          res.send(error);
      } else {
          res.render('edit', {model: results[0]});
      }
  });
  };

  // Update a book
  exports.updateBook = (req, res) => {
    const id = req.params.id;
    let title = req.body.title.replace("'", "''"),
      author = req.body.author,
      comment = req.body.comment;
    const query = `UPDATE booksTable SET title='${title}', author='${author}', comment='${comment}', _id=${id} WHERE _id = ${id}`;
    connection.query(query, (error, results, fields) => {
      if (error) {
          res.send(error);
      } else {
          res.redirect('/books');
      }
  });
  };

  // Select a book for deletion
  exports.selectForDelete = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM booksTable WHERE _id = ${id}`;
    connection.query(query, (error, results, fields) => {
      if (error) {
          res.send(error);
      } else {
        res.render("delete", { model: results[0] });
      }
  });
  };

  // Delete a book
  exports.deleteBook = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM booksTable WHERE _id = ${id}`;
    connection.query(query, (error, results, fields) => {
      if (error) {
          res.send(error);
      } else {
        res.redirect("/books");
      }
  });
  };
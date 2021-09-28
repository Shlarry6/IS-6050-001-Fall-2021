"use strict";

const port = 3000,
    express = require('express'),
    app = express();

app.get("/", (req, res) => {
    console.log(req.params);
    console.log(req.body);          // setting up a GET route for the home page.
    console.log(req.url);
    console.log(req.query);
    res.send("Hello, Universe!");       //Issue a response from the server to the client with res.send
})
.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
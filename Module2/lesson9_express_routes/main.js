"use strict";

const homeController = require("./controllers/homeController");

const port = 3000,
    express = require('express'),
    app = express();

app.use((req, res, next) => {
    console.log(`requests made to: ${req.url}`);
    next();
});

app.use(
    express.urlencoded({
        extended: false
    })                      // telling my express.js application to parse url-encoded data
);
app.use(express.json());

app.post("/", homeController.createPostRoute); // create new post route for home page.

app.get("/items/:vegetable", homeController.sendReqParam); // handle GET requests to /items/:vegetable

app.get("/", homeController.sendHomeParam);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
"use strict";

const port = 3000,
    express = require('express'),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require('express-ejs-layouts');
    
app.use(layouts);
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/contact/:name", homeController.respondWithNotification);

app.get("/name/:myName", homeController.respondWithName);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
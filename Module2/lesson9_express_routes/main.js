"use strict"; 

// Import required libraries

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

  // Import built-in middleware for handling request bodies in urlencoded or JSON format
  app.use(express.urlencoded({extended:false}));
  app.use(express.json());

 // Tell the app to use the logRequestPaths function of the homeController as middleware
  app.use(homeController.logRequestPaths);

  // Register GET route with a route parameter
  app.get("/items/:vegetable", homeController.sendReqParam);

  
  // Register POST route
  app.post("/", homeController.handlePosts);

  // Register GET route for home page (/)
  app.get("/", homeController.showHomePage);

 

  // Start app on port 3000
  app.listen(port, () => {
      console.log(`Server running on port ${port}`);
  });



 

  
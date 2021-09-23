"use strict";

// const port = 3000,
//     http = require("http"),
//     httpStatus = require("http-status-codes"),
//     app = http.createServer((request, response) => {
//         console.log("received an incoming request!");
//         response.writeHead(httpStatus.OK, {
//             "Content-Type": "text/html"
//         });

//         let responseMessage = "<h1>Hello, Universe!</h1>"
//         response.write(responseMessage);
//         response.end();
//         console.log(`Sent a response : ${responseMessage}`);
//     });

//     app.listen(port);
//     console.log(`The server has started and is listening on port number : ${port}`);


    /*
    3. c. 
    */
   const cities = require("cities");
   let myCity = cities.zip_lookup("84341");
   let myState = cities.findByState("ut");
   let northCities = [];
   for(let individualCity in myState) {
       if(myState[individualCity].latitude > myCity.latitude) {
           northCities.push(myState[individualCity].city);
       }
   }

    const port = 3000, 
        http = require("http"),
        httpStatus = require("http-status-codes"),
        app = http.createServer((request, response) => {
            console.log("received an incoming request!");
            response.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            });

            let responseMessage = "<h1>These cities are located north of Logan, UT";
            response.write(responseMessage);
            response.write(`<h5>${northCities.toString()}</h5>`); // writing to the webpage the northcities array 
            response.end();
            console.log(`Sent a response : ${responseMessage}`);
        });

        app.listen(port);
        console.log(`The server has started and is listening on port number : ${port}`);
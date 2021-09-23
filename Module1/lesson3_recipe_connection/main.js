"use strict";
/*
2. b. do stuff in book and create new console.log
 */
const cities = require("cities");
var myCity = cities.zip_lookup("84341");
console.log(myCity);

console.log(`The zip code ${myCity.zipcode} is located in ${myCity.city}, ${myCity.state}`)

/*
2. c. 
*/

let myState = cities.findByState("ut"); //created list of cities objects found in utah.
let northCities = []; // creating an epty list to add north cities to.
for(let individualCity in myState) { // for each loop to look at each individual city in the myState list.
    if(myState[individualCity].latitude > myCity.latitude){ // if individual city latitude is greater than my city latitude then...
        northCities.push(myState[individualCity].city); // add (push) the individual city name to the northcities list.
    }
}

console.log("These cities are located north of Logan, Ut\n", northCities);





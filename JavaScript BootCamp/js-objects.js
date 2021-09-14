"use strict";
/*
1. Write the following basic object code, one line for each action:

Create an empty object user.
Add the property name with the value John.
Add the property surname with the value Smith.
Change the value of the name to Pete.
Remove the property name from the object.
*/

let user = {
name: "John",
surname: "Smith",
}

console.log(user.name)
user.name = "Pete";
console.log(user.name);
delete user.name;
console.log(user.name);

/*
2. Assume we have an object storing salaries of our team:

Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.

If salaries is empty, then the result should be 0.  Hint:  use the For/In loop
*/

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

var sum = 0;
for (var prop in salaries) {
    sum = sum + salaries[prop];
}

console.log(sum);

/*
3. Write the code for an array of objects called friends that represents a list of at least three of your friends.  Each friend should be represented as an object that contains the following: 
    1. String properties:  firstName, lastName, gender. 
    2. Date property: birthDate;
    3. function getAge():  returns the age of the friend in whole years.  (You can use a regular property with a function as the value, or you can use a getter method (Links to an external site.).)
    Print the contents of the array of objects using console.log();
*/
let ageCalc = function() {
    let yearsMS = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor((new Date() - this.date)/yearMS); // took your idea here 
}
var currentDate = new Date();

let friends = {
    tyson: {
        firstName: "tyson", 
        lastName: "holmstead", 
        gender: "male",
        date: new Date(1995, 6, 1),
        birthdate: ageCalc
    },
    connor: {
        firstName: "connor", 
        lastName: "caldwell", 
        gender: "male",
        date: new Date(1995, 8, 1),
        birthdate: ageCalc
    },
    emily: {
        firstName: "emily", 
        lastName: "sears", 
        gender: "female",
        date: new Date(1997, 12, 16),
        birthdate: ageCalc
    }
}

console.log(friends);


/*
4. Instead of printing the entire array of objects, use a looping mechanism (e.g., forEach, For/In, etc.) to print out the following message to the console for each friend:  "<<firstName>> <<lastName>> is a <<age>>-year-old <<gender>>.
*/

for (var person in friends) {
    console.log(`${friends[person].firstName} ${friends[person].lastName} is a ${friends.ageCalc()} year old ${friends[person].gender}`)
}

/*
5.Convert the array of objects you created in the previous step into a string by using the JSON.stringify() (Links to an external site.) method.  Print the contents of this string using console.log().
 */

let friendString = JSON.stringify(friends);
console.log(friendString);

/*
6. Convert the JSON string you created in the previous step back into an array by using the JSON.parse() (Links to an external site.) method.  Print the contents of this array using console.log()
*/

let friendArray = JSON.parse(friendString);
console.log(friendArray);

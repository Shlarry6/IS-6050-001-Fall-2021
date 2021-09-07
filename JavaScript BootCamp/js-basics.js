"use strict";

//1. Print your first and last name in double quotes with a line break in the middle.
var name = '"Michael \n Sears"';

console.log(name);

//2. Store your first name in a variable in all lower case letters.  Then, use a string function to print the name in all upper case letters
var firstName = "michael";
var lastName = "sears";

console.log(firstName.toUpperCase() + " " + lastName.toUpperCase());

//3. Store your your first and last name in separate variables.  Then use string concatenation to put them together (with a space in the middle) and store in a separate variable.
var fullName = firstName + " " + lastName;

console.log(fullName);

// 4. Use string concatenation to print "Hi, my name is <<Full Name>>" where <<Full Name>> is your full name stored in a variable.
console.log("Hi, my name is " + fullName);

//5. With your full name stored in a variable, split your first and last name into separate variables.
var splitName = fullName.split(" ", 2);
firstName = splitName[0];
lastName = splitName[1];

console.log(firstName, lastName);

//6. Create a string variable that holds a string with leading/trailing spaces.  Use a string function to trim the spaces and store the result in another variable.
var spaceString = "  string  ";
var trimString = spaceString.trim();

console.log(trimString);

//7. Use a string function to report the number of characters in your full name (not including space).
var nameLength = fullName.replace(" ","");

console.log(nameLength.length);

//8. Use a string function that gives the position of the first letter of your last name in your full name.  For example, in "Kelly Fadel", the "F" is in position 6.
var index = fullName.indexOf("s");

console.log(index);

//9. Use a string function that reports whether the letter "A" (either upper or lower case) is in a string variable that contains your full name.
var containsA = (fullName.includes("A") || fullName.includes("a"));

console.log(containsA);

//10. Use a string function that replaces "ASP.NET" with "Node.js" in the following string:  "I am learning ASP.NET"
var string = "I am learning ASP.NET";
var replace = string.replace("ASP.NET", "Node.js")

console.log(replace);

//11. Store the value 9.6877 in a variable.  Then use a number function to store the number as a new variable with only two decimal places.
var value = 9.6877;
var d = value.toFixed(2);

console.log(d);

//12. Write a line of code that shows the remainder of 23 / 7.
var remainder = 23 % 7;

console.log(remainder);

//13. Use a number function to convert the string "23" into a number and store it in a new variable.
var sNumber = "23";
var num = parseInt(sNumber);

console.log(num);

//14. Use a number function to convert the string "15.23" into a number and store it as a numerical value.
var sDecimal = "15.23";
var dec = parseFloat(sDecimal);

console.log(dec);

//15. Write code that uses one or more a number functions to return a random number between 1 and 10.
var random = Math.floor(Math.random() * 11);

console.log(random);

//16. Use the Number() function to see if the following values can be converted to numbers:  5, "5", "Test"




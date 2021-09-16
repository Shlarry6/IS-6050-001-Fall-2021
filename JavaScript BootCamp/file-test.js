"use strict";

//Import the node file system module
const fs = require('fs');

try {
    // Write a file with initial content
    fs.writeFileSync('hello.txt', "Hello World!");

    // Append additional content to the file
    fs.appendFileSync('hello.txt', "\nThis file was created with Node.js");

    //read and print the contents of the hello.txxt file to the console
    let string = fs.readFileSync('hello.txt', 'utf8');
    console.log(string);

    //delete the file from the current directory
    fs.unlinkSync('hello.txt');
}
catch (error) {
    console.log("Oops! Something bad happened, probably because of something you did.", error.message);
}








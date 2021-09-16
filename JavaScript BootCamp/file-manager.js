// Module for creating, appending, reading, and deleting a file

"use strict";

const fs = require('fs');

// function that creates a file.
const createFile = (fileName, content) => {
    // write the file
    fs.writeFileSync(fileName, content);
}

// function that appends content to the fileName file
const modifyFile = (fileName, content) => {
    fs.appendFileSync(fileName,content);
}

// function that if a file called fileName exists, returns the content of the file as a string that cn be printed to the console
const readFile = (fileName, format) => {
    let fileString = fs.readFileSync(fileName, format);
    console.log(fileString);
}

// function that if a file caled fileName exists, deletes the file from the directory
const deleteFile = (fileName) => {
    fs.unlinkSync(fileName);
    console.log(`${fileName} is now deleted.`)
}



// Export the file functions for other modules to use
module.exports.create = createFile;
module.exports.modify = modifyFile;
module.exports.read = readFile;
module.exports.delete = deleteFile;













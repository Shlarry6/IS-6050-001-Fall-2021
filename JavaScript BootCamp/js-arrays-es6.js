"use strict";

//1. function concatArray(arr1, arr2):  concatenates the arr1 and arr2 arrays together and returns the resulting array.  
//Hint:  use the concat() array method.
//function declaration.
function concatArray(arr1, arr2) {
    return arr1.concat(arr2);
}

let newArray = concatArray([1,2], [3,4]);
console.log(newArray);

// concatArray using FUNCTION EXPRESSION syntax
const concatArray2 = function (arr1, arr2) { 
    return arr1.concat(arr2);
}

let newArray2 = concatArray2([1,2],[3,4]);
console.log(newArray2);

// concatArray using FUNCTION EXPRESSION and ES6 ARROW FUNCTION syntax
const concatArray3 = (arr1, arr2) => {
    return arr1.concat(arr2);
}

let newArray3 = concatArray3([1,2],[3,4]);
console.log(newArray3);

/*2. function arrayAsString(arr, separator):  converts the arr array to a string, with each item in the array separated by the separator string.  Returns the resulting string.  
Hint:  use the join() array method.
*/
function arrayAsString(arr, separator){
    return arr.join(separator);
}

let joinedArray = arrayAsString([1, 2, 3, 4], " ");

console.log(joinedArray);
console.log(typeof(joinedArray));

// using FUNCTION EXPRESSION syntax
const arrayAsString2 = function (arr, separator) { 
    return arr.join(separator) ;
}

let joinedArray2 = arrayAsString2([1, 2, 3, 4], " ");
console.log(joinedArray2);

// using FUNCTION EXPRESSION and ES6 ARROW FUNCTION syntax

const arrayAsString3 = (arr, separator) => {
    return arr.join(separator);
}

let joinedArray3 = arrayAsString3([1, 2, 3, 4], " ");
console.log(joinedArray3);

/*3.function isItemInArray(arr, item):  checks to see if item exists in the arr array.  If so, returns true; otherwise, returns false.  
Hint:  use the includes() array method.
*/
function isItemInArray(arr, item) {
    return arr.includes(item);
}

let isIncludedArray = isItemInArray([1,2,3,4], 4);

console.log(isIncludedArray);
console.log(typeof(isIncludedArray));

// using FUNCTION EXPRESSION and ES6 ARROW FUNCTION syntax

const isItemInArray3 = (arr, item) => {
    return arr.includes(item);
}

let isIncludedArray2 = isItemInArray([1,2,3,4], 4);
console.log(isIncludedArray2);

/*4. function findArrayPosition(arr, item):  searches for the position of item in the arr array.  If the item is found, returns the following string with the proper values inside the <<>> placeholders:  "<<Item>> is in position <<position>> out of <<number of items>> in the array."  Otherwise, returns:  "<Item>> not found in the array."  
Hint:  use the indexOf() array method.
 */
function findArrayPosition(arr, item) {
    return arr.indexOf(item);
}
let itemToFind = 2;
let thisArray = [1, 2, 3, 4, 5]
let indexArray = findArrayPosition(thisArray, itemToFind);
let lengthOfArray = thisArray.length;

if (thisArray.includes(itemToFind)) {
    console.log(itemToFind + " is in position " + indexArray + " out of " + lengthOfArray);
}else {
    console.log(itemToFind + "not found in the array.");
}

console.log(typeof(indexArray));

// using FUNCTION EXPRESSION and ES6 ARROW FUNCTION syntax

const findArrayPosition2 = (arr, item) => {
    return arr.indexOf(item);
}
let indexArray2 = findArrayPosition2(thisArray, itemToFind);
if (thisArray.includes(itemToFind)) {
    console.log(itemToFind + " is in position " + indexArray2 + " out of " + lengthOfArray);
}else {
    console.log(itemToFind + "not found in the array.");
}

/*5. function sortStringArray(arr, direction):  sorts the string elements in the arr array in either ascending or descending order depending on the direction parameter.  Returns the sorted array.  
Hint: Use the sort() and reverse() array methods.
*/
function sortStringArray(arr, direction) {
    if(direction == "ascending") {
        return arr.sort(direction);
    }else if(direction == "descending") {
        return arr.reverse(direction);
    }
    return arr;
}

let tArray = [1, 2, 3, 4, 5];
let sortArray = sortStringArray(tArray, "descending");

console.log(sortArray);

// using FUNCTION EXPRESSION and ES6 ARROW FUNCTION syntax

const sortStringArray2 = (arr, direction) => {
    if(direction == "ascending") {
        return arr.sort(direction);
    }else if(direction == "descending") {
        return arr.reverse(direction);
    }
    return arr;
}
let sortArray2 = sortStringArray2(tArray, "descending");
console.log(sortArray2);

/*6.function stackArray(arr, numToRemove, itemToAdd):  removes numToRemove items from the front of the arr array. If itemToAdd is not undefined (meaning something was passed in for this argument), adds this item to the front of the array.  Otherwise, does not add anything. Returns the modified array. 
Hint:  use the splice() or shift()/unshift() array methods.
*/
function stackArray(arr, numToRemove, itemToAdd) {
    if (itemToAdd != undefined) {
        arr.unshift(itemToAdd);
    }
    arr.splice(0, numToRemove);
}

let dArray = [1, 2, 3, 4, 5];
let stackArr = stackArray(dArray, 3, 1);

console.log(stackArr);

// using FUNCTION EXPRESSION and ES6 ARROW FUNCTION syntax

const stackArray2 = (arr, numToRemove, itemToAdd) => {
    if (itemToAdd != undefined) {
        arr.unshift(itemToAdd);
    }
    arr.splice(0, numToRemove);
}
let stackArr2 = stackArray2(dArray, 3, 1);
console.log(stackArr2);

/*7. function getNumbersOver(arr, value):  checks the arr array and returns a new array with all values greater than value. 
 Hint: use the filter() array method.
*/
function getNumberOver(arr, value) {
    let aArray = arr.filter(function (item) {
        return item > value; // I typed this one while you were explaining it to help me understand it better :)
    });                     // I was on #7 when you started explaining it but hadnt written my own ideas of this yet.
    return aArray;
}

console.log(getNumberOver([1, 2, 3, 4, 5], 3));

// using FUNCTION EXPRESSION and ES6 ARROW FUNCTION syntax

const getNumberOver2 = (arr, value) => {
    let aArray = arr.filter(function (item) {
        return item > value; 
    });                     
    return aArray;
}

console.log(getNumberOver2([1, 2, 3, 4, 5], 3));
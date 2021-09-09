"use strict";

//1. function concatArray(arr1, arr2):  concatenates the arr1 and arr2 arrays together and returns the resulting array.  
//Hint:  use the concat() array method.
function concatArray(arr1, arr2) {
    return arr1.concat(arr2);
}

let newArray = concatArray([1,2], [3,4]);

console.log(newArray);
console.log(typeof(newArray));

/*2. function arrayAsString(arr, separator):  converts the arr array to a string, with each item in the array separated by the separator string.  Returns the resulting string.  
Hint:  use the join() array method.
*/
function arrayAsString(arr, separator){
    return arr.join(separator);
}

let joinedArray = arrayAsString([1, 2, 3, 4], " ");

console.log(joinedArray);
console.log(typeof(joinedArray));

/*3.function isItemInArray(arr, item):  checks to see if item exists in the arr array.  If so, returns true; otherwise, returns false.  
Hint:  use the includes() array method.
*/
function isItemInArray(arr, item) {
    return arr.includes(item);
}

let isIncludedArray = isItemInArray([1,2,3,4], 4);

console.log(isIncludedArray);
console.log(typeof(isIncludedArray));

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
let sortArray = sortStringArray(tArray, "descending")

console.log(sortArray);


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
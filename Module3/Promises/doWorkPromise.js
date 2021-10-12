//Asynchronous functions that uses promises


"use strict";

const doWorkPromise = (a, b, willSucced) => {
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(willSucced) {
                let sum = a + b;
                resolve(sum); // promise is fulfilled
            } else {
                reject("Something went wrong."); // promise is rejected.
            }
        }, 2000);
   });
};

doWorkPromise(5, 7, true)
    .then((result) => {
        console.log("Result is: ", result);
        return doWorkPromise(result, 10, true);
    })
    .then((result2) => {
        console.log("Result2 is: ", result2);
        return doWorkPromise(result2, 3, true);
    })
    .then((result3) => {
        console.log("Result3 is: ", result3);
    })
    .catch((error) => {
        console.log(error);
    })
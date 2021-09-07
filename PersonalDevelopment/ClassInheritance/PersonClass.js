"use strict";

class Person {
    constructor(first, last) {
        this.firstName = first;
        this.lastName = last;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

var p = new Person('Mike', 'Sears');
p.firstName = 'Michael';

var fullName = p.getFullName();

console.log(fullName);

/*I'm not exactly sure how to connect both .js files. 
I think the class and the subclass need to be in the same file. 
Its different from c# but I haven't done enough research to find out why this doesn't work. */
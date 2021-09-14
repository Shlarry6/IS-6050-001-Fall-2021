"use strict";
import {Person} from './PersonClass.js';

class Teacher extends Person {
    constructor(first, last, school) {
        super(first, last);

        this.school = school;
    }
}

var t = new Teacher('Mike', 'Sears', 'MMIS');

t.firstName = 'Michael';
t.school = 'DIAS MMIS';

var fullName = t.getFullName();

console.log(fullName);

/*I'm not exactly sure how to connect both .js files. 
I think the class and the subclass need to be in the same file. 
Its different from c# but I haven't done enough research to find out why this doesn't work. */
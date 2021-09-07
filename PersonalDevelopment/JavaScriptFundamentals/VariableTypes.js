"use strict";

/*There are 3 different ways to declare a JavaScript variable;
All javaScript variables are identified with unique names called Identifiers;*/
var variable = 5;
let string = "string";
const constant = 5;

//variables are containers for storing data(values);
var money = 5;
var price = 4.50;
var amountSpent = money - price;
console.log(amountSpent);

/*Variables defined with let cannot be redeclared, must be declared before use, and have Block Scope;
Block scope, variables declared inside { } cannot be accessed outside the block;*/
let declaration1 = 3;
{
    let declaration1 = 1;
    console.log(declaration1);
}
{
    let declaration1 = 2;
    console.log(declaration1);
}
console.log(declaration1);

//variables defined with const cannot be redeclared, reassigned, and have Block Scope;
const pie = 3.141592653589793;
/*Always declare a variable with const unless you know the value will change;
Use const when you declare a new Array, Object, Function, RegExp;
const does not define a constant value, it defines a constant refernce to a value;
because of this you can change the elements of a constant array or the properties of a constant object;
const array*/
const shoppingList = ["bananas", "milk", "bread"];
console.log(shoppingList);
shoppingList[0] = "grapes";
shoppingList.push("orange juice");
console.log(shoppingList);
shoppingList.push(pie);
console.log(shoppingList);
//const object
const phone = {type:"iphone", model:"12 mini", color:"black", age:"1 year"};
console.log(phone);
phone.color = "white";
phone.owner = "sears";
console.log(phone);
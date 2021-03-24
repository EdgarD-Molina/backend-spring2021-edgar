// Variables are used to hold data.
var myFirstVariable = "Hello everyone!" ;
let myFirstLetVariable = null;

// A variable that doesn't change once you've assigned a value.
const myFirstConstVariable = 15;


// Data Types
1000;
"1000 is a number." ;
'<p> This looks like HTML, but it is a string of text in JavaScript </p>';
true;
false;

// Arrays and Objects
let myArray = [];
// Either or
let myArray2 = new Array(5);

myArray[0] = "hello";
myArray[1000] = "goodbye";


let myObect = {};
let myObject2 = new Object();

// Comparison Operators
// == Checks value of data types to see if they're the same. 
// Will try to make the two the same.

// ===  
// Compares values AND datatypes.
// < or <=
// > or >=
// ! or !==

// Math Operators
// +, -, /, *, %

//if statements
if (false) {}

if (false) {} else {}

// the 'else if' will only run if the condition was false


if (false) {} else if (false) {}

// both of the 'if' staements will run regardless of each other's condition

if (false) {} else if (false) {} else {}

// Loops

// Similar to 'if' statement, but once completed will run again it condition is true.

while (false) {};

do {} while (false);

for (let i = 0; i <10; i++) {};

// Functions

let actualPiNumber = Math.PI;

function myFunction() {

}

myFunction();

let a = 100;
let b = a;
let c = b;
let d = c;

var z = myFunction;
var y = z; 
var x = y;

// Test if we can pass function definiteons when we use "Traditional" function definiteon. 

x();

function myFunction2(myFirstParameter) {
    myFirstParameter;

    return null;
}

myFunction2("hello world");
myFunction2("goodbye world");
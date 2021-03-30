const fs = require("fs");

//Holds the terminals' commands' arguments. Not function arguments.
process.argv;
console.log(process.argv);1

//CRUD: Create, read, update, delete.
//All CRUD ops will not ask for permission. It will just execute the line.

//Creating a file using Node FS module.
//Replaces existing files with same name, and replaces content.

//Argument order is : filename, contents, character set.
fs.writeFileSync("new_file.txt", "hello everyone", "utf-8");


let myCode = ` 
console.log("How are you doing?");

console.log(100 * 100)
`

//Argument order is : filename, contents, character set.
fs.writeFileSync("javascriptcode.js", myCode, "utf-8");

console.log("Finished creating files.");

//Read files with Node FS.

//Argument order: filename, character set.
let fileContents = fs.readFileSync("new_file.txt", "utf-8");

console.log(fileContents);

let essayContents = fs.readFileSync("really_important.txt", "utf-8");

//Code to detect how many works are in essayContents.

let essayArray = essayContents.split(" ")
console.log(`The essay has ${essayArray.length} words in it. `)

//Reads file booleans.js hoping to be a boolean.
let readData = fs.readFileSync("booleans.js", "utf-8");
//Anything external to JavaSript will be imported as a string.
console.log(typeof parseInt(readData));
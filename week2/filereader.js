const fs = require("fs");
const arguments = process.argv;

let fileName = arguments[2];

if (fileName === undefined) {
    console.log(`Welcome to file reader. Please provide the file name to read at the end of the command.
    
    Example: node filereader.js myfile.txt`)
    return;
}

if (fs.existsSync(fileName)) {
    
//Read the filebased on the arguent in the ocmmand.
let fileContents = fs.readFileSync(fileName, "utf-8");

console.log(fileContents);


} else {
    console.log("Sorry, that file does not exist. Check spelling or directory.");
}

let arguments = process.argv;
// console.log(arguments);

let request = arguments[2];

if (request === "hello") {
    console.log("Hey, what is going on?");
    }  else if (request === "weather") {
        console.log("Sorry, but I dont have any internet right now.");
    }  else {console.log("Sorry, i dont understand your request"); 
}
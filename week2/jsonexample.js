const fs = require("fs");

fs.writeFileSync("myJSON.json", "", "utf-8");

let myObject = {
    aString : "this is a string",
    aNumber: 100,
    aBoolean : true,
    anObject: {
        anotherNumber: 1,
        anotherString: "hi",
    }
}
let convertedObject = JSON.stringify(myObject);
console.log(convertedObject);

fs.writeFileSync("myJSON.json", convertedObject, "utf-8");

//Reading JSON
let fileContents = fs.readFileSync("myJSON.json", "utf-8");

let readObject = JSON.parse(fileContents);

console.log(typeof readObject);
console.log(readObject.anObject.anotherNumber);
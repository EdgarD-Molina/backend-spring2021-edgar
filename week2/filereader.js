const fs = require("fs");
const arguments = process.argv;

let fileName = arguments[3];
let action = arguments[2];
let contents = arguments[4];
let fileName2 = contents;
let mergedFile = arguments[5]

if (fileName === undefined) {
    console.log(`Welcome to file reader. Please provide the file name at the end of the command.
    
    Example:                  
    Read an existing file     node filereader.js read myfile.txt
    Write a new file:         node filereader.js write newFile.txt
    Update an existing file:  node filereader.js update myFile.txt
    Merge any current files:  node filereader.js merge file1 file 2
    Delete an existing file:  node filereader.js delete myFile.txt`)
    return;
}

if (action === "read") {
    
    if (fs.existsSync(fileName)) {
        //Read the file based on the arguent in the command.
        let fileContents = fs.readFileSync(fileName, "utf-8");

        console.log(fileContents);

    } else  {
              console.log("Sorry, that file does not exist. Check spelling or directory.");
            }

} else if (action === "write") {
    if (fs.existsSync(fileName)) {
        console.log("A file with this name already exists. Choose different name.");
    }
    fs.writeFileSync(fileName, contents, "utf-8");
    console.log("New file created as " + fileName, ".");

} else if (action === "update") {

    if(fs.existsSync(fileName)) {
        fs.appendFileSync(fileName, "\n" + contents, "utf-8");
        console.log("Updated file " + fileName);

    } else 
            {
                console.log("This file does not exist. It was created now for you.");
                fs.appendFileSync(fileName, contents, 'utf-8');
            }
    
} else if (action === "delete") {

} else if (action === "merge") {
    if (fs.existsSync(fileName) && fs.existsSync(fileName2)) {
        let fileContents = fs.readFileSync(fileName, "utf-8");
        let fileContents2 = fs.readFileSync(fileName2, "utf-8");
        let mergedContents = fileContents + "\n" + fileContents2;

        if (fs.existsSync(mergedFile)) {
            console.log("Sorry, unable to merge. That name already exists.");
        } else {
            fs.writeFileSync(mergedFile, mergedContents, "utf-8");
            console.log("files succesfully merged");
        }


    } else {
        console.log("Sorry, one of these files does not exist. Please check spelling or directory.");
    }

}
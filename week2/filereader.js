const fs = require("fs");
const arguments = process.argv;

let fileName = arguments[3];
let action = arguments[2];
let contents = arguments[4];
let fileName2 = contents;
let mergedFile = arguments[5]


// Reassign contents variable as an empty array element holds the value undefined.
if (action === undefined) {
    console.log(`Welcome to file reader. Please provide the file name at the end of the command.
    
    Example:                  
    Read an existing file     node filereader.js read myfile.txt
    Write a new file:         node filereader.js write newFile.txt "New text to write"
    Update an existing file:  node filereader.js update myFile.txt "Text you want to add"
    Merge any current files:  node filereader.js merge file1.txt file2.txt mergedfilename.txt
    Delete an existing file:  node filereader.js delete myFile.txt true `)
    return;
}

if (action === "read") {
    
    //Checks if file exists
    if (fs.existsSync(fileName)) {
        //Read the file based on the arguent in the command.
        let fileContents = fs.readFileSync(fileName, "utf-8");

        console.log(fileContents);

    } else  {
              console.log("Sorry, that file does not exist. Check spelling or directory.");
            }

} else if (action === "write") {
    //Check if file exists
    if (fs.existsSync(fileName)) {
        console.log("A file with this name already exists. Choose different name.");
    } else {
        //If it doesn't exist, we will make it safely.
    fs.writeFileSync(fileName, contents, "utf-8");
    console.log("New file created as " + fileName, ".");
    }
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
    if(fs.existsSync(fileName)) {
        if(contents === "true") {
            fs.unlinkSync(fileName);
            console.log(fileName + " succesfully deleted.");
        } else {
            console.log("Sure you want to delete? Run command with 'true' as final argument");
        }  
    } else {
        console.log("No file with that name exists. Check argument.");
     }

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

} else if (action === "copy") {
    
      if (fs.existsSync(fileName)) {
          let fileContents = fs.copyFileSync(fileName, "newcopyfile.txt");
          let copiedFile = fileContents;
            // if (fs.writeSync(copiedFile, "utf-8"));
            console.log("Copy succesful.");
      }

        else {console.log("Sorry, that file does not exist. Cannot copy");}
        // fs.readFileSync(fileName, "utf-8"); {

        //     fs.copyFileSync(fileName, "copycopycopy.txt");
        //     console.log("File copied succesfully.") }

} else {
    console.log("There is no action by that name. You can read, write, update, delete, merge, or copy.");
    }

    //     console.log("You can copy files using the 'copy' feature. Using the argument of 'copy' .")
    // if (fs.existsSync(fileName)) {
    //     copyFileSync(fileName + fileContents,);
    //     console.log('source.txt was copied to destination.txt');
    //     }
    
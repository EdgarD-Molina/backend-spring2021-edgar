// Don't use "name" as a variable name when using Node.

const express = require("express");
const fs = require("fs");
const task = require("./Task.js");
const app = express();
const http = require("http").Server(app);
const port = 3000;

http.listen(port);

console.log("Express server is now running on port " + port, 
" Use CTRL + C to end server hosting.");

//Variables for the task object, and file name.
let tasks;
let taskFileName = "tasks.json";

// Prepare JSON tasks file
 if (fs.existsSync(taskFileName)) {
    //Read the file
    let fileContents = fs.readFileSync(taskFileName, "utf-8");
    //Convert JSON to actual JavaScript
    tasks = JSON.parse(fileContents);
    //ToDO: Write code that converts generic objects into Task Objects

    // Convert the JS objects from JSON file to proper task objects.
    convertedObjects = [];

    tasks.incompleted.forEach(function (jsonTask) {
       let newTaskObject = new task.Task();
       convertedObjects.push(newTaskObject.jsonConvert(jsonTask));
     });

     tasks.incompleted = convertedObjects;
 } else {
    //Otherwise if file doesn't exist, create Task Object.
    tasks = {
        incompleted: [],
    }
    //Write task object to file name.
    fs.writeFileSync(taskFileName, JSON.stringify(tasks), "utf-8");
 }
 
// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes
//The default route for when a visitor requests a URL without a filepath.
app.use("/", express.static("public_html/"));

// POST Handler for adding a new task.
app.post("/add-task", function (req, res) {
   let taskData = req.body;
   //TODO: Detect if there is actual text in text property.
   //Create a task object based on the data received from the front-end.
   let taskObject = new task.Task(taskData.text, taskData.priority, taskData.dueDate);

   //Store new Task Object into the tasks incompleted array.
   tasks.incompleted.push(taskObject);

   //Save the file / Update the json flie.
   saveFile();

   //Send a response to the front-end.
   res.send({error: null});
});

//POST handler for getting all tasks.
app.post("/get-tasks", function (req, res) {

   //FIlter out tasks that are complete, or deleted.
   let incompleteArray = tasks.incompleted.filter(function (task) {
      //If task has deleted or completed date, it fails the filter test.
      if (task.isDeleted() || task.isCompleted()) {
         return false;
      } else {
         return true;
      }
   });

   //Build object holding all the Tasks objects that pssed the filter test.
   let responseObject = {
      incompleted: incompleteArray
   };


   //Send the resulting object to the front end.
   res.send(responseObject);
});

app.post("/complete-task", function (req, res) {

   let id = req.body.id;

   // Go through each task in the tasks array and find the one with the matching ID.
   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (tasks.incompleted[i].id === id) {
         // If ID matches them mark the Task Object deleted.
         tasks.incompleted[i].markCompleted();
         break;
      }
   }

   saveFile();

   // Just send a message to the front-end.
   res.send({});
});


//POST Handler for deleting a single task.
app.post("/delete-task", function (req, res) {
   let id = req.body.id;

   //Go through each task in the tasks array and find the one with the matching ID.
   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (tasks.incompleted[i].id ===id) {
         //If the ID matches then mark the task object deleted.
         tasks.incompleted[i].markDeleted();
         break;
      }
   }

   saveFile();
   //Just send a message to the front end.
   res.send({});
})

app.post("/update-task", function (req, res) {
   let id = req.body.id;
   let updates = req.body;

   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (id === tasks.incompleted[i].id) {
         tasks.incompleted[i].setText(updates.text);
         tasks.incompleted[i].setDueDate(updates.dueDate);
         tasks.incompleted[i].setPriority(updates.priority);
      }
   }

   saveFile();

   res.send({});
});

//TODO: Find out a way to delay multiple calls of this function.

//the saveFile function will convert our task object into JSON and save it to our file.
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8");
}
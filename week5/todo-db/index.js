// Don't use "name" as a variable name when using Node.
// Mongo-sanitize is for removing potential query code from front-end input.
const sanitize = require("mongo-sanitize");
const mongoose = require("mongoose");
const express = require("express");
const task = require("./Task.js");
const credentials = require("./credentials.js");
const app = express();
const http = require("http").Server(app);
const port = 3000;

http.listen(port);

console.log("Express server is now running on port " + port, "Use CTRL + C to end server hosting.");

// Connect to MongoDB Atlas
mongoose.connect(credentials.dbURL, credentials.dbOptions, function (error) {
   if (error) {
      console.log("Failed to connect to MongoDB " + error);
   } else {
      console.log("Succesfully connected to MongoDB");
   }
});

// MongoDB COnnection object, error binding, and setting promises.
let db = mongoose.connection;
db.on("error", console.error.bind(console, "We had a Mongo error "));
mongoose.Promise = global.Promise;

//Our MongoDB "document format" 
let Schema = mongoose.Schema;
let TaskSchema = Schema({
   text: String,
   priority: Number,
   dueDate: String,
   //Test if we can save objects that "look" like objects.
   dateCreated: String,
   dateDeleted: String, 
   dateCompleted: String
});

//Attaching the Task class to all of our database documents when loaded into JavaScipt.
TaskSchema.loadClass(task.Task);

let ToDoModel = new mongoose.model("tasks", TaskSchema);

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes

//The default route for when a visitor requests a URL without a filepath.
app.use("/", express.static("public_html/"));

// POST Handler for adding a new task.
app.post("/add-task", function (req, res) {
   let taskData = req.body;

   //Build new Mongoose object.
   let newTask = new ToDoModel({
      dateCompleted: null, 
      dateDeleted: null,
      dateCreated: new Date()
   });

   //Run Mongoose Object methods that were given by the Task class.
   newTask.setText(sanitize(taskData.text));
   newTask.setPriority(taskData.priority);
   newTask.setDueDate(taskData.dueDate);
   newTask.save(function (error) {
      if (error) {
         console.log("Something went wrong in MongoDB for saving: " + error);
         res.sendStatus(500);
      } else {
         //Send a response to the front-end.
         res.send({error: null})
      }
   });

});

//POST handler for getting all tasks.
app.post("/get-tasks", function (req, res) {

   //Look in the database for documents that have null for dateDeleted and dateCompleted. 
ToDoModel.find({dateDeleted: null, dateCompleted: null}, function (error, results) {
      
      //Check for MongoDB error.
      if (error) {
         console.log("Failed to search for all documents: " + error);
         res.sendStatus(500);
      } else {
            //Build object holding all the Tasks objects that passed the filter test.
            console.log(results);
            //Create and object to send to the front-end, holding our results.
            let responseObject = {
            incompleted: results
            };
            
            //Send the resulting object to the front end.
            res.send(responseObject);
         }
      } 
   );
});

// Mark a MongoDB document Task complete.
app.post("/complete-task", function (req, res) {

   let _id = req.body.id;

   //Find the document with thte specified ID...
   ToDoModel.find({_id: _id}, function (error, results) {
      if (error) {
         
      } else {
         ///...and mark it complete.
         results[0].markCompleted();
         results[0].save(function(error) {
            if(error) {
               console.log(error);
                  res.sendStatus(500);
            } else {
               // Just send a message to the front-end.
               res.send({});
            }
         });
      }
   });
   
});


//POST Handler for deleting a single task.
app.post("/delete-task", function (req, res) {
   let _id = req.body.id;

   ToDoModel.find({_id: _id}, function (error, results) {
      if (error) {
         
      } else {
         //Mark found document as deleted by giving the dateDeleted a value.
         results[0].markDeleted();
         results[0].save(function(error) {
            if(error) {
               console.log(error);
                  res.sendStatus(500);
            } else {
               // Just send a message to the front-end.
               res.send({});
            }
         });
      }
   });
});

//Update Task document with new values.
app.post("/update-task", function (req, res) {
   let _id = req.body._id;
   let updates = req.body;

   //Search for documents with specific ID...
   ToDoModel.find({_id: _id}, function (error, results) {
      if (error) {

      } else {
         //...and update all values USING task setters. 
         //Test if we 0 results from database.
         results[0].setText(sanitize(updates.text))
         results[0].setPriority(updates.priority);
         results[0].setDueDate(updates.dueDate);
         results[0].save(function (error) {
            if (error) {
               console.log(error);
               res.sendStatus(500);
            } else {
               res.send({});
            }
         })
      }
   })

     // This code makes it easier to code inject as the data does directly from front-end to database.
   // TodoModel.findByIdAndUpdate(_id, updates, function (error, results) {
   //    if (error) {
   //       console.log("Something happened updating a document: " + error);
   //    } else {
   //       console.log("Updated document, previous version: " + results)
   //    }
   // });

});
//Get the FS package from node


const fs = require("fs");

//Create a Task Class
class Task {
    constructor(text, priority, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.dateCreated = new Date();
        this.priority =priority;
        this.dateCompleted = null;
    }
}

// Load existing tasks saved in tasks.json
let fileContents = fs.readFileSync("tasks.json", "utf-8");
let previousTasks = JSON.parse(fileContents);
let taskArray = previousTasks.tasksList;
let taskArrayCompleted  = previousTasks.taskListCompleted;

//Get info/artguments from user input/CLI 
let action = process.argv[2];
//For add
let text = process.argv[3];
let priority = process.argv[4];

// Check what argument/input user haas given.
if (action === "add") {

    //add new task into the array
       taskArray.push(new Task(text,priority));
        console.log("Task added");
    } else if (action === "list") {

        //set current list to the default array
        let currentList = taskArray;

        //check if user wants the completed list instead & replace current list with completed array
        if (text == "completed" || text === "complete") {
            currentList = taskArrayCompleted;
        }

        //Goes through each item in the current list
        for (let i = 0; i < taskArray.length; i++) {

            // will display if complete or not
            if (taskArray[i].dateCompleted === null) {
                var completed = "No";
            }  else {
                       var completed = "Yes";
                }

            // after going through each item, will write out the info of the task.
            let taskList = 
            `${i + 1} 
            priority:  ${currentList[i].priority} 
            Task:      ${currentList[i].text} 
            Due Date:  ${currentList[i].dueDate} 
            Completed: ${completed}`;
            console.log(taskList);
        }


} else if (action === "complete") {

    //conver the user number into an array index number.
    const taskNumber = parseInt(text) - 1;

        //if not a valid number, tell the user the error and then end script.
        if (Number.isNaN(taskNumber)) {
            console.log("sorry, please use a number value.");
            return;

        }

        //store copy of the task we are going to complete
        let task = taskArray[taskNumber];

        //give a date to the corresponding property
        task.dateCompleted = new Date();

        //remove the original task from our todo list
        taskArray.splice(taskNumber,1);

        //push the copied task to the completed list
        taskArrayCompleted.push(task);

} else if (action === "delete") {

    //if user types complete or completed
    if (text === "complete" || text === "completed") {

        //Check if value after it is an actual valid number, if not valid, tell the user and then end script.    
        if (Number.isNaN(parseInt(priority))) {
                console.log("Sorry, please use a valid number.");
                return;
        }

        //convert the users number into a proper index number.
        let indexNumber = parseInt(priority) - 1;

        //removes the task from the completed list.
        taskArrayCompleted.splice(parseInt(indexNumber), 1);
        console.log("Task has been deleted from complete list");
    }   else {

            //checks if there is a valid number in the fourth argument, if invalid, tell user then end script.
            if (Number.isNaN(parseInt(text))) {
            console.log("sorry, not a a valid number.");
            return;
            }
        }

        //converts the user number into a proper index number.
        let indexNumber = parseInt(text) -1;

        //remove the task from regular todo list.
        taskArray.splice(indexNumber, 1);
            console.log("Task succesfully deleted from todo list.");
} else {
    //if no proper action argument, then provide this into message
    console.log("Welcome for the Todo-CLI. To start type an action and data at the end of the command.");

    console.log(`
    Examples: 
    node . add "task description here" "priority number here."
    node . list 
    node . complete "task number."
    node . delete "task number."
    node . deleted completed "task number"
    node . edit (work in progress)
    node . edit duedate completed 1 "Aug 2, 2021"
    node . edit text 3 "get Milk"
    `)
}

//Create an object to save as JSON to tasks.json (replacing previous copy.)
let objectToSave = {
    tasksList: taskArray,
    taskListCompleted: taskArrayCompleted
}

objectToSave = JSON.stringify(objectToSave);
    fs.writeFileSync("tasks.json", objectToSave, "utf-8");

// console.log(taskArray);
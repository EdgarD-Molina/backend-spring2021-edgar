// Define Task class
class Task {
    // Getter/Setter for the Task text.
    getText() {return this.text;}
    setText(text) {
        if (typeof text === "string") {
            this.text = text;
        } else {
            this.text = "INVALID VALUE";
        }
    }

    // Setter/Getter for Task due date.
    getDueDate() {return this.dueDate;}
    setDueDate(dueDate) {
        // Test the provided due date string with Regular Expressions.
        // Tests toString Value:  ^[a-zA-Z]{3} [a-zA-Z]{3} [0-9]{2} [0-9]{4} [0-2][0-9]:[0-9]{2}:[0-9]{2} [A-Z]{3}(-|\+)[0-9]{4} \(.*\)$
        let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        // Test the string with our regular expression pattern.
        let validDate = datePattern.test(dueDate);

        // If it passes the test...
        if (validDate) {
            //...Split the string and convert the String number into Number numbers
            let dateParts = dueDate.split("-");

            dateParts[0] = parseInt(dateParts[0]);
            dateParts[1] = parseInt(dateParts[1]);
            dateParts[2] = parseInt(dateParts[2]);

            // Subtract 1 from month value, as month in Date Object starts from 0.
            dateParts[1] = dateParts[1] - 1; //dateParts[1]--;

            // Check if numbers are not out of bounds, otherwise correct them.
            if (dateParts[1] > 11) {
                dateParts[1] = 11;
            }
            
            if (dateParts[2] > 31) {
                dateParts[2] = 31;
            }

            // Create a new Date object based on the numbers from the front-end.
            this.dueDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
            return 0;
        } else {
            // If it fails the test, return a 1.
            this.dueDate = new Date();
            return 1;
        }
    }

    // Setter/Getter for priority.
    getPriority() {return this.priority}
    setPriority(priority) {
        // Try to parse into number, if it fails, return a 1.
        priority = parseInt(priority);
        if (Number.isNaN(priority)) {
            this.priority = 1;
            return 1;
        } else {
            this.priority = priority;
            return 0;
        }
    }

    // Extra helpful methods.
    markCompleted() {
        this.dateCompleted = new Date();
    }

    isCompleted() {
        if (this.dateCompleted === null) {
            return false;
        } else {
            return true;
        }
    }

    markDeleted() {
        this.dateDeleted = new Date();
    }

    isDeleted() {
        if (this.dateDeleted === null) {
            return false;
        } else {
            return true;
        }
    }
}

// Allow other files to use the Task class.
module.exports = {
    Task: Task
};
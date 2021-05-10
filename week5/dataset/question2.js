const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;


// QUESTION 2: What day of the week is (on average) the most active? What hour (on average) for the week is the most active?

console.log("What day of the week is (on average) the most active? What hour (on average) for the week is the most active?");
// Incident Time and Incident Day of Week.

let dayCounter = {
    "Sunday": 0,
    "Monday": 0,
    "Tuesday": 0,
    "Wednesday": 0,
    "Thursday": 0,
    "Friday": 0,
    "Saturday": 0
};

let hourCounter = [];

objectArray.forEach(function (entry) {

    let hour = parseInt(entry['Incident Time'].split(":")[0]);

    if (hourCounter[hour] === undefined) {
        hourCounter[hour] = 1;
    } else {
        hourCounter[hour]++;
    }

    switch (entry['Incident Day of Week']) {
        case "Sunday":
            dayCounter.Sunday++;
            break;
        case "Monday":
            dayCounter.Monday++;
            break;
        case "Tuesday":
            dayCounter.Tuesday++;
            break;
        case "Wednesday":
            dayCounter.Wednesday++;
            break;
        case "Thursday":
            dayCounter.Thursday++;
            break;
        case "Friday":
            dayCounter.Friday++;
            break;
        case "Saturday":
            dayCounter.Saturday++;
    }

});

let highestCount = 0;
let highestDay;

 for (let day in dayCounter) {
    if (dayCounter[day] > highestCount) {
        highestCount = dayCounter[day];
        highestDay = day;
    }
};

console.log("The day with the most activity is " + highestDay);

let highestHour = Math.max(...hourCounter);
let highestIndex = hourCounter.indexOf(highestHour);

if (highestIndex >= 12) {
    console.log("The most active hour of the day is " + (highestIndex === 12 ? "12": highestIndex - 12) + "PM.");
} else {
    console.log("The most active hour of the day is " + (highestIndex === 0 ? "12": highestIndex) + "AM.")
}


// QUESTION 2: END
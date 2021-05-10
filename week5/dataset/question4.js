const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;

// QUESTION 4: How many open/active vs closed? Per Year? Per Month?
console.log("How many open/active vs closed? Per Year? Per Month?");

let activeClose = {};

for (let i = 0; i < objectArray.length; i++) {

    let entry = objectArray[i];
    const date = objectArray[i]['Incident Date'];
    const year = date.split('/')[0];

    if (!activeClose.hasOwnProperty(year)) {
        activeClose[year] = {};
    }

    if (activeClose[year].hasOwnProperty(entry['Resolution'])) {
            activeClose[year][entry['Resolution']] += 1;
        } else {
            activeClose[year][entry['Resolution']] = 1;
    }
    
}

for (let year in activeClose) {

    console.log(`For the year ${year}, we had ${activeClose[year]['Open or Active']} for Open or Active, and ${activeClose[year]['Cite or Arrest Adult']} for Cite or Arrest.`);

}

// Question 4: END
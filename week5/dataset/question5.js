const dataset = require("./dataset.js");
const dsFunctions = require("./dataset-functions.js");
let objectArray = dataset.objectArray;

// Question 5: What street has the most activity?
console.log("What street has the most activity?");

let streets = {};

for (let i = 0; i < objectArray.length; i++) {

    let entry = objectArray[i];
    let streetArray = entry["Intersection"].split("\\");
    streetArray = streetArray.map(function (street) {
        return dsFunctions.stripSpace(street);
    });


    for (let i = 0; i < streetArray.length; i++) {
        let street = streetArray[i];

        // or if it starts with UNAMED
        if (street === "" || street.includes("UNNAMED")) {
            continue;
        }

        if (streets.hasOwnProperty(street)) {
            streets[street] += 1;
        } else {
            streets[street] = 1;
        }
    }
}



let highestStreetCount = 0;
let highestStreetName;

for (let street in streets) {

    if (streets[street] > highestStreetCount) {
        highestStreetCount = streets[street];
        highestStreetName = street;
    }
}

console.log(`The street with the most police activity is ${highestStreetName} with a total of ${highestStreetCount} incidents.`);

// Question 5: END
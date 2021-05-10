const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;

// QUESTION 3: Which neighborhood is the most active and least active? Supervisor district? (with and without supplements)
console.log("Which neighborhood is the most active and least active? Supervisor district?");
let resultsQuestion3 = {};
let resultsQuestion3District = {};

for (let i = 0; i < objectArray.length; i++) {

    let entry = objectArray[i];

    if (resultsQuestion3.hasOwnProperty(entry['Analysis Neighborhood'])) {

        var neighborhood = entry['Analysis Neighborhood'];

        resultsQuestion3[neighborhood] += 1;
    } else {
        resultsQuestion3[entry['Analysis Neighborhood']] = 1;
    }


    if (resultsQuestion3District.hasOwnProperty(entry['Supervisor District'])) {
        resultsQuestion3District[entry['Supervisor District']] += 1;
    } else {
        resultsQuestion3District[entry['Supervisor District']] = 1;
    }
}

let highestNeighborhoodCount = 0;
let highestNeighborhoodName;

for (let neighborhood in resultsQuestion3) {

    if (resultsQuestion3[neighborhood] > highestNeighborhoodCount) {
        highestNeighborhoodCount = resultsQuestion3[neighborhood];
        highestNeighborhoodName = neighborhood;
    }
}

let highestDistrict = 0;
let highestDistrictName;

for (let district in resultsQuestion3District) {

    if (resultsQuestion3District[district] > highestDistrict) {
        highestDistrict = resultsQuestion3District[district];
        highestDistrictName = district;
    }
}

console.log(`The neighborhood with the highest activity is ${highestNeighborhoodName} with ${highestNeighborhoodCount} entries.`);
console.log(`The district with the highest activity is ${highestDistrictName} with ${highestDistrict} entries.`);

// QUESTION 3: END
const {performance} = require('perf_hooks');
let t0 = performance.now();

const fs = require("fs");

let dataset = fs.readFileSync("dataset.csv", "utf-8");

let lineArray = dataset.split("\n");
let dataHeadings = lineArray[0].split(",");
let ignoredIndexes = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 19, 20, 23, 24, 25, 26];
let objectArray = [];

for (let i = 0; i < lineArray.length; i++) {
    objectArray.push(convertEntry(lineArray[i], dataHeadings));
} 
console.log(objectArray);

function convertEntry(entry, titles) {
    let dataArray = quoteFix(entry);
    let dataObject = {};

    titles.forEach(function (arrayElement, i) {
        if (ignoredIndexes.includes(i)) {
            return;
        }
        dataObject[arrayElement] = dataArray[i];
    });
    return dataObject;
}

// Issues with array tracking, break down further to understand exact logic.
function quoteFix(entry) {
    let regex = /"/m;
    let results = regex.test(entry);

    if (results) {
        let entryArray = entry.split(",");
        let entryWithoutQuotes = [];
        let closingQuoteIndex = -1;

        for  (let i = 0; i < entryArray.length; i++) {

            // Adding continue and not adding 1, starts at 'motorcyle' for 5002.
            if (i < closingQuoteIndex) {
                i = closingQuoteIndex + 1;
            }

            let value = entryArray[i];

            if (value[0] === '"') {
                let completeString = value + " , " ;

                for (let j = i + 1; j < entryArray.length; j++) {
                    let endingValue = entryArray[j]; 

                    if (endingValue[endingValue.length - 1] === '"') {
                        completeString = completeString + endingValue;
                        closingQuoteIndex = j;
                        break;
                    } else {
                        completeString = completeString + endingValue + ",";
                    }
                }
                entryWithoutQuotes.push(removeQuotes(completeString));
            } else {
                entryWithoutQuotes.push(value);
            }
        }
        return entryWithoutQuotes;
    } else {
        return entry.split(",");
    }
}

function removeQuotes(text) {
    let textArray = text.split("");
    textArray.pop();
    textArray.shift();
    return textArray.join("");
}

let t1 = performance.now();

console.log(`This script took ${t1 - t0} milliseconds to execute!`);
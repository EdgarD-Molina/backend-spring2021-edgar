const fs = require("fs");

let dataset = fs.readFileSync("dataset.csv", "utf-8");

let lineArray = dataset.split("\n");

let dataHeadings = lineArray[0].split(",");

let ignoredIndexes = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 19, 20, 23, 23, 24, 25, 26];

console.log(convertEntry(lineArray[5002]));

function convertEntry(entry) {
    let dataArray = entry.split(",");
    let dataObject = {};
    dataHeadings.forEach(function (arrayElement, i) {
    
        if (ignoredIndexes.includes(i)) {
            return;
        }
        
        dataObject[arrayElement] = dataArray[i];
    });
    return dataObject;
}

function quoteFix(entry) {
    let regex = /"/m;
    let results = regex.test(entry);

    if (results) {

        let entryArray = entry.split(",");
        let entryWithoutQuotes = [];

        for  (let i = 0; i < entryArray.length; i++) {
            if (entryArray[i][0] === '"') {

                    // add the following array elements until closing quote into a string. Push the complete string into array.

            } else {
                entryWithoutQuotes.push(entryArray[i]);
            }
        }

    } else {
        return entry;
    }
}

var fs = require("fs");


/**
 * sumObject() takes a JSON file and adds together all the numbers
 * that are part of the object, whether they are in arrays or subproperties.
 * See adventofcode.com/day/12 for more information.
 * @param {String} file       the path to the JSON file
 * @param {Function} callback a callback that takes the output of parseObject
 *                            as its only argument
 */
function sumObject(file, callback) {
    var input = JSON.parse(fs.readFileSync(file, "utf8"));
    var sum = 0;
    callback(parseObject(input, 0));
}


/**
 * parseObject() takes an object and sums every number in the
 * object, includeing those in nested objects or arrays.
 * @param {Object} obj the object to sum
 */
function parseObject(obj) {
    var currentTotal = 0;

    // Loops through each property in obj
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof(obj[property]) === "object") {
                currentTotal += parseObject(obj[property]);
            } else if (typeof(obj[property]) === "number"){
                currentTotal += obj[property];
            }
        }
    }
    return currentTotal;
}

function output(result) {
    console.log(result);
}

sumObject("./input.json", output);

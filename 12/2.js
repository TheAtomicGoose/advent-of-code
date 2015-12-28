var fs = require("fs");

/**
 * Adds a new function to Object.prototype that checks if the object contains a value
 * @param {Anything} val the value to check for inside of this
 * @return {Boolean}     whether or not the object contains the value
 */
Object.prototype.hasOwnValue = function(val) {
    for (var prop in this) {
        if (this.hasOwnProperty(prop) && this[prop] === val) {
            return true;
        }
    }
    return false;
}

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
 * @return {Number}    the sum of the object's numbers
 */
function parseObject(obj, total) {
    var currentTotal= total;
    
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (obj instanceof Array || !obj.hasOwnValue("red")) {
                if (typeof(obj[property]) === "object") {
                    currentTotal += parseObject(obj[property], 0);
                } else if (typeof(obj[property]) === "number"){
                    currentTotal += obj[property];
                }
            }
        }
    }
    return currentTotal;
}

function output(result) {
    console.log(result);
}

sumObject("./input.json", output);

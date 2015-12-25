/**
 * lookAndSay() takes a number and returns a string containing the number
 * of each digit in the number plus the number itself, for every digit in
 * the original number. So, 1 becomes 11, 11 becomes 21, 21 becomes 1211, etc.
 * See adventofcode.com/day/10 for details.
 * @param {Number} input the number to convert
 * @return {String}      a number in string form, the converted form of the input
 */
function lookAndSay(input) {
    var result = "";
    
    if (typeof(input) === "number") {
        input = input.toString();
    }

    for (var i = 0; i < input.length; i++) {
        var current = 1;
        while (i + current <= input.length && input[i] === input[i + current]) {
            current++;
        }
        result += current.toString() + input[i];
        i += current - 1;
    }

    return result;
}

// Using an initial input, repeatLookAndSay() calls lookAndSay() using
// its own output as the input numTimes number of times
function repeatLookAndSay(input, numTimes, callback) {
    var initial = input;
    for (var i = 0; i < numTimes; i++) {
        initial = lookAndSay(initial);
    }
    callback(initial);
}

// Logs the length of result to the console
function output(result) {
    console.log(result.length);
}

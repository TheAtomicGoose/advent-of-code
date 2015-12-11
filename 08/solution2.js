/**
 * total() passes the number of characters of code required to escape
 * each string in instructionsFile minus the number of characters that it takes
 * to form the original string, into callback. See http://adventofcode/day/8 for more details.
 *
 * @param {String} instructionsFile a filepath to a file with a list of strings, each on
 *                                  their own line, in quotations and with characters
 *                                  escaped with backslashes.
 * @param {Function} callback       a callback to pass the final total to
 */
function total(instructionsFile, callback) {

    var reencodedTotal = 0;
    var codeTotal = 0;

    // Creates a new reader that reads from instructionsFile
    var rl = require("readline").createInterface({
        input: require("fs").createReadStream(instructionsFile)
    });

    // For every line in instructionsFile
    rl.on("line", function(line) {

        // Add the number of digits required to code the string to codeTotal
        codeTotal += line.length;

        // Go through the string and check escape sequences
        for (var i = 0; i < line.length; i++) {
            
            if (line.charAt(i) === "\"" || line.charAt(i) === "\\") {
                reencodedTotal += 2;
            } else {
                reencodedTotal++;
            }
        }

        // For the quotes to surround the reencoded string with
        reencodedTotal += 2;
    });

    // When every line has been totalled, return the difference
    rl.on("close", function() {
        console.log(reencodedTotal - codeTotal);
        callback(reencodedTotal - codeTotal);
    });
}

function output(result) {
    console.log(result);
}

total("./input.txt", output);

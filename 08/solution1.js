/**
 * total() returns the number of characters of code required to declare
 * each string in instructionsFile minus the number of actual characters once the string is
 * evaluated. See http://adventofcode/day/8 for more details.
 *
 * @param {String} instructionsFile a filepath to a file with a list of strings, each on
 *                                  their own line, in quotations and with characters
 *                                  escaped with backslashes.
 * @param {Function} callback       the function to pass the final total into
 */
function total(instructionsFile) {

    var charTotal = 0;
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

            // If there is an escape at the current character
            if (line.charAt(i) === "\\") {

                // If there is a hex escape string
                if (line.charAt(i + 1) === "x") {

                    // Add one to charTotal since four characters account for
                    // one evaluated character
                    charTotal++;

                    /* 
                     * Hex escape strings are always 4 chars long, so adding
                     * three to i gets you four characters advanced once the
                     * loop adds 1 (when it does i++)
                     */
                    i += 3;

                // If the escape string is a normal escape string
                } else {

                    charTotal++;

                    // Skip one character since the escape string is
                    // a total of two characters long
                    i++;
                }
            // If there isn't an escape, just add one to charTotal
            } else {
                charTotal++;
            }
        }
        // This accounts for the beginning and ending quotes on each line
        // that don't count towards the evaluated characters count
        charTotal -= 2;
    });

    // When every line has been totalled, return the difference
    rl.on("close", function() {
        callback(codeTotal - charTotal);
    });
}

function output(result) {
    console.log(result);
}

total("./input.txt", output);

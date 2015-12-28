var combinatorics = require("js-combinatorics");

/**
 * parseInput() takes an input file and turns it into instructions that 
 * maxHappiness() can handle, then passes those instructions into maxHappiness().
 * @param {String} file       the file where the instructions are
 * @param {Function} callback the callback that takes a single parameter (the result of
 *                            maxHappiness())
 */
function parseInput(file, callback) {
    var instructions = [];

    // Get instructions file
    var rl = require("readline").createInterface({
        input: require("fs").createReadStream(file)
    });

    // Parse instructions file
    rl.on("line", function(line) {
        var currentLine = [];

        // First array element is the subject's name
        currentLine[0] = line.substring(0, line.indexOf(" "));

        // Whether they gain or lose happiness based on this placement
        (line.indexOf("gain") !== -1) ? currentLine[1] = 1 : currentLine[1] = -1;

        // Get rid of extraneous text
        for (var i = 0; i < 3; i++) {
            line = line.substring(line.indexOf(" ") + 1);
        }
        // Multiply second array element by absolute value of happiness change
        currentLine[1] *= parseInt(line.substring(0, line.indexOf(" ")));

        // Last array element is the person the subject is sitting next to
        currentLine[2] = line.substring(line.lastIndexOf(" ") + 1, line.length - 1);

        instructions.push(currentLine);
    });

    rl.on("close", function() {
        callback(maxHappiness(instructions));
    });
}

/**
 * maxHappiness() finds the maximal seating configuration based on the instructions
 * that it is given.
 * @param {Array} instructions the happiness of each person based upon who they're sitting next to
 * @return {Number}            the total happiness based on the optimal seating configuration
 */
function maxHappiness(instructions) {

    var people = [];
    var happiness = 0;

    // Fill out list of people
    instructions.forEach(function(element) {
        if (people.indexOf(element[0]) === -1) {
            people.push(element[0]);
        }
    });
    people.push("Me");

    var permutations = combinatorics.permutation(people).toArray();
    var bestConfig = permutations[0];

    for (var j = 0; j < permutations.length; j++) {
        var currentHappiness = 0;

        // Sum people from 2nd person to 2nd to last person
        for (var i = 1; i < permutations[j].length - 1; i++) {
            currentHappiness += happinessLookup(instructions, permutations[j][i], permutations[j][i - 1]);
            currentHappiness += happinessLookup(instructions, permutations[j][i], permutations[j][i + 1]);
        }

        // Account for the people on the ends
        currentHappiness += happinessLookup(instructions, permutations[j][0], permutations[j][1]);
        currentHappiness += happinessLookup(instructions, permutations[j][0], permutations[j][permutations[j].length - 1]);
        currentHappiness += happinessLookup(instructions, permutations[j][permutations[j].length - 1], permutations[j][0]);
        currentHappiness += happinessLookup(instructions, permutations[j][permutations[j].length - 1], permutations[j][permutations[j].length - 2]);

        // If this configuration is better than the best one, replace the best one with this one
        if (currentHappiness > happiness) {
            happiness = currentHappiness;
        }
    }

    return happiness;
}

/**
 * happinessLookup() finds the happiness of someone based on the person they're sitting next to
 * using the table of happinesses it's given.
 * @param {Array} happinessTable the table of happiness
 * @param {String} subject       the person whose happiness is being determined
 * @param {String} neighbor      the person the subject is sitting next to
 * @return {Number}              the happiness of the subject due to where they're sitting
 */
function happinessLookup(happinessTable, subject, neighbor) {
    // If I am involved in the seating arrangement
    if (subject === "Me" || neighbor === "Me") {
        return 0;
    }

    // Look up the subject and their neighbor's relationship in the table
    for (var i = 0; i < happinessTable.length; i++) {
        if (happinessTable[i].indexOf(subject) !== -1 && happinessTable[i].indexOf(neighbor) !== -1) {
            if (happinessTable[i].indexOf(subject) < happinessTable[i].indexOf(neighbor)) {
                return happinessTable[i][1];
            }
        }
    }
}

// Outputs whatever is passed into it
function output(result) {
    console.log(result);
}

parseInput("./input.txt", output);

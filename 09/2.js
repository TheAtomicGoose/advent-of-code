var combinatorics = require("js-combinatorics");
var async = require("async");

/**
 * longestRoute() parses the instructions in instructionsFile and
 * runs findLongestRoute() with those instructions, then passes the
 * output of findLongestRoute() to callback. See adventofcode.com/day/9
 * for more information.
 * @param {File} instructionsFile a file with the distance between two
 *                                cities on each line
 * @param {Function} callback     a callback that takes the results as
 *                                as its only argument
 */
function longestRoute(instructionsFile, callback) {

    var lines = [];

    // Starts reading the instructions file
    var rl = require("readline").createInterface({
        input: require("fs").createReadStream(instructionsFile)
    });

    /* 
     * Split each line into cities and distance, so
     *      Boston to New York = 200
     * becomes
     *      ["Boston", "New York", "200"]
     */
    rl.on("line", function(line) {
        lines.push(line.split(/ to | = /));
    });

    // Pass the results of the instructions to callback
    rl.on("close", function() {
        callback(findLongestRoute(lines));
    });
}

/**
 * findLongestRoute() finds the route to visit every city in the
 * instructions that is the greatest total distance
 * @param {Array} distances an array of distances between cities
 * @return {Number}         the distance of the longest route
 */
function findLongestRoute(distances) {

    var longest = Number.MIN_VALUE;
    var locations = [];

    // Fills in list of locations
    async.each(distances, function(distance) {
        for (var i = 0; i < 2; i++) {
            if (locations.indexOf(distance[i]) === -1) {
                locations.push(distance[i]);
            }
        }
    });

    // Get every order that the cities can be visited in
    var permutations = combinatorics.permutation(locations).toArray();

    // Find the distance of every permutation
    for (var i = 0; i < permutations.length; i++) {
        var currentRouteLength = 0;
        var broken = false;
        for (var j = 0; j < permutations[i].length - 1; j++) {
            var nextSegment = checkDistance(distances, permutations[i][j], permutations[i][j + 1]);
            if (nextSegment !== 0) {
                currentRouteLength += nextSegment;
            } else {
                broken = true;
                break;
            }
        }

        // If the current route is longer than the longest one, make longest the current route
        if (!broken && currentRouteLength > longest) {
            longest = currentRouteLength;
        }
    }

    return longest;
}

/**
 * checkDistance() finds the distance between origin and destination based
 * on distanceTable
 * @param {Array} distanceTable a table of the distances between the cities
 * @param {String} origin       the city to start at
 * @param {String} destination  the city to end at
 * @return {Number}             the distance between the cities
 */
function checkDistance(distanceTable, origin, destination) {
    var length = distanceTable.filter(function(route, element, array) {
        if (route.indexOf(origin) !== -1 && route.indexOf(destination) !== -1) {
            return true;
        }
    })[0][2];

    return parseInt(length);
}

// Logs whatever's passed to it
function output(result) {
    console.log(result);
}

longestRoute("./input.txt", output);

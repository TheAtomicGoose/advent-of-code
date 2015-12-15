var combinatorics = require("js-combinatorics");
var async = require("async");

function shortestRoute(instructionsFile, callback) {

    var lines = [];

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

    rl.on("close", function() {
        callback(findShortestRoute(lines));
    });
}

function findShortestRoute(distances) {

    var shortest = Number.MAX_VALUE;
    var locations = [];

    // Fills in list of locations
    distances.forEach(function(distance, index) {
        for (var i = 0; i < 2; i++) {
            if (locations.indexOf(distance[i]) === -1) {
                locations.push(distance[i]);
            }
        }
    });

    var permutations = combinatorics.permutation(locations).toArray();

    console.log(checkDistance(distances, "AlphaCentauri", "Norrath"));

    //for (var i = 0; i < permutations.length; i++) {
        //var currentRouteLength = 0;
        //var broken = false;
        //for (var j = 0; j < permutations[i].length - 1; j++) {
            //var nextSegment = checkDistance(distances, permutations[i][j], permutations[i][j + 1]);
            //if (nextSegment !== undefined) {
                //currentRouteLength += nextSegment;
            //} else {
                //broken = true;
                //break;
            //}
        //}

        //if (!broken && currentRouteLength < shortest) {
            //shortest = currentRouteLength;
        //}
    //}

    async.each(permutations, function(currentPerm) {
        var currentRouteLength = 0;
        var broken = false;

        async.each(currentPerm, function(permItem) {
            var nextSegment = checkDistance(distances, permItem, permutations[i][j + 1]);
            if (nextSegment !== undefined) {
                currentRouteLength += nextSegment;
            } else {
                broken = true;
            }
        });

        if (!broken && currentRouteLength < shortest) {
            shortest = currentRouteLength;
        }
    })

    output(shortest);
}

function checkDistance(distanceTable, origin, destination) {

    async.each(distanceTable, function(route) {
        if (route.indexOf(origin) !== -1 && route.indexOf(destination) !== -1) {
            console.log(parseInt(route[2]));
            return parseInt(route[2]);
        } else {
            return undefined;
        }
    });
}

function output(result) {
    console.log(result);
}

shortestRoute("./input.txt", output);

/**
 * farthest()
 */
function farthest(stats, time) {
    var greatest = 0;
    var distances = new Array(stats.length);
    for (var i = 0; i < distances.length; i++) {
        distances[i] = new Array(5);
        for (var j = 0; j < distances[i].length; j++) {
            distances[i][j] = 0;
        }
    }
    var currentTime = 0;
    
    while (currentTime <= time) {
        for (var i = 0; i < stats.length; i++) {
            var resting = distances[i][0];
            var restingStart = distances[i][1];
            var movingStart = distances[i][2];
            var distance = distances[i][3];
            if (resting === 1) {
                if (currentTime - restingStart === stats[i][3]) {
                    resting = 0;
                    movingStart = currentTime;
                    distance += stats[i][1];
                }
            } else {
                if (currentTime - movingStart === stats[i][2]) {
                    resting = 1;
                    restingStart = currentTime;
                } else {
                    distance += stats[i][1];
                }
            }
            distances[i] = [resting, restingStart, movingStart, distance, distances[i][4]];
        }

        var leadingIndices = [0];
        for (var j = 0; j < distances.length; j++) {
            if (distances[j][3] > distances[leadingIndices[0]][3]) {
                leadingIndices = [j];
            } else if (distances[j][3] === distances[leadingIndices[0]][3]) {
                leadingIndices.push(j);
            }
        }

        for (var j = 0; j < leadingIndices.length; j++) {
            distances[leadingIndices[j]][4]++;
        }

        currentTime++;
    }

    for (var i = 0; i < distances.length; i++) {
        if (distances[i][4] > greatest) {
            greatest = distances[i][4];
        }
    }

    return greatest;
}

/**
 * parseInput()
 */
function parseInput(file, time) {
    var stats = [];

    // Get input file
    var rl = require("readline").createInterface({
        input: require("fs").createReadStream(file)
    });

    // Turn input file into array form
    rl.on("line", function(line) {
        var reindeer = [];
        reindeer[0] = line.substring(0, line.indexOf(" "));
        for (var i = 0; i < 3; i++) {
            line = line.substring(line.indexOf(" ") + 1);
        }
        reindeer[1] = parseInt(line.substring(0, line.indexOf(" ")));
        for (var i = 0; i < 3; i++) {
            line = line.substring(line.indexOf(" ") + 1);
        }
        reindeer[2] = parseInt(line.substring(0, line.indexOf(" ")));
        for (var i = 0; i < 7; i++) {
            line = line.substring(line.indexOf(" ") + 1);
        }
        reindeer[3] = parseInt(line.substring(0, line.indexOf(" ")));
        stats.push(reindeer);
    });

    rl.on("close", function() {
        output(farthest(stats, time));
    });
}

function output(result) {
    console.log(result);
}

parseInput("./input.txt", 2503);

/**
 * farthest()
 */
function farthest(stats, time) {
    //var stats = parseInput("./input.txt");
    var distance = 0;
    
    for (var i = 0; i < stats.length; i++) {
        var tempTime = 0;
        var tempDistance = 0;
        var sinceRest = 0;
        while (tempTime <= time) {
            if (sinceRest === stats[i][2]) {
                tempTime += stats[i][3];
                sinceRest = 0;
            } else {
                tempTime++;
                sinceRest++;
                tempDistance += stats[i][1];
            }
        }

        if (tempDistance > distance) {
            distance = tempDistance;
        }
    }

    return distance
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

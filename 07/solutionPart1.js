/**
 * calculateCircuit() processes a list of instructions indicating how to direct data
 * through a circuit. See http://adventofcode/day/7 for information on how to structure
 * the instructions.
 *
 * @param {Array}  inputArr   an array of instructions for how to direct data through the circuit
 * @param {String} outputWire the wire whose final value to output
 * @return {Number} the value of outputWire at the end of the circuit
 */
function calculateCircuit(inputArr, outputWire) {

    // Declare some variables
    var infoArr = [];
    var circuitValues = {};
    var operations = ["AND", "OR", "RSHIFT", "LSHIFT", "NOT"];  // The possible bitwise operations

    // Turn inputArr into operations and outputs, and store in infoArr
    for (var i = 0; i < inputArr.length; i++) {
        var info = inputArr[i].split(" -> ");
        infoArr[i] = info;
    }

    // While there are still instructions left in infoArr
    while (infoArr.length > 0) {

        for (var i = infoArr.length - 1; i >= 0; i--) {

            // Splits the operation indicated in the current line of instructions into
            // its constituent arguments and operator
            var opArr = infoArr[i][0].split(" ");
            // To be used to see if this line of instructions can be executed yet
            var argsDefined = true;
            // The wire to store the output of the operation in
            var wire = infoArr[i][1];

            for (var j = 0; j < opArr.length; j++) {
                // If the current opArr index is not the operator, but one of the arguments:
                if (operations.indexOf(opArr[j]) === -1) {
                    // If the current opArr index is not a number and is not a defined
                    // wire in circuitValues:
                    if (isNaN(opArr[j]) && circuitValues[opArr[j]] === undefined) {
                        argsDefined = false;
                    // If the current opArr index is a defined wire in circuitValues: 
                    } else if (isNaN(opArr[j])) {
                        // Change opArr from having the name of the wire to the value 
                        // of the wire for easier computation later
                        opArr[j] = circuitValues[opArr[j]];
                    }
                }
            }

            // If everything in this set of instructions is known:
            if (argsDefined) {

                // Do the bitwise operation and remove the set of instructions from infoArr
                bitwise(opArr, wire, circuitValues);
                infoArr.splice(i, 1);
            }
        }
    }
    
    // Return the value of outputWire
    return circuitValues[outputWire];
}

/**
 * bitwise() returns the object passed to it with obj.key set to
 * the result of performing the bitwise operation indicated in argArr
 * on the arguments for that operation that are supplied in argArr.
 *
 * @param {Array} argArr an array with a bitwise operation and the
 *                       arguments to perform that operation on
 * @param {String} wire  the wire to set the result of the bitwise
 *                       operation equal to in obj
 * @param {Object} obj   an object with wires and their values
 * @return {Object}      the updated object      
 */
function bitwise(argArr, wire, obj) {

    // If argArr specifies bitwise AND
    if (argArr.indexOf("AND") !== -1) { 
        return modObj(obj, wire, parseInt(argArr[0]) & parseInt(argArr[2]));
    // If argArr specifies bitwise OR
    } else if (argArr.indexOf("OR") !== -1) {
        return modObj(obj, wire, parseInt(argArr[0]) | parseInt(argArr[2]));
    // If argArr specifies bitwise RSHIFT
    } else if (argArr.indexOf("RSHIFT") !== -1) {
        return modObj(obj, wire, parseInt(argArr[0]) >>> parseInt(argArr[2]));
    // If argArr specifies bitwise LSHIFT
    } else if (argArr.indexOf("LSHIFT") !== -1) {
        return modObj(obj, wire, parseInt(argArr[0]) << parseInt(argArr[2]));
    // If argArr specifies bitwise NOT (this is 16 bit, not 32 bit)
    } else if (argArr.indexOf("NOT") !== -1) {
        return modObj(obj, wire, 65535 - parseInt(argArr[1]));
    // If no operation is specified, just make the one thing in argArr the value for key
    } else {
        return modObj(obj, wire, parseInt(argArr[0]));
    }
}

/**
 * modObj() returns the object passed to it with the key-value pair
 * "key": value added to it
 *
 * @param {Object} obj   the object to add the key-value pair to
 * @param {String} key   the key of the key-value pair
 * @param {Number} value the value to give key
 * @return {Object} the updated object
 */
function modObj(obj, key, value) {
    var diffObj = obj;
    diffObj[key] = value;
    return diffObj;
}

calculateCircuit(["123 -> x", "456 -> y", "x AND y -> d", "x OR y -> e", "x LSHIFT 2 -> f", "y RSHIFT 2 -> g", "NOT x -> h", "NOT y -> i"]);

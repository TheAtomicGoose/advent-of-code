/**
 * validPass() takes an alphabetic password, then increments it (a->b, b->c...z->a)
 * until it is valid. To be valid, it must include one increasing straight of at least
 * three letters, like abc, def, xyz. It also must not include "i", "o", or "l". Lastly,
 * it must include two sets of different, non-overlapping pairs of letters like aa, bb, or zz.
 * @param {String} currentPass the current password
 * @param {Function} callback  a callback which takes a single argument to send the result to
 */
function validPass(currentPass, callback) {
    var valid = false;
    var newPass = currentPass;

    while (!valid) {
        var threeInARow = false;
        var noIOL = false;
        var doubleDouble = 0;

        var newPass = incrementPass(newPass);

        // Checks for a streak of three consecutive letters
        for (var i = 0; i < newPass.length - 2; i++) {
            if (newPass[i + 1] === incrementLetter(newPass[i]) && newPass[i + 2] === incrementLetter(newPass[i + 1])) {
                // Makes sure the three in a row aren't yza or zab
                if (newPass[i] !== "y" && newPass[i] !== "z") {
                    threeInARow = true;
                }
            }
        }

        // Checks if the string contains i, o, or l
        if (newPass.indexOf("i") === -1 && newPass.indexOf("o") === -1 && newPass.indexOf("l") === -1) {
            noIOL = true;
        }

        // Checks for two different double letters
        var previousDouble;
        for (var i = 0; i < newPass.length - 1; i++) {
            if (newPass[i] === newPass[i + 1]) {
                doubleDouble++;
                i++;
            }

            // Gets rid of duplicate doubles
            if (previousDouble !== undefined) {
                if (newPass.substring(i, i + 2) === previousDouble) {
                    doubleDouble--;
                    i--;
                }
            }

            previousDouble = newPass.substring(i, i + 2);
        }

        if (threeInARow && noIOL && doubleDouble >= 2) {
            valid = true;
        }
    }

    output(newPass);
}

/**
 * incrementPass() increments a string that it is passed by incrementing the final character.
 * If that final character is originally z, it becomes a and the second to last character is
 * also incremented. That continues until a character does not go from z->a or until the first
 * character in the string is incremented.
 * @param {String} password the string to increment
 * @return {String}         the incremented password
 */
function incrementPass(password) {
    var incremented = password;

    // Goes through the string backwards
    for (var i = password.length - 1; i >= 0; i--) {
        incremented = incremented.substring(0, i) + incrementLetter(incremented[i]) + incremented.substring(i + 1);
        if (incremented[i] !== "a") {
            break;
        }
    }

    return incremented;
}

/**
 * incrementLetter() returns the next character in the alphabet from the one it
 * is passed. a->b, b->c,...z->a
 * @param {Char} character the character to increment
 * @return {Char}          the incremented character
 */
function incrementLetter(character) {
    if (character !== "z") {
        return String.fromCharCode(character.charCodeAt(0) + 1)
    } else {
        return "a";
    }
}

function output(result) {
    console.log(result);
}

validPass("hxbxxyzz");

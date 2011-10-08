var MrClay = this.MrClay || {};

/**
 * Get a matrix of numChores x numNames matrix of name indexes such that every chore is assigned a name, and the
 * first chore must be done by every name. You should shuffle the names before applying the indexes to returned matrix
 *
 * @param int numNames
 * @param int numChores
 * @param Boolean allWorkTogether
 * @return Array 2-d array with each row array representing one schedule: The value at index N is the
 *         name index that performs chore N.
 */
MrClay.assignChores = function (numNames, numChores, allWorkTogether) {
    var assignedRows = [],
        row,
        unmetPairs = [],
        pair,
        extras = [],
        usableExtras,
        insertPairReversed = false,
        i,
        l;
    // each person has to do the first job at least once
    for (i = 0; i < numNames; i++) {
        // build a list of pairs who didn't work together (may be empty)
        for (j = numChores; j <= (numNames - numChores); j++) {
            unmetPairs.push(i + ',' + ((i + j) % numNames));
        }
        // build initial assignments so that all names do each chore
        row = [];
        for (j = 0; j < numChores; j++) {
            row.push((i + j) % numNames);
        }
        assignedRows.push(row);
    }
    if (allWorkTogether && numChores > 1) {
        // must create rows from unmets

        // @return Array [num1, num2]
        var getNextUnmetPair = function () {
            var pair = unmetPairs.shift();
            if (pair) {
                pair = pair.split(',');
                pair[0] = parseInt(pair[0]);
                pair[1] = parseInt(pair[1]);
                // remove reverse pair
                var idx = unmetPairs.indexOf(pair[1] + ',' + pair[0]);
                if (idx >= 0) {
                    unmetPairs.splice(idx, 1);
                }
                return pair;
            }
        };

        while (unmetPairs.length) {
            row = [];
            // add pairs to available slots
            while (row.length <= numChores - 2) {
                pair = getNextUnmetPair();
                if (! pair) {
                    // oops! fill out last row people from the middle
                    pair = [Math.floor(numNames / 2), Math.ceil((numNames / 2) + .1)];
                }
                if (insertPairReversed) {
                    row.push(pair[1], pair[0]);
                } else {
                    row.push(pair[0], pair[1]);
                }
                insertPairReversed = !insertPairReversed;
            }
            if (row.length !== numChores) {
                // one space remains. use the next extra that doesn't appear in the row
                if (! extras.length) {
                    // refill extras
                    for (i = numNames - 1; i >= 0; i--) {
                        extras.push(i);
                    }
                }
                usableExtras = extras.slice(0);
                // disqualify extras that appear in the row
                for (i = 0; i < row.length; i++) {
                    if ((j = usableExtras.indexOf(row[i])) >= 0) {
                        usableExtras.splice(j, 1);
                    }
                }
                if (! usableExtras.length) {
                    usableExtras.push(0); // shouldn't ever happen
                }
                // add the extra to the row and remove it from the extras list
                var extraUsed = usableExtras.shift();
                row.push(extraUsed);
                extras.splice(extras.indexOf(extraUsed), 1);
            }
            // row is full, pop onto return array
            assignedRows.push(row);
            // @todo filter unmetPairs for pairs that meet in this row
        }
    }
    return assignedRows;
};
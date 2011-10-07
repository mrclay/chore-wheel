var MrClay = this.MrClay || {};

/**
 * Get a matrix of numChores x numNames matrix of name indexes such that every chore is assigned a name, and the
 * first chore must be done by every name. You should shuffle the names before applying the indexes to returned matrix
 *
 * @param int numNames
 * @param int numChores
 * @return Array 2-d array with each row array representing one schedule: The value at index N is the
 *         name index that performs chore N.
 */
MrClay.assignChores = function (numNames, numChores) {
    var assignedRows = [],
        row,
        i,
        l;
    // each person has to do the first job at least once
    for (i = 0; i < numNames; i++) {
        row = [];
        // assign jobs in order beginning with person i
        for (j = 0; j < numChores; j++) {
            row.push((i + j) % numNames);
        }
        assignedRows.push(row);
    }
    return assignedRows;
};
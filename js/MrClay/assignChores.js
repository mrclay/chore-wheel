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

    var schedule = [],
        team,
        strangers = [],
        nameId,
        i,
        choreId,
        allNames = []; // list with each nameId (slice as needed for performance)

    // Phase 1: each person does each job once
    for (nameId = 0; nameId < numNames; nameId++) {
        allNames.push(nameId);
        // build a list of pairs who didn't work together (may be empty)
        strangers[nameId] = [];
        for (i = numChores; i <= (numNames - numChores); i++) {
            strangers[nameId].push((nameId + i) % numNames);
        }
        // build initial assignments so that all names do each chore
        team = [];
        for (choreId = 0; choreId < numChores; choreId++) {
            team.push((nameId + choreId) % numNames);
        }
        schedule.push(team);
    }

    if (allWorkTogether && strangers[0].length) {

        // Phase 2: must create rows just so everyone meets everyone else (and chores are distributed fairly)

        // object to keep track of who hasn't met whom
        var Matchmaker = function (strangers) {
                this.lengths = [];
                var nameId;
                for (nameId = 0; nameId < strangers.length; nameId++) {
                    this.lengths.push(strangers[0].length);
                }
                /**
                 * Introduce two strangers
                 * @param int a first person
                 * @param int b second person
                 */
                this.introduce = function (a, b) {
                    var indexOfB;
                    if ((indexOfB = strangers[a].indexOf(b)) > -1) {
                        strangers[a].splice(indexOfB, 1);
                        this.lengths[a]--;
                        strangers[b].splice(strangers[b].indexOf(a), 1);
                        this.lengths[b]--;
                    }
                };
                /**
                 * Get the first name index who has not met someone
                 * @return int
                 */
                this.next = function () {
                    for (nameId = 0; nameId < strangers.length; nameId++) {
                        if (this.lengths[nameId]) {
                            return nameId;
                        }
                    }
                    return -1;
                };
                /**
                 * Get list of indexes not met by nameId
                 * @param int nameId
                 * @return Array
                 */
                this.getStrangersOf = function (nameId) {
                    return strangers[nameId].slice();
                };
            },

            // object to assign jobs fairly
            WorkDistributor = function () {
                var done = [], choreId, nameId, rotation = 0;
                for (choreId = 0; choreId < numChores; choreId++) {
                    done.push([]);
                    for (nameId = 0; nameId < numNames; nameId++) {
                        done[choreId].push(0);
                    }
                }
                this.assign = function (nameId, choreId) {
                    done[choreId][nameId]++;
                };
                this.whoShouldDoThis = function (choreId, candidates) {
                    var nameId = 0, min = -1, i, k, l;
                    if (! candidates.length) {
                        candidates = allNames.slice();
                    }
                    for (i = 0, l = candidates.length; i < l; i++) {
                        // we use rotation to make sure assignment is fair (we always
                        // start the linear search in a different place)
                        k = (i + rotation) % l;
                        if (min == -1 || done[choreId][candidates[k]] < min) {
                            min = done[choreId][candidates[k]];
                            nameId = candidates[k];
                        }
                    }
                    rotation++;
                    return nameId;
                };
                // just for testing
                this.getDistribution = function () {
                    return done;
                };
            },
            matchmaker = new Matchmaker(strangers),
            workDist = new WorkDistributor(),
            addTeamMember = function (nameId) {
                team.push(nameId);
                newMembers.push(nameId);
                for (var i = 0, l = team.length - 1; i < l; i++) {
                    matchmaker.introduce(nameId, team[i]);
                }
            },
            scheduleTeamRotator = 0,
            scheduleTeam = function (team) {
                var assignments = new Array(numChores), i, choreId, bestCandidate;
                for (i = 0; i < numChores; i++) {
                    // rotate starting pt of chore assignment
                    choreId = (i + scheduleTeamRotator) % numChores;
                    bestCandidate = workDist.whoShouldDoThis(choreId, team);
                    assignments[choreId] = bestCandidate;
                    workDist.assign(bestCandidate, choreId);
                    if (team.length) {
                        team.splice(team.indexOf(bestCandidate), 1);
                    }
                }
                schedule.push(assignments);
                scheduleTeamRotator++;
            },
            newMember,
            numToAdd,
            newMembers = [],
            next;

        team = [];
        
        while ((next = matchmaker.next()) != -1) {
            if (team.length === numChores) {
                scheduleTeam(team);
                team = [];
            }
            addTeamMember(next);
            while (newMembers.length) {
                newMember = newMembers.shift();
                strangers = matchmaker.getStrangersOf(newMember);
                numToAdd = Math.min(numChores - team.length, strangers.length);
                for (i = 0; i < numToAdd; i++) {
                    addTeamMember(strangers[i]);
                }
            }
        }
        if (team.length) {
            scheduleTeam(team);
        }
    }

    //window.workDistro = workDist.getDistribution();
    return schedule;
};

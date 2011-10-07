var MrClay = this.MrClay || {};

/**
 * Shuffle the array passed in
 * @param arrReference
 */
MrClay.shuffleArray = function (arrReference) {
    var tmp, current, top = arrReference.length;
    if (top) {
        while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = arrReference[current];
            arrReference[current] = arrReference[top];
            arrReference[top] = tmp;
        }
    }
};
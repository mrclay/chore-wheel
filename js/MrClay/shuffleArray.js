var MrClay = this.MrClay || {};

/**
 * Shuffle the array passed in
 * @param array arrReference (will be altered in place)
 * @param object rndSource (optional) object with a "random" method.
 */
MrClay.shuffleArray = function (arrReference, rndSource) {
    rndSource = rndSource || Math;
    var tmp, current, top = arrReference.length;
    if (top) {
        while(--top) {
            current = Math.floor(rndSource.random() * (top + 1));
            tmp = arrReference[current];
            arrReference[current] = arrReference[top];
            arrReference[top] = tmp;
        }
    }
};
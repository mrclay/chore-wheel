(function ($, MrClay) {

    var qs = new MrClay.QueryString();

    $('#setup').live('pageinit', function(event) {
        var vars = qs.get(),
            names = $.trim(vars.n || 'Alice,Bob,Cathy').split(/\s*,\s*/);
        names.sort();
        $('#names').val(names.join(','));
        $('#chores').val(vars.c || 'Clean Sink,Clean Microwave,Wash Dishes,Fridge Patrol');
    });

    $('#schedButton').live('click', function () {
        var names = $.trim($('#names').val()).split(/\s*,\s*/);
        //MrClay.shuffleArray(names);
        var search = MrClay.QueryString.toString({
            n: names.join(','), // names
            c: $.trim($('#chores').val()), // chores
            s: new Date().getTime() // random seed
        });
        location.href = location.href.replace(/[\?#].*/, '') + '?' + search + '#schedule';
    });

    $('#resetButton').live('click', function () {
        location.href = location.href.replace(/[\?#].*/, '');
    });

    $('#schedule').live('pageinit', function(event) {
        function esc(txt) {
            return txt.replace(/&/g, '&amp;').replace(/</g, '&lt;');
        }

        var urlVars = qs.get(),
            names = urlVars.n.split(/\s*,\s*/),
            chores = urlVars.c.split(/\s*,\s*/),
            randomSeed = urlVars.s,
            numChores = chores.length,
            markup = '',
            i,
            j;

        var assignments = MrClay.assignChores(names.length, chores.length, true),
            numAssignments = assignments.length;

        // we use MersenneTwister so the shuffle is deterministic based on URL
        MrClay.shuffleArray(assignments, new MersenneTwister(randomSeed));

        //var assignmentsByName = [];
        //for (i = 0; i < names.length)

        markup += '<table><tr><th class="periodCell">Period</th>';
        for (i = 0; i < numChores; i++) {
            markup += '<th>' + esc(chores[i]) + '</th>';
        }
        markup += '</tr>';
        for (i = 0; i < numAssignments; i++) {
            markup += '<tr><td>' + (i + 1) + '</td>';
            for (j = 0; j < numChores; j++) {
                markup += '<td>' + esc(names[assignments[i][j]]) + '</td>';
            }
            markup += '</tr>';
        }
        markup += '</table>';
        $('#scheduleContent').html(markup);
    });
    
})(jQuery, MrClay);
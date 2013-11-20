$(document).ready(function() {

   var player = getURLParameter('name');
   var playerYear = getURLParameter('year');
   var finishingPositions = [];
   var noOfPlayers = [];
   var positionOccurrences = [];
   var pieChartData = [];
   $.getJSON('../json/' + playerYear + '/' + player + '.json', function( data ) {
        finish = data.positionAndPlayers[0].positions;
        playerCount = data.positionAndPlayers[0].players;

        for (var i in finish) {
            var finishedPosition = parseInt(finish[i],10);
            var totalPlayers = parseInt(playerCount[i],10);

            finishingPositions.push(finishedPosition);
            noOfPlayers.push(totalPlayers);
            accumulateFinishingPositionOccurrences(finishedPosition, totalPlayers);
        }

        drawLineGraph(finishingPositions, noOfPlayers);
        drawPieChart(sortPieChartEntries(positionOccurrences));
        drawPlayerStats(data.positionAndPlayers[0].statistics);

    })
    .fail(function() {
        alert("cannot read json data - invalid json or chrome cross domain local file issue");
    });

    function accumulateFinishingPositionOccurrences(position, noOfPlayers) {
        // Pie Chart Stats
        if (position in positionOccurrences) {
            positionOccurrences[position] = positionOccurrences[position] + 1;
        } else {
            positionOccurrences[position] = 1;
        }
    }

    function sortPieChartEntries(finishingPositionsOccurrences) {
        var sortable = [];
        for (var occurrence in finishingPositionsOccurrences) {
            sortable.push([finishingPositionsOccurrences[occurrence], occurrence]);
        }
        sortable.sort(function(a,b) {return a[1] - b[1]});
        return sortable;
    }

    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    }
});
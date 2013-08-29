google.load('visualization', '1.0', {'packages':['corechart']});
google.load('visualization', '1', {packages:['gauge']});

function drawLineGraph(finishingPositions, noOfPlayers) {
	var lineGraphData = [];
    lineGraphData.push(['Game', 'Position', 'No of players']);
    for (var i = 0; i < finishingPositions.length; i++) {
        var item = [getNumberSuffix(i + 1 + ""), parseInt(finishingPositions[i]), parseInt(noOfPlayers[i])];
        lineGraphData.push(item);
    }

	var data = google.visualization.arrayToDataTable(lineGraphData);
    var options = {
        vAxis: {
            title: "Finishing Position",
            direction: -1,
            minValue: 1,
            maxValue: 10,
            viewWindowMode: 'pretty',
            gridlines: {
                color: "black",
                count: 10
            },
        },
        hAxis: {
            title: "Game Number",
            viewWindowMode: 'pretty',
            minValue: 1,
            maxValue: 10,
        },
        pointSize: 10,
        legend: {
            position: 'top',
            alignment: 'center'
        },
    };

    var lineGraph = new google.visualization.LineChart(document.getElementById('lineGraph_div'));
    lineGraph.draw(data, options);
}

function drawPieChart(finishingPositionsOccurrences) {
	// Create the data table.
	var pieChartData = [];
	pieChartData.push(['Game Number', 'Position']);
	for (var i = 0; i < finishingPositionsOccurrences.length; i++) {
		var item = [getNumberSuffix(finishingPositionsOccurrences[i][1]), parseInt(finishingPositionsOccurrences[i][0])];
		pieChartData.push(item);
    }


    var data = google.visualization.arrayToDataTable(pieChartData);
    var options = {'title':'Tournament Placing',
                   'width':400,
                   'height':200,
                   is3D: true};

	var pieChart = new google.visualization.PieChart(document.getElementById('pieChart_div'));
    pieChart.draw(data, options);
};

function getNumberSuffix(number) {
	switch(number) {
		case "1": suffix = "st"; break;
		case "2": suffix = "nd"; break;
		case "3": suffix = "rd"; break;
		default: suffix = "th"; break;
	}
	return number + suffix;
}

function drawPlayerStatscallback(played, wins, top3, last, bounties, hosted, displayWidth, displayHeight, playerChart) {

    played = 6;
    wins = 1;
    top3 = 3;
    hosted = 1;
    bounties = 0;
    last = 0;
    displayWidth = 1000;
    displayHeight = 220;

      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Played', played],
          ['Wins', wins],
          ['Top 3', top3],
          ['Last', last],
		  ['Bounties', bounties],
		  ['Hosted', hosted]
        ]);
        if (displayWidth == "") {
            displayWidth = 1000;
        }
        if (displayHeight == "") {
            displayHeight = 220;
        }
        var options = {
		  max: 10,
          width: displayWidth, height: displayHeight,
          redFrom: 0, redTo: 1,
          yellowFrom:1, yellowTo: 5,
          minorTicks: 5
        };
        var chart = new google.visualization.Gauge(document.getElementById("chart_div"));
        chart.draw(data, options);
      }
}

function drawPlayerStats(statistics) {

    var played = statistics.played;
    var wins = statistics.won;
    var top3 = statistics.top3;
    var last = statistics.last;
    var bounties = statistics.bounties;
    var hosted = statistics.hosted;
    var displayWidth = 1000;
    var displayHeight = 220;

    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Played', played],
      ['Wins', wins],
      ['Top 3', top3],
      ['Last', last],
      ['Bounties', bounties],
      ['Hosted', hosted]
    ]);


    var options = {
      max: 10,
      width: displayWidth, height: displayHeight,
      redFrom: 0, redTo: 1,
      yellowFrom:1, yellowTo: 5,
      minorTicks: 5
    };
    var chart = new google.visualization.Gauge(document.getElementById("chart_div"));
    chart.draw(data, options);
}
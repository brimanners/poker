google.load('visualization', '1.0', {'packages':['corechart']});

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

function drawPointsAccumulationLineGraph(accumulatedPoints) {
	var lineGraphData = [];
    lineGraphData.push(['Game', 'Points']);
    var points = 0;
    for (var i = 0; i < accumulatedPoints.length; i++) {
        var item = [getNumberSuffix(i + 1 + ""), parseInt(accumulatedPoints[i])];
        lineGraphData.push(item);
    }

	var data = google.visualization.arrayToDataTable(lineGraphData);
    var options = {
        vAxis: {
            title: "Accumulated Points",
            minValue: 1,
            format: '0',
            maxValue: points,
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

    var lineGraph = new google.visualization.LineChart(document.getElementById('pointsAccumulation_div'));
    lineGraph.draw(data, options);
}

function drawLadderPositionLineGraph(ladderPositions) {
	var lineGraphData = [];
    lineGraphData.push(['Game', 'Ladder Position']);
    var points = 0;
    for (var i = 0; i < ladderPositions.length; i++) {
        var item = [getNumberSuffix(i + 1 + ""), parseInt(ladderPositions[i])];
        lineGraphData.push(item);
    }

	var data = google.visualization.arrayToDataTable(lineGraphData);
    var options = {
        vAxis: {
            title: "Ladder Position",
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
            title: "Event Number",
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

    var lineGraph = new google.visualization.LineChart(document.getElementById('ladderPosition_div'));
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
                   'width':500,
                   'height':200,
                   is3D: true};

	var pieChart = new google.visualization.PieChart(document.getElementById('pieChart_div'));
    pieChart.draw(data, options);
};


function drawQuartilePieChart(quartiles) {
	// Create the data table.
	var pieChartData = [];
	var quartileDesc = [];
	quartileDesc[0] = "Top 25%";
	quartileDesc[1] = "25 - 50%";
	quartileDesc[2] = "50 - 75%";
	quartileDesc[3] = "75 - 100%";
	pieChartData.push(['Quartile', 'Occurrences']);
	for (var i = 0; i < quartiles.length; i++) {
		var item = [quartileDesc[i], quartiles[i]];
		pieChartData.push(item);
    }


    var data = google.visualization.arrayToDataTable(pieChartData);
    var options = {'title':'Finishing positions',
                   'width':500,
                   'height':200,
                   is3D: true};

	var pieChart = new google.visualization.PieChart(document.getElementById('quartilePieChart_div'));
    pieChart.draw(data, options);
};


function drawDonutChart(donutDataValues, title, divToReplace) {

    var data = google.visualization.arrayToDataTable(donutDataValues);

    var options = {'title': title,
                   'width':700,
                   'height':350,
                   'pieHole': 0.3,
                   'pieSliceText': 'label',
                   'fontSize': 10
    };

    var chart = new google.visualization.PieChart(document.getElementById(divToReplace));
    chart.draw(data, options);
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
    var maximumDisplay = 10;
    if (played > 10 ) {
      maximumDisplay = played + 5;
    }

    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Played', played],
      ['Wins', wins],
      ['Top 3', top3],
      ['Last', last],
//      ['Bounties', bounties],
      ['Hosted', hosted]
    ]);


    var options = {
      max: maximumDisplay,
      width: displayWidth, height: displayHeight,
      redFrom: 0, redTo: 1,
      yellowFrom:1, yellowTo: (maximumDisplay - 5),
      minorTicks: 5,
      animation:{duration: 1000, easing: 'inAndOut'}
    };
    var chart = new google.visualization.Gauge(document.getElementById("chart_div"));
    setTimeout(function() {
      chart.draw(data, options);
    },500);
}
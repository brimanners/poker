var player = angular.module('player', []);
var playerEventPosition;

player.controller('playerController', function ($scope, $http) {
   var playerDetails = {};

   $scope.positionSuffix = function(position) {
           switch (position) {
              case 1 : return "st"; break;
              case 2 : return "nd"; break;
              case 3 : return "rd"; break;
              default : return "th"; break;
           }
   }

   var playerYear = getURLParameter('year');

   $scope.seasonToDisplay = getURLParameter('year');

   var playerStartYear = $scope.seasonToDisplay;
   var playerEndYear = $scope.seasonToDisplay;
   var currentYear = new Date().getFullYear();

   $scope.seasons = [];
   season = {};
   season.value = "ALL";
   season.year = "All seasons";
   $scope.year = getURLParameter('year');
   $scope.seasons.push(season);
   var selectedIndex = 0;
   for (i = 2013; i <= new Date().getFullYear(); i ++) {
     selectedIndex ++;
     season = {};
     season.value = i;
     season.year = i;
     $scope.seasons.push(season);
     if (i == parseInt($scope.year)) {
       $scope.selectedOption = $scope.seasons[selectedIndex];
     }
   }

   function dynamicSort(property) {
       var sortOrder = 1;
       if(property[0] === "-") {
           sortOrder = -1;
           property = property.substr(1);
       }
       return function (a,b) {
           var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
           return result * sortOrder;
       }
   }

   function dynamicSortMultiple() {
       var props = arguments;
       return function (obj1, obj2) {
           var i = 0, result = 0, numberOfProperties = props.length;
           while(result === 0 && i < numberOfProperties) {
               result = dynamicSort(props[i])(obj1, obj2);
               i++;
           }
           return result;
       }
   }

   var allSeasonResults = {};
   function clearOverallStats() {
      allSeasonResults.played = 0;
      allSeasonResults.won = 0;
      allSeasonResults.second = 0;
      allSeasonResults.third = 0;
      allSeasonResults.fourth = 0;
      allSeasonResults.last = 0;
      allSeasonResults.points = 0;
      allSeasonResults.cash = 0;
      allSeasonResults.averagePosition = 0;
   }

   function accumulateAllSeasons(seasonResults, season) {
       if ($scope.selectedOption.value == "ALL") {
           allSeasonResults.played = allSeasonResults.played + seasonResults[season].played;
           allSeasonResults.won = allSeasonResults.won + seasonResults[season].won;
           allSeasonResults.second = allSeasonResults.second + seasonResults[season].second;
           allSeasonResults.third = allSeasonResults.third + seasonResults[season].third;
           allSeasonResults.fourth = allSeasonResults.fourth + seasonResults[season].fourth;
           allSeasonResults.last = allSeasonResults.last + seasonResults[season].last;
           allSeasonResults.points = allSeasonResults.points + seasonResults[season].points;
           allSeasonResults.season = "All Seasons";
           allSeasonResults.name = seasonResults[season].name;
           allSeasonResults.cash = allSeasonResults.cash + parseFloat(seasonResults[season].cash);
           if (allSeasonResults.played > 0) {
              allSeasonResults.averagePosition = $scope.playerAccumulatedPositions / parseFloat(allSeasonResults.played);
           }
           $scope.seasonResults[0] = allSeasonResults;
       }
   }

   $scope.getSeasonSummary = function(playerStartYear, playerEndYear) {
        if (playerStartYear == "ALL") {
              playerStartYear = "2013";  // Can leave hardcoded - as this is the earliest season we had.
              playerEndYear = "" + new Date().getFullYear();
        }
        var seasonResults = {};

        for (resultYear = parseInt(playerStartYear); resultYear <= parseInt(playerEndYear); resultYear++) {
           $http.get('../json/' + resultYear + '/current-table.json').success(function (data) {
                 playerDetails.results = data[0]["event" + data[0]["eventId"]];
                 var sortedResults = playerDetails.results.sort(dynamicSortMultiple("-points", "-played", "-won", "-averagePoints", "name"));
                 for (i = 0; i < playerDetails.results.length; i++) {
                   var playerName = changeNameToParameterType(playerDetails.results[i].name);
                   if (playerName == player) {
                       for (sorted = 0; sorted < sortedResults.length; sorted ++) {
                         if (sortedResults[sorted].name == playerDetails.results[i].name) {
                            playerDetails.results[i].tablePosition = i + 1;
                         }
                       }
                       playerDetails.results[i].season = data[0]["season"];
                       seasonResults[data[0]["season"]] = playerDetails.results[i];
                       $scope.playerLongName = playerDetails.results[i].name + "'s";
                   }
                   playerDetails.results[i].name = playerName;
                 }
                 getUrlsForPlayers(playerDetails.results);
                 $scope.seasonResults = seasonResults;
                 accumulateAllSeasons($scope.seasonResults, seasonResults[data[0]["season"]].season);
           });
        }
   }

   $scope.getEventHistory = function(playerStartYear, playerEndYear) {
      if (playerStartYear == "ALL") {
           playerStartYear = "2013";  // Can leave hardcoded - as this is the earliest season we had.
           playerEndYear = "" + new Date().getFullYear();
      }

      var accumulatedPositions = 0;
      for (year = parseInt(playerStartYear); year <= parseInt(playerEndYear); year++) {
          var events = 0;
          playerDetails.eventDetails = new Array();
          $http.get('../json/' + year + '/' + player + '_event_history.json').success(function (data) {
               var playerCumulativePoints = new Array();
               var accumulatedPoints = 0;
               for (i = 0; i < data.length; i ++) {
                   playerDetails.eventDetails[events] = data[i];
                   playerDetails.eventDetails[events].displayDate = new Date(
                        playerDetails.eventDetails[events].eventDate.substring(6,10),
                        playerDetails.eventDetails[events].eventDate.substring(3,5),
                        playerDetails.eventDetails[events].eventDate.substring(0,2)
                   );
                   events ++;
                   accumulatedPoints = accumulatedPoints + data[i].points
                   accumulatedPositions = accumulatedPositions + data[i].position;
                   playerCumulativePoints[i] = accumulatedPositions;
                   playerDetails.cumulativePoints = playerCumulativePoints;
               }
               $scope.playerAccumulatedPositions = accumulatedPositions;
               drawPointsAccumulationLineGraph(playerDetails.cumulativePoints);
           });
       }
   }

   $scope.refreshDetails = function(playerStartYear, playerEndYear) {
     clearOverallStats();
     $scope.getEventHistory(playerStartYear, playerEndYear);
     $scope.getSeasonSummary(playerStartYear, playerEndYear);
     $scope.displayAllGraphs(playerStartYear, playerEndYear);
   }

   var player = getURLParameter('name');
   $scope.getEventHistory(playerStartYear, playerEndYear);
   $scope.getSeasonSummary(playerStartYear, playerEndYear);

    // player image
   var imageUrl = '../images/players/' + playerYear + '/' + player + '.jpg';
   $http.get(imageUrl).success(function (data) {
        playerDetails.image = imageUrl;
   });

   $http.get('../json/2014/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       playerDetails.CCXIV_Events = data;
       getUrlForEvents(data);
   });

   $http.get('../json/2013/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       playerDetails.CCXIII_Events = data;
       getUrlForEvents(data);
   });

  $http.get('../json/2014/event-history.json').success(function (data) {
      for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
          data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
      }
      playerDetails.previousEvents = data;
      getUrlForEvents(data);
  });



   $http.get('../json/general/extras.json').success(function (data) {
         playerDetails.extras = data;
   });

   //  Get menu dropdown of players for relevant season
   $http.get('../json/general/players.json').success(function (data) {
       var players = [];
       for (i = 0; i < data.length; i++) {
           for (j = 0; j < data[i].players.length; j++) {
               var player = {};
               player.name = data[i].players[j].name;
               player.year = data[i].year;
               var nameParts = player.name.split(" ");
               player.url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=' + data[i].year;
               players.push(player);
           }
      }
      $scope.playerMenuDropdown = players;
   });


    $http.get('../json/' + playerYear + '/current-table.json').success(function (data) {
        noOfTourneys = data.length;
        playerEventPosition = calculatePlayerMovement(data, player, playerYear);
        drawLadderPositionLineGraph(playerEventPosition.playerPosition);
    });

    $scope.player = getURLParameter('name');
    $scope.playerDetails = playerDetails;


    $scope.displayAllGraphs = function(playerStartYear, playerEndYear) {
       var player = getURLParameter('name');
       var finishingPositions = [];
       var quartiles = [];
       quartiles[0] = 0;
       quartiles[1] = 0;
       quartiles[2] = 0;
       quartiles[3] = 0;
       var noOfPlayers = [];
       var positionOccurrences = [];
       var pieChartData = [];
       var accumulate = false;

       if (playerStartYear == "ALL") {
             playerStartYear = "2013";  // Can leave hardcoded - as this is the earliest season we had.
             playerEndYear = "" + new Date().getFullYear();
             accumulate = true;

       }

       for (year = parseInt(playerStartYear); year <= parseInt(playerEndYear); year++) {
           var overallStats = {};
           overallStats.hosted = 0;
           overallStats.last = 0;
           overallStats.played = 0;
           overallStats.top3 = 0;
           overallStats.won = 0;

           $.getJSON('../json/' + year + '/' + player + '.json', function( data ) {
                finish = data.positionAndPlayers[0].positions;
                playerCount = data.positionAndPlayers[0].players;

                for (var i in finish) {
                    var finishedPosition = parseInt(finish[i],10);
                    var totalPlayers = parseInt(playerCount[i],10);

                    var finishedQuartile = finishedPosition / totalPlayers;
                    if (finishedQuartile <= 0.25 ) {
                        quartiles[0] ++;
                    } else if ( finishedQuartile <= 0.50) {
                        quartiles[1] ++;
                    } else if (finishedQuartile <= 0.75) {
                        quartiles[2] ++;
                    } else {
                        quartiles[3] ++;
                    }

                    finishingPositions.push(finishedPosition);
                    noOfPlayers.push(totalPlayers);
                    accumulateFinishingPositionOccurrences(finishedPosition, totalPlayers);
                }

                overallStats.hosted = overallStats.hosted + data.positionAndPlayers[0].statistics.hosted;
                overallStats.last = overallStats.last + data.positionAndPlayers[0].statistics.last;
                overallStats.played = overallStats.played + data.positionAndPlayers[0].statistics.played;
                overallStats.top3 = overallStats.top3 + data.positionAndPlayers[0].statistics.top3;
                overallStats.won = overallStats.won + data.positionAndPlayers[0].statistics.won;

                drawLineGraph(finishingPositions, noOfPlayers);
                drawPieChart(sortPieChartEntries(positionOccurrences));
                drawQuartilePieChart(quartiles);
                drawPlayerStats(overallStats);

            })
            .fail(function() {
                alert("cannot read json data - invalid json or chrome cross domain local file issue");
            });
       }


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
    }

        $scope.displayAllGraphs($scope.year, $scope.year);

});


function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "../events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
    return events;
}

function getUrlsForPlayers(players) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=2014';
    }
    return players;
}

function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function changeNameToParameterType(name) {
    return name.substring(0, name.length - 1).toLowerCase().replace(" ","") + name.substring(name.length, name.length -1);
}

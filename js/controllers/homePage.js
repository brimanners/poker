var playerEventPosition;
var season = $('meta[name="season"]').attr("content");

var app = angular.module('poker', []);        // poker module is the name of the ng-app on the template stored on the html tag

app.controller('homePageController', function ($scope, $http) {
    populateDetailsFromJson($scope, $http);   // calls ajax request to read ladder results from json file generated via clojure app :)
    $scope.displayTable = [];
    $scope.displayExtra = false;
    $scope.displayAllPlayerButton = false;

   $scope.direction = false;
   $scope.orderProp = "'-points','played'";

   $scope.angularSort = function(column) {
        alert("Sort by " + column);
   }

    // this function feel like they should be a in general util type area - need to work out scoping so all angular controller can see....
    $scope.positionSuffix = function(position) {
        switch (position) {
           case 1 : return "st"; break;
           case 2 : return "nd"; break;
           case 3 : return "rd"; break;
           default : return "th"; break;
        }
    }

    $scope.tableChanged = function() {
        $("#ladder").addClass('animated hinge')
        $scope.displayTable = $scope.statistics.eventTables[$scope.eventId];
        setTimeout (function () {
            $("#ladder").removeClass('animated hinge');

            $("#ladder").addClass('animated rotateInUpRight');
            setTimeout (function () {
                $("#ladder").removeClass('animated rotateInUpRight');
            },2000);
        },2000);
    }

    $scope.gotPoints = function(result) {
          return result.points > 0
    };

    $scope.clearPlayer = function(scope) {
      $scope.displayAllPlayerButton = true;
    }

    $scope.displayAllPlayers = function(scope) {
       $scope.displayAllPlayerButton = false;
       for (i = 0; k < $scope.displayTable.length; i++) {
         $scope.displayTable[i].hidePlayer = false;
       }
    }

     //  Get news ticker item
    $http.get('../json/general/news-item.json').success(function (data) {
      $scope.newsItem = data[0]["news-item"];
    });

     // Set countdown time to next event
     if (season == "2016"){
        $http.get('../json/general/next-event.json').success(function (data) {
            var nextEventDate = data[0]["event-date"];
            var nextEventTime = data[0]["event-time"];

            $scope.displayCountdown = false;
            if (nextEventDate !== '' || nextEventDate != undefined) {
               $scope. displayCountdown= true;
            }

             // JS Date object has zero based months (e.g. 0 = January, 11 = December, so subtract one - TODO - JS String formatter?
             var month = parseInt(nextEventDate.substring(5,7) - 1);
             if (month < 10) {
               jsMonth = "0" + month;
             } else {
               jsMonth = "" + month;
             }

             var targetDate = new Date(nextEventDate.substring(0,4), jsMonth, nextEventDate.substring(8,10),
                                       nextEventTime.substring(0,2),nextEventTime.substring(3,5),00);
             var now = new Date();
             var clock = document.getElementById("countdown-holder");
             clock.innerHTML = ""
             if (now < targetDate) {
                  clock.innerHTML = countdown(targetDate).toString();
                  var interval = setInterval(function(){
                      clock.innerHTML = countdown(targetDate).toString();
                      if (clock.innerHTML == "") {
                         clock.innerHTML = "Game has commenced......."
                         clearInterval(interval);
                      }
                  }, 1000);
              }
          });
     }

$scope.clicked = function() {
   if ($scope.displayExtra == true) {
     $scope.displayExtra = false;
   } else {
     $scope.displayExtra = true;
   }
 }


 $scope.displayPoints = function() {
     $scope.displayPointsChart = true;
  }
});

// WIP - Or do we just create an array in the JSON instead of client side data manipulation?
function convertListToArray(eventData) {
  for (k = 0; k < eventData.length; k++) {
      eventData[k].positionArray = eventData[k].positions.split(" ");
  }
}

function populateDetailsFromJson ($scope, $http)  {
    var statistics = {};
    var eventTables = {};

    $http.get('../json/' + season + '/current-table.json').success(function (data) {
        noOfTourneys = data.length;
        if (noOfTourneys != undefined ) {
            playerEventPosition = calculatePlayerMovement(data);
            $scope.eventId = data.length;
            if ($scope.eventId == 1) {
                $scope.displayMovement = false;
            } else {
                $scope.displayMovement = true;
            }
            var totalTourneys =  data[0]["event" + data[0]["eventId"]];
            statistics.players = totalTourneys;
            for (i = 0; i < noOfTourneys; i ++) {
                 eventTables[i + 1] = data[noOfTourneys - 1 - i]["event" + data[noOfTourneys - 1 - i]["eventId"]];
                 for (j = 0; j < eventTables[i + 1].length; j ++) {
                    eventTables[i + 1][j].winRatio = eventTables[i + 1][j].won / eventTables[i + 1][j].played * 100;
                    eventTables[i + 1][j].lastRatio = eventTables[i + 1][j].last / eventTables[i + 1][j].played  * 100;
                    eventTables[i + 1][j].averagePoints = eventTables[i + 1][j].points / eventTables[i + 1][j].played;
                    eventTables[i + 1][j].averageCashes = eventTables[i + 1][j].cashes / eventTables[i + 1][j].played;
                    eventTables[i + 1][j].hidePlayer = false;
                    var movement = 0;
                    if (i > 0) {
                         ladderMovement = getLadderMovement((i + 1) + ":" + eventTables[i + 1][j].name) -
                                    getLadderMovement(i + ":" + eventTables[i + 1][j].name);
                         eventTables[i + 1][j].movement = ladderMovement;
                    }
                 }
                 statistics.eventTables = eventTables;
             }
            $scope.displayTable = eventTables[noOfTourneys];
            getUrlsForPlayers(statistics.players, season);
            $scope.statistics = statistics;
            $scope.noOfTourneys = noOfTourneys;
        };

        var overallLadder = [];
        var overallLadderItems = {};

        function accumulateOverallLadder(seasonResults) {
           if (seasonResults != undefined) {
               for (j = 0; j < seasonResults.length; j ++) {
                  var overallLadderPlayer = {};
                  var event = seasonResults[j]
                  if (overallLadderItems[event.name] == undefined) {
                     overallLadderPlayer.name = event.name;
                     overallLadderPlayer.nationality = event.nationality;
                     overallLadderPlayer.played = event.played;
                     overallLadderPlayer.won = event.won;
                     overallLadderPlayer.second = event.second;
                     overallLadderPlayer.third = event.third;
                     overallLadderPlayer.fourth = event.fourth;
                     overallLadderPlayer.last = event.last;
                     overallLadderPlayer.winRatio = (event.won / event.played) * 100;
                     overallLadderPlayer.lastRatio = (event.last / event.played) * 100;
                     overallLadderPlayer.points = event.points;
                     overallLadderPlayer.averagePoints = event.points / event.played;
                     overallLadderPlayer.totalPositions = parseInt(event.totalPositions);
                     overallLadderPlayer.averagePosition = (parseInt(event.totalPositions) / 1);
                     overallLadderPlayer.cashes = parseFloat(event.cashes);
                     overallLadderPlayer.averageCashes = (overallLadderPlayer.cashes / 1) * 100;
                     overallLadderPlayer.hosted = parseInt(event.hosted);
                     if (event.cash !== undefined) {
                        overallLadderPlayer.cash = parseFloat(event.cash);
                     }
                     overallLadderItems[event.name] = overallLadderPlayer;
                     var blah = "";
                  } else {
                       var existingPlayer = overallLadderItems[event.name];
                       existingPlayer.played = existingPlayer.played + event.played;
                       existingPlayer.won = existingPlayer.won + event.won;
                       existingPlayer.second = existingPlayer.second + event.second;
                       existingPlayer.third = existingPlayer.third + event.third;
                       existingPlayer.fourth = existingPlayer.fourth + event.fourth;
                       existingPlayer.last = existingPlayer.last + event.last;
                       existingPlayer.winRatio = (existingPlayer.won / existingPlayer.played) * 100;
                       existingPlayer.lastRatio = (existingPlayer.last / existingPlayer.played) * 100;
                       existingPlayer.points = existingPlayer.points + event.points;
                       existingPlayer.averagePoints = existingPlayer.points / existingPlayer.played;
                       if (event.totalPositions != undefined) { // TEMP TIL WE BACK FILL OLD CURRENT TABLE WITH TOTAL POSITIONS
                           existingPlayer.totalPositions = existingPlayer.totalPositions + parseInt(event.totalPositions);
                           existingPlayer.averagePosition = (existingPlayer.totalPositions / existingPlayer.played);
                       }
                       existingPlayer.cashes = existingPlayer.cashes + parseFloat(event.cashes);
                       existingPlayer.averageCashes = (existingPlayer.cashes / existingPlayer.played) * 100;
                       existingPlayer.hosted = existingPlayer.hosted + parseFloat(event.hosted);
                       if (event.cash !== undefined) {
                        existingPlayer.cash = existingPlayer.cash + parseFloat(event.cash);
                       }
                       overallLadderItems[event.name] = existingPlayer;
                  }
               }
           }
        }

        $http.get('../json/2016/current-table.json').success(function (data) {
            accumulateOverallLadder(data[0]["event" + data[0].eventId]);

            $http.get('../json/2015/current-table.json').success(function (data) {
                accumulateOverallLadder(data[0]["event" + data[0].eventId]);

                $http.get('../json/2014/current-table.json').success(function (data) {
                    accumulateOverallLadder(data[0]["event" + data[0].eventId]);

                    $http.get('../json/2013/current-table.json').success(function (data) {
                       accumulateOverallLadder(data[0]["event" + data[0].eventId]);
                    });

                    $http.get('../json/general/championship-medals.json').success(function (data) {
                       for (var ladderItem in overallLadderItems) {
                         for (var j = 0; j < data.length; j ++) {
                           if (overallLadderItems[ladderItem].name == data[j].name) {
                             overallLadderItems[ladderItem].gold = data[j].gold;
                             overallLadderItems[ladderItem].silver = data[j].silver;
                             overallLadderItems[ladderItem].bronze = data[j].bronze;
                             overallLadderItems[ladderItem].spoon = data[j].spoon;
                           }
                         }
                       }
                       for (ladderItem in overallLadderItems) {
                          overallLadder.push(overallLadderItems[ladderItem]);
                       }
                       $scope.allSeasonsLadder = overallLadder;
                    });
                });
             });
        });

    });

    $http.get('../json/' + season + '/form-table.json').success(function (data) {
        for (i = 0; i < data.length; i++) {
            data[i].averagePoints = data[i].points / data[i].played;
            data[i].winRatio = data[i].won / data[i].played * 100;
            data[i].lastRatio = data[i].last / data[i].played * 100;
        }
        $scope.formTable = data;
        getUrlsForPlayers(data, season);
    });

    $scope.statistics = statistics;
}

function getUrlsForPlayers(players, year) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=' + year;
    }
}

function getLadderMovement(playerEvent) {
    return playerEventPosition[playerEvent];
}

function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
var playerEventPosition;
var season = $('meta[name="season"]').attr("content");

var ladderModule = angular.module('poker', []);        // poker module is the name of the ng-app on the template

ladderModule.controller('homePageController', function ($scope, $http) {
    populateDetailsFromJson($scope, $http);   // calls ajax request to read ladder results from json file generated via clojure app :)
    $scope.displayTable = [];
    $scope.displayExtra = false;

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

     //  Get news ticker item
    $http.get('../json/general/news-item.json').success(function (data) {
      $scope.newsItem = data[0]["news-item"];
    });

     // Set countdown time to next event
     if (season == "2014"){
        $http.get('../json/general/next-event.json').success(function (data) {
            var nextEventDate = data[0]["event-date"];
            var nextEventTime = data[0]["event-time"];

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

});

function populateDetailsFromJson ($scope, $http)  {
    var statistics = {};
    var eventTables = {};

    $http.get('../json/' + season + '/current-table.json').success(function (data) {
        noOfTourneys = data.length;
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

        var overallLadder = [];
        var overallLadderItems = {};

        function accumulateOverallLadder(seasonResults) {
           var noOfSeasons = 2;  // code hack for average position calc - should be driven by json file of year lists?
           for (j = 0; j < seasonResults.length; j ++) {
              var overallLadderPlayer = {};
              var event = seasonResults[j]
              if (overallLadderItems[event.name] == undefined) {
                 overallLadderPlayer.name = event.name;
                 overallLadderPlayer.nationality = event.nationality;
                 overallLadderPlayer.played = event.played;
                 overallLadderPlayer.won = event.won;
                 overallLadderPlayer.last = event.last;
                 overallLadderPlayer.points = event.points;
                 overallLadderPlayer.averagePosition = event.averagePosition;
                 overallLadderItems[event.name] = overallLadderPlayer;
              } else {
                   var existingPlayer = overallLadderItems[event.name];
                   existingPlayer.played = existingPlayer.played + event.played;
                   existingPlayer.won = existingPlayer.won + event.won;
                   existingPlayer.last = existingPlayer.last + event.last;
                   existingPlayer.points = existingPlayer.points + event.points;
                   existingPlayer.averagePosition = (existingPlayer.averagePosition + event.averagePosition) / noOfSeasons
                   overallLadderItems[event.name] = existingPlayer;
              }
           }
        }

        $http.get('../json/2014/current-table.json').success(function (data) {

              accumulateOverallLadder(data[0]["event" + data[0].eventId]);
//           for (i = 0; i < data.length; i++) {
//              accumulateOverallLadder(data[i]);
//           }

            $http.get('../json/2013/current-table.json').success(function (data) {
               accumulateOverallLadder(data[0]["event" + data[0].eventId]);
//               for (i = 0; i < data.length; i++) {
//                  accumulateOverallLadder(data[i]);
//               }
               for (ladderItem in overallLadderItems) {
                 overallLadder.push(overallLadderItems[ladderItem]);
               }
               $scope.allSeasonsLadder = overallLadder;
            });
        });
    });

    //  Get menu dropdown of players for relevant season
    $http.get('../json/general/players.json').success(function (data) {
        var players = [];
        var nationality = {};
        for (i = 0; i < data.length; i++) {
            for (j = 0; j < data[i].players.length; j++) {
                var player = {};
                var playerNationality = [];
                player.name = data[i].players[j].name;
                player.year = data[i].year;
                var nameParts = player.name.split(" ");
                player.url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=' + data[i].year;
                players.push(player);
                nationality[player.name] = data[i].players[j].Nationality;
                playerNationality.push(nationality);
            }
       }
       $scope.playerNationality = playerNationality;
       $scope.statistics.playerMenuDropdown = players;
    });


    $http.get('../json/' + season + '/form-table.json').success(function (data) {
            $scope.formTable = data;
            getUrlsForPlayers(data, season);
    });

    // Used for dropdown menus
    $http.get('../json/2014/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        statistics.events = data;
        getUrlForEvents(data);
    });

    $http.get('../json/2013/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        statistics.previousEvents = data;
        getUrlForEvents(data);
    });

    $http.get('../json/general/extras.json').success(function (data) {
       statistics.extras = data;
    });

    $scope.statistics = statistics;
}

function getUrlsForPlayers(players, year) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=' + year;
    }
}

function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "../events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
}

function getLadderMovement(playerEvent) {
    return playerEventPosition[playerEvent];
}

function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
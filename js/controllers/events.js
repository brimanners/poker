var eventModule = angular.module('event', []);        // poker is the name of the ng-app on the template

eventModule.controller('event-controller', function ($scope, $http) {
      var results = {};         // create a model object that can be put on the scope later
      var tournaments = {};
      var eventDate = $('meta[name="eventDate"]').attr("content");
      var noOfTournaments = parseInt($('meta[name="noOfTournaments"]').attr("content"));

      for (var i=1; i <= noOfTournaments ; i++) {
        var fileName = "../json/2013/" + eventDate + "_" + i + "_results.json";
        getTournamentSummary($http, fileName, eventDate, i, tournaments);
      };

      function getTournamentSummary ($http, fileName, eventDate, counter, tournaments) {
          $http.get(fileName).success(function (data) {
            if (counter == 1) {
                  tournaments.tournamentOne  = data;
            } else {
                  tournaments.tournamentTwo  = data;
            }
            $scope.tournaments = tournaments;
          });
        };

      //this function feel like they should be a in general util type area - need to work out scoping so all angular controller can see....
      $scope.positionSuffix = function(position) {
          switch (position) {
              case 1 : return "st"; break;
              case 2 : return "nd"; break;
              case 3 : return "rd"; break;
              default : return "th"; break;
          }
      }

    $http.get('../json/2013/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
              data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        results.events = data;
        getUrlForEvents(results.events);
    });

    $http.get('../json/2013/event_results.json').success(function (data) {
       results.eventResults = data; /* Tournament results - i.e. position, player and points */
    });

    //  Get menu dropdown of players for relevant season
   $http.get('../json/players.json').success(function (data) {
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

    $http.get('../json/2013/current-table.json').success(function (data) {
        var eventTables = {};
        var noOfTourneys = data.length;
        for (i = 0; i < noOfTourneys; i ++) {
            eventTables[i + 1] = data[noOfTourneys - 1 - i]["event" + (i + 1)];
            results.eventTables = eventTables;
        }
        getUrlsForPlayers(data[0]["event" + noOfTourneys]);
     });

     $http.get('../json/extras.json').success(function (data) {
        results.extras = data;
     });

     $scope.results = results;

    $scope.gotPoints = function(result) {
      return result.points > 0
    };
   }
);


function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "../events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
}

function getUrlsForPlayers(players) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url = "../players/" + nameParts[0].toLowerCase() + nameParts[1] + ".html";
    }
    return players;
}
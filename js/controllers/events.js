var eventModule = angular.module('event', []);        // poker is the name of the ng-app on the template

eventModule.controller('event-controller', function ($scope, $http) {
      var results = {};         // create a model object that can be put on the scope later
      var tournaments = {};
      var eventDate = $('meta[name="eventDate"]').attr("content");
      var noOfTournaments = parseInt($('meta[name="noOfTournaments"]').attr("content"));

      for (var i=1; i <= noOfTournaments ; i++) {
        var fileName = "../json/" + eventDate + "_" + i + "_results.json";
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

    $http.get('../json/event-history.json').success(function (data) {
        results.events = data;
        getUrlForEvents(results.events);
    });

    $http.get('../json/event_results.json').success(function (data) {
       results.eventResults = data; /* Tournament results - i.e. position, player and points */
    });

    $http.get('../json/current-table.json').success(function (data) {
        results.ladderEvent1 = data[3].event1;                       // TODO could do this in a loop based on total events
        results.ladderEvent2 = data[2].event2;
        results.ladderEvent3 = data[1].event3;
        results.ladderEvent4 = data[0].event4;
        results.results = data;                     // do we need this? used in next line but can in line
        getUrlsForPlayers(results.results);
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
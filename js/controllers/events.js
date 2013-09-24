var eventModule = angular.module('event', []);        // poker is the name of the ng-app on the template

eventModule.controller('event-controller', function ($scope, $http) {
      var results = {};         // create a model object that can be put on the scope later
      var tournaments = {};

      // This will eventually be either copied and pasted from Clojure app, or called directly when the clojure app is wrapped up into an uberjar and hosted?

       results.ladder = [
             {"won":0,"forename":"Steve","points":16,"surname":"W","average":8.0,"played":2},
             {"won":0,"forename":"Dave","points":10,"surname":"M","average":5.0,"played":2},
             {"won":1,"forename":"Brian","points":16,"surname":"M","average":8.0,"played":2},
             {"won":0,"forename":"Michael","points":2,"surname":"R","average":1.0,"played":2},
             {"won":0,"forename":"Jade","points":6,"surname":"W","average":3.0,"played":2},
             {"won":0,"forename":"Ben","points":22,"surname":"I","average":11.0,"played":2},
             {"won":0,"forename":"Paul","points":6,"surname":"B","average":3.0,"played":2},
             {"won":1,"forename":"Mark","points":18,"surname":"L","average":9.0,"played":2},
            ];

        results.ladderFour = [
             {"won":0,"forename":"Steve","points":22,"surname":"W","average":5.5,"played":4},
             {"won":0,"forename":"Dave","points":10,"surname":"M","average":5.0,"played":2},
             {"won":1,"forename":"Brian","points":24,"surname":"M","average":6.0,"played":4},
             {"won":0,"forename":"Michael","points":2,"surname":"R","average":1.0,"played":2},
             {"won":0,"forename":"Jade","points":16,"surname":"W","average":4.0,"played":4},
             {"won":0,"forename":"Ben","points":30,"surname":"I","average":7.5,"played":4},
             {"won":0,"forename":"Paul","points":10,"surname":"B","average":2.5,"played":4},
             {"won":1,"forename":"Mark","points":18,"surname":"L","average":9.0,"played":2},
             {"won":2,"forename":"Mark","points":18,"surname":"V","average":9.0,"played":2}
            ];

        results.ladderSix = [
             {"won":0,"forename":"Steve","points":29,"surname":"W","average":4.8,"played":6},
             {"won":0,"forename":"Dave","points":17,"surname":"M","average":4.3,"played":4},
             {"won":1,"forename":"Brian","points":31,"surname":"M","average":5.2,"played":6},
             {"won":0,"forename":"Michael","points":2,"surname":"R","average":1.0,"played":2},
             {"won":1,"forename":"Jade","points":31,"surname":"W","average":5.2,"played":6},
             {"won":0,"forename":"Ben","points":49,"surname":"I","average":8.2,"played":6},
             {"won":0,"forename":"Paul","points":29,"surname":"B","average":4.8,"played":6},
             {"won":1,"forename":"Mark","points":18,"surname":"L","average":9.0,"played":2},
             {"won":2,"forename":"Mark","points":25,"surname":"V","average":6.3,"played":4},
             {"won":1,"forename":"Simon","points":15,"surname":"M","average":7.5,"played":2}
        ];

        results.ladderSeven = [
             {"won":0,"forename":"Steve","points":0,"surname":"W","average":0,"played":7},
             {"won":0,"forename":"Dave","points":0,"surname":"M","average":0,"played":5},
             {"won":0,"forename":"Brian","points":0,"surname":"M","average":0,"played":7},
             {"won":0,"forename":"Michael","points":0,"surname":"R","average":0,"played":2},
             {"won":0,"forename":"Jade","points":0,"surname":"W","average":0,"played":7},
             {"won":0,"forename":"Ben","points":0,"surname":"I","average":0,"played":7},
             {"won":0,"forename":"Paul","points":0,"surname":"B","average":0,"played":7},
             {"won":0,"forename":"Mark","points":0,"surname":"L","average":0,"played":3},
             {"won":0,"forename":"Mark","points":0,"surname":"V","average":0,"played":5},
             {"won":0,"forename":"Simon","points":0,"surname":"M","average":0,"played":2}
        ];


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
        results.results = data;
        getUrlsForPlayers(results.results);
     });

     $http.get('../json/extras.json').success(function (data) {
               results.extras = data;
     });

      $scope.results = results;
   }
);


function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "../events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
//    return events;
}

function getUrlsForPlayers(players) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url = "../players/" + nameParts[0].toLowerCase() + nameParts[1] + ".html";
    }
    return players;
}
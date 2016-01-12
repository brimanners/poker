var app = angular.module('poker', []);

app.controller('events-controller', function ($scope, $http) {
    loadTitles($scope, $http)
});

function loadTitles($scope, $http) {
   $scope.statistics = {};
   $scope.event = location.href.split('event=')[1];
   var event = [];
   var tournaments = {};
   var results = {};

   $http.get('../json/general/events.json').success(function (data) {
        for (i = 0; i < data.length; i ++) {
            event[i + 1] = data[i];
        }
       $scope.title = event[$scope.event].title;
       $scope.subTitle = event[$scope.event].subTitle;

       for (var i=1; i <= event[$scope.event].noOfTourneys ; i++) {
          var eventDate = event[$scope.event].eventDate
          var season = eventDate.substring(6,10);
          var fileName = "../json/" + season + "/" + eventDate + "_" + i + "_results.json";
          getTournamentSummary($http, fileName, eventDate, i, tournaments);
          getEventResults(season);
       };
       getEventTable(season);

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

       function getEventResults(season) {
          $http.get('../json/' + season + '/event_results.json').success(function (data) {
               results.eventResults = data; /* Tournament results - i.e. position, player and points */
               $scope.results = results;
           });
       }

       function getEventTable(season) {
           $http.get('../json/' + season + '/current-table.json').success(function (data) {
               var eventTable = {};
               var noOfEvents = data.length;
               var eventTables = data;
               for (i = 0; i < noOfEvents; i ++) {
                   if (eventTables[i].eventId == $scope.event) {
                       eventTable = eventTables[i]["event" + $scope.event];
                   }
               }
               $scope.table = eventTable;
            });
       }


   });

    $scope.gotPoints = function(result) {
        return result.points > 0
      };

   $scope.eventDetails = "eventDetails/event" + $scope.event + ".html";
}



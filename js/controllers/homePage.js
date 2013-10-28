var ladderModule = angular.module('poker', []);        // poker module is the name of the ng-app on the template

ladderModule.controller('homePageController', function ($scope, $http) {
    populateDetailsFromJson($scope, $http);   // calls ajax request to read ladder results from json file generated via clojure app :)
    $scope.displayTable = [];

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
        $scope.displayTable = $scope.homePageStatistics.eventTables[$scope.eventId];
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

});

function populateDetailsFromJson ($scope, $http)  {
    var statistics = {};
    var eventTables = {};

    $http.get('json/current-table.json').success(function (data) {
        noOfTourneys = data.length;
        $scope.eventId = noOfTourneys;
        statistics.players = data[0]["event" + noOfTourneys];
        for (i = 0; i < noOfTourneys; i ++) {
             eventTables[i + 1] = data[noOfTourneys - 1 - i]["event" + (i + 1)];
             statistics.eventTables = eventTables;
         }
         $scope.displayTable = eventTables[noOfTourneys];

        getUrlsForPlayers(statistics.players);
        $scope.homePageStatistics = statistics;
        $scope.noOfTourneys = noOfTourneys;
    });


    $http.get('json/form-table.json').success(function (data) {
            $scope.formTable = data;
    });


    $http.get('json/event-history.json').success(function (data) {
        statistics.events = data;
        getUrlForEvents(statistics.events);
    });

    $http.get('json/extras.json').success(function (data) {
       statistics.extras = data;
       stripUrlPrefix(statistics.extras);
    });

    $scope.homePageStatistics = statistics;
}

function getUrlsForPlayers(players) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url =  "players/" + nameParts[0].toLowerCase() + nameParts[1] + ".html";
    }
}

function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
}

function stripUrlPrefix(extras) {
    for (var i=0; i < extras.length; i++) {
        extras[i].url = extras[i].url.replace("../","");
    }
}

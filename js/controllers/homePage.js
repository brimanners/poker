var ladderModule = angular.module('poker', []);        // poker module is the name of the ng-app on the template

ladderModule.controller('homePageController', function ($scope, $http) {
    populateDetailsFromJson($scope, $http);   // calls ajax request to read ladder results from json file generated via clojure app :)

    // this function feel like they should be a in general util type area - need to work out scoping so all angular controller can see....
    $scope.positionSuffix = function(position) {
        switch (position) {
           case 1 : return "st"; break;
           case 2 : return "nd"; break;
           case 3 : return "rd"; break;
           default : return "th"; break;
        }
    }
});

function populateDetailsFromJson ($scope, $http)  {
    var statistics = {};

    $http.get('json/current-table.json').success(function (data) {
        statistics.players = data[0]["event" + data.length];
        getUrlsForPlayers(statistics.players);
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
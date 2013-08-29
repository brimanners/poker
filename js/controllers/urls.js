var urlsModule = angular.module('urls', []);        // poker module is the name of the ng-app on the template

urlsModule.controller('urlsController', function ($scope, $http) {
    urls = getJsonResults($scope, $http);   // calls ajax request to read ladder results from json file generated via clojure app :)

    // this function feel like they should be a in general util type area - need to work out scoping so all angular controller can see....
    $scope.urls = urls;

});

function getJsonResults ($scope, $http)  {
    var urls = {};
    return urls;

    $http.get('json/current-table.json').success(function (data) {
        statistics.results = data;
        getUrlsForPlayers(statistics.results);
    });
}

function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
    return events;
}

function getUrlsForPlayers(players) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url =  "players/" + nameParts[0].toLowerCase() + nameParts[1] + ".html";
    }
    return players;
}

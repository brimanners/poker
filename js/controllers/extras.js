var extras = angular.module('extras', []);

extras.controller('extrasController', function ($scope, $http) {
   var extraDetails = {};

   $http.get('../json/event-history.json').success(function (data) {
           extraDetails.events = data;
           getUrlForEvents(extraDetails.events);
   });

   $http.get('../json/current-table.json').success(function (data) {
      extraDetails.results = data[0]["event" + data.length]
      getUrlsForPlayers(extraDetails.results);
   });

   $http.get('../json/extras.json').success(function (data) {
         extraDetails.extras = data;
   });

    $scope.extraDetails = extraDetails;
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
        players[i].url = "../players/" + nameParts[0].toLowerCase() + nameParts[1] + ".html";
    }
    return players;
}

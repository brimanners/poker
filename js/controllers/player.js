var player = angular.module('player', []);


player.controller('playerController', function ($scope, $http) {
   var playerDetails = {};

   $http.get('../json/event-history.json').success(function (data) {
           playerDetails.events = data;
           getUrlForEvents(playerDetails.events);
   });

   $http.get('../json/current-table.json').success(function (data) {
      playerDetails.results = data;
      getUrlsForPlayers(playerDetails.results);
   });

   $http.get('../json/extras.json').success(function (data) {
         playerDetails.extras = data;
   });

    $scope.playerDetails = playerDetails;
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
        players[i].url = nameParts[0].toLowerCase() + nameParts[1] + ".html";
    }
    return players;
}

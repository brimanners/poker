var extras = angular.module('extras', []);

extras.controller('extrasController', function ($scope, $http) {
   var extraDetails = {};

   // Used for dropdown menus
   $http.get('../json/2014/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       extraDetails.CCXIV_Events = data;
       getUrlForEvents(extraDetails.CCXIV_Events);
   });

   $http.get('../json/2013/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }

       extraDetails.CCXIII_Events = data;
       getUrlForEvents(extraDetails.CCXIII_Events);
   });

   $http.get('../json/general/extras.json').success(function (data) {
         extraDetails.extras = data;
   });

  $http.get('../json/general/blind-levels.json').success(function (data) {
    $scope.blind_levels = data;
    var dateCalc = new Date(2014, 9, 1, 19, 30, 0, 0);
    for (i = 0; i < data.length; i ++) {
       var duration = parseInt($scope.blind_levels[i].duration);
       if (duration > 0) {
          dateCalc.setMinutes(dateCalc.getMinutes() + parseInt($scope.blind_levels[i].duration));
       }
       var minutes = dateCalc.getMinutes();
       if (minutes < 9) {
         minutes = "0" + minutes;
       }
       $scope.blind_levels[i].estimatedTime = dateCalc.toLocaleTimeString();
    }
  });


   //  Get menu dropdown of players for relevant season
   $http.get('../json/general/players.json').success(function (data) {
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



var app = angular.module('poker', []);

app.controller('extrasController', function ($scope, $http) {
   var extraDetails = {};
   $scope.statistics = {};

  $http.get('../json/general/blind-levels.json').success(function (data) {
    $scope.blind_levels = data;
    var dateCalc = new Date(2014, 9, 1, 19, 00, 0, 0);
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

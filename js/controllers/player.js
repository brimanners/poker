var player = angular.module('player', []);
var playerEventPosition;

player.controller('playerController', function ($scope, $http) {
   var playerDetails = {};

   $scope.positionSuffix = function(position) {
           switch (position) {
              case 1 : return "st"; break;
              case 2 : return "nd"; break;
              case 3 : return "rd"; break;
              default : return "th"; break;
           }
   }

   var playerYear = getURLParameter('year')
   var player = getURLParameter('name');

//   $http.get('../json/' + playerYear + '/event-history.json').success(function (data) {
//       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
//          data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
//       }
//       playerDetails.events = data;
//       getUrlForEvents(data);
//   });

   $http.get('../json/2014/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       playerDetails.events = data;
       getUrlForEvents(data);
   });

   $http.get('../json/2013/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       playerDetails.previousEvents = data;
       getUrlForEvents(data);
   });



   $http.get('../json/' + playerYear + '/current-table.json').success(function (data) {
      playerDetails.results = data[0]["event" + data.length];
      for (i = 0; i < playerDetails.results.length; i++) {
        var playerName = changeNameToParameterType(playerDetails.results[i].name);
        if (playerName == player) {
            $scope.playerLongName = playerDetails.results[i].name + "'s";
        }
        playerDetails.results[i].name = playerName;
      }
      getUrlsForPlayers(playerDetails.results);
   });

   $http.get('../json/extras.json').success(function (data) {
         playerDetails.extras = data;
   });

   //  Get menu dropdown of players for relevant season
   $http.get('../json/players.json').success(function (data) {
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

   $http.get('../json/' + playerYear + '/' + player + '_event_history.json').success(function (data) {
        playerDetails.eventDetails = data;
        var playerCumulativePoints = new Array();
        var accumulate = 0;
        for (i = 0; i < data.length; i ++) {
            accumulate = accumulate + data[i].points
            playerCumulativePoints[i] = accumulate;
            playerDetails.cumulativePoints = playerCumulativePoints;
        }
        drawPointsAccumulationLineGraph(playerDetails.cumulativePoints);
    });

    $http.get('../json/' + playerYear + '/current-table.json').success(function (data) {
            noOfTourneys = data.length;
            playerEventPosition = calculatePlayerMovement(data, player);
            drawLadderPositionLineGraph(playerEventPosition.playerPosition);
    });
    $scope.player = getURLParameter('name');
    $scope.year = getURLParameter('year');
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
        players[i].url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=2014';
    }
    var blah = "";

    return players;
}

function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function changeNameToParameterType(name) {
    return name.substring(0, name.length - 1).toLowerCase().replace(" ","") + name.substring(name.length, name.length -1);
}

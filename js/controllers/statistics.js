var eventModule = angular.module('event', []);        // poker is the name of the ng-app on the template

eventModule.controller('statistics-controller', function ($scope, $http) {
      var results = {};         // create a model object that can be put on the scope later
      var tournaments = {};
      var eventDate = $('meta[name="eventDate"]').attr("content");
      var season = eventDate.substring(6,10);
      var noOfTournaments = parseInt($('meta[name="noOfTournaments"]').attr("content"));

    // Generic - event history dropdown
    $http.get('../json/2014/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        results.events = data;
        getUrlForEvents(results.events);
    });

    // Generic - event history dropdown

    $http.get('../json/2013/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        results.previousEvents = data;
        getUrlForEvents(results.previousEvents);
    });


    //  Get menu dropdown of players for relevant season and accuulate stat for graphs
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
      playerList = players;

      for (i = 0; i < players.length; i++) {
        if (players[i].year == "2014") {
            var playerName = players[i].name;
            var playerNoSpace = playerName.substring(0,1).toLowerCase() + playerName.substring(1,playerName.length) + '.json';
            var jsonFile = playerNoSpace.replace(/ /g,'')
        }
      }
   });

    // Generic - extras
     $http.get('../json/general/extras.json').success(function (data) {
        results.extras = data;
     });

     $scope.results = results;

    $scope.gotPoints = function(result) {
      return result.points > 0
    };
   }

);
// Used for generic url setting
function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "../events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
}

// generic - used for player dropdown url
function getUrlsForPlayers(players) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url = "../players/" + nameParts[0].toLowerCase() + nameParts[1] + ".html";
    }
    return players;
}

function animateIn() {
  $("#wonDonutChart").addClass('animated rotateIn');
  $("#playedDonutChart").addClass('animated rotateIn');
  $("#topThreeDonutChart").addClass('animated rotateIn');
  $("#bountiesDonutChart").addClass('animated rotateIn');
  $("#lastDonutChart").addClass('animated rotateIn');
  $("#hostedDonutChart").addClass('animated rotateIn');
  $("#pointsDonutChart").addClass('animated rotateIn');
  setTimeout (function () {
     $("#wonDonutChart").removeClass('animated rotateIn');
     $("#playedDonutChart").removeClass('animated rotateIn');
     $("#topThreeDonutChart").removeClass('animated rotateIn');
     $("#bountiesDonutChart").removeClass('animated rotateIn');
     $("#lastDonutChart").removeClass('animated rotateIn');
     $("#hostedDonutChart").removeClass('animated rotateIn');
     $("#pointsDonutChart").removeClass('animated rotateIn');
  },2000);
}

function animateOut() {
   $("#wonDonutChart").addClass('animated rotateOut');
   $("#playedDonutChart").addClass('animated rotateOut');
   $("#topThreeDonutChart").addClass('animated rotateOut');
   $("#bountiesDonutChart").addClass('animated rotateOut');
   $("#lastDonutChart").addClass('animated rotateOut');
   $("#hostedDonutChart").addClass('animated rotateOut');
   $("#pointsDonutChart").addClass('animated rotateOut');
 setTimeout (function () {
     $("#wonDonutChart").removeClass('animated rotateOut');
     $("#playedDonutChart").removeClass('animated rotateOut');
     $("#topThreeDonutChart").removeClass('animated rotateOut');
     $("#bountiesDonutChart").removeClass('animated rotateOut');
     $("#lastDonutChart").removeClass('animated rotateOut');
     $("#hostedDonutChart").removeClass('animated rotateOut');
     $("#pointsDonutChart").removeClass('animated rotateOut');
     animateIn();
  },2000);

}


$(document).ready(function(){

    $.blockUI({ message: 'Gathering all the statistics goodness - please wait'});
    setTimeout($.unblockUI, 2000);


    $.ajax({
        url: '../json/general/players.json', dataType: 'json', async: false, success: function(data) {
            gatherDonutStats("2014", data)
            animateIn();
        }
     });

     $("#seasons").attr("selectedIndex", -1);

     $("#seasons").change(function() {

        $.blockUI({ message: 'Gathering all the statistics goodness - please wait'});
        setTimeout($.unblockUI, 2000);
        var season = $("#seasons option:selected").val();
        $.ajax({
            url: '../json/general/players.json', dataType: 'json', async: false, success: function(data) {
                gatherDonutStats(season, data)
                animateOut();
            }
         });
     });

     function gatherDonutStats(year, data) {
         var playedDonutData = [];
         var wonDonutData = [];
         var topThreeDonutData = [];
         var bountiesDonutData = [];
         var lastDonutData = [];
         var hostedDonutData = [];
         var pointsDonutData = [];

         wonDonutData.push(['Player', 'Won']);
         playedDonutData.push(['Player', 'Played']);
         topThreeDonutData.push(['Player', 'Top 3']);
         bountiesDonutData.push(['Player', 'Bounties']);
         lastDonutData.push(['Player', 'Last']);
         hostedDonutData.push(['Player', 'Hosted']);
         pointsDonutData.push(['Player', 'Points']);
         var playerWonMap = new Object();
         var playerPlayedMap = new Object();
         var playerTopThreeMap = new Object();
         var playerBountiesMap = new Object();
         var playerLastMap = new Object();
         var playerHostedMap = new Object();
         var playerPointsMap = new Object();

         for (var i = 0; i < data.length; i++) {

              var season = data[i].year;
              if (season == year || year == "All") {
                 for (var j = 0; j < data[i].players.length; j++) {
                     var playerName = data[i].players[j].name;
                     var fileName = playerName.substring(0,1).toLowerCase() + playerName.substring(1, playerName.length);
                     var playerJsonFile = fileName.replace(/ /g,'') + ".json";

                     $.ajax({
                         url: '../json/' + season + '/' + playerJsonFile, dataType: 'json', async: false, success: function(playerJson) {
                             for (var k = 0; k < playerJson.positionAndPlayers.length; k++) {
                                var playerName = formatName(playerJson.positionAndPlayers[k].player);
                                var playerJsonStats = playerJson.positionAndPlayers[k].statistics;

                                if (playerWonMap['Won :' + playerName] !== undefined) {
                                    playerWonMap['Won :' + playerName] = parseInt(playerWonMap['Won :' + playerName]) + playerJsonStats.won;
                                } else {
                                    playerWonMap['Won :' + playerName] = playerJsonStats.won
                                }
                                if (playerPlayedMap['Played :' + playerName] !== undefined) {
                                    playerPlayedMap['Played :' + playerName] = parseInt(playerPlayedMap['Played :' + playerName]) + playerJsonStats.played;
                                } else {
                                    playerPlayedMap['Played :' + playerName] = playerJsonStats.played;
                                }
                                if (playerTopThreeMap['Top3 :' + playerName] !== undefined) {
                                    playerTopThreeMap['Top3 :' + playerName] = parseInt(playerTopThreeMap['Top3 :' + playerName]) + playerJsonStats.top3;
                                } else {
                                    playerTopThreeMap['Top3 :' + playerName] = playerJsonStats.top3;
                                }
                                if (playerBountiesMap['Bounty :' + playerName] !== undefined) {
                                    playerBountiesMap['Bounty :' + playerName] = parseInt(playerBountiesMap['Bounty :' + playerName]) + playerJsonStats.bounties;
                                } else {
                                    playerBountiesMap['Bounty :' + playerName] = playerJsonStats.bounties;
                                }
                                if (playerLastMap['Last :' + playerName] !== undefined) {
                                    playerLastMap['Last :' + playerName] = parseInt(playerLastMap['Last :' + playerName]) + playerJsonStats.last;
                                } else {
                                    playerLastMap['Last :' + playerName] = playerJsonStats.last;
                                }
                                if (playerHostedMap['Hosted :' + playerName] !== undefined) {
                                    playerHostedMap['Hosted :' + playerName] = parseInt(playerHostedMap['Hosted :' + playerName]) + playerJsonStats.hosted;
                                } else {
                                    playerHostedMap['Hosted :' + playerName] = playerJsonStats.hosted;
                                }
                             }
                         }
                     })


                     var playerEventJsonFile = playerJsonFile.replace('.json','_event_history.json');
                     var totalPoints = 0;
                     $.ajax(
                        { url: '../json/' + season + '/' + playerEventJsonFile, dataType: 'json', async: false, success: function(playerEventJson) {
                            for (var k = 0; k < playerEventJson.length; k++) {
                                  totalPoints = totalPoints + playerEventJson[k].points;
                            }

                            if (playerPointsMap['Points :' + playerName] !== undefined) {
                                 playerPointsMap['Points :' + playerName] = parseInt(playerPointsMap['Points :' + playerName]) + totalPoints;
                            } else {
                                 playerPointsMap['Points :' + playerName] = totalPoints;
                            }
                         }
                     })
                 }
             }
         }


         for (var player in playerWonMap) {
             wonDonutData.push([player.substring(5, player.length), playerWonMap[player]]);
          }
          for (var player in playerPlayedMap) {
             playedDonutData.push([player.substring(8, player.length), playerPlayedMap[player]]);
          }
         for (var player in playerTopThreeMap) {
            topThreeDonutData.push([player.substring(6, player.length), playerTopThreeMap[player]]);
         }
         for (var player in playerBountiesMap) {
            bountiesDonutData.push([player.substring(8, player.length), playerBountiesMap[player]]);
         }
         for (var player in playerLastMap) {
              lastDonutData.push([player.substring(6, player.length), playerLastMap[player]]);
         }
         for (var player in playerHostedMap) {
               hostedDonutData.push([player.substring(8, player.length), playerHostedMap[player]]);
          }
         for (var player in playerPointsMap) {
              pointsDonutData.push([player.substring(8, player.length), playerPointsMap[player]]);
         }

         drawDonutChart(wonDonutData, "Won", "wonDonutChart");
         drawDonutChart(playedDonutData, "Played", "playedDonutChart");
         drawDonutChart(topThreeDonutData, "Top 3", "topThreeDonutChart");
         drawDonutChart(bountiesDonutData, "Bounties", "bountiesDonutChart");
         drawDonutChart(lastDonutData, "Lucky last", "lastDonutChart");
         drawDonutChart(hostedDonutData, "Hosted", "hostedDonutChart");
         drawDonutChart(pointsDonutData, "Total Points", "pointsDonutChart");
     }

     function formatName(player) {
         var initial = player.substring(0,1).toUpperCase();
         var playerName = initial + player.substring(1, player.length - 1);
         if (playerName == "Mark") {
             playerName += " " + player.substring(player.length - 1, player.length);
         }
         return playerName
    }

});
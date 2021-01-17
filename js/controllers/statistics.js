var app = angular.module('poker', []);        // poker is the name of the ng-app on the template

app.controller('statistics-controller', function ($scope, $http) {
      var results = {};         // create a model object that can be put on the scope later
      var tournaments = {};
      var eventDate = $('meta[name="eventDate"]').attr("content");
      var season = eventDate.substring(6,10);
      var noOfTournaments = parseInt($('meta[name="noOfTournaments"]').attr("content"));
      $scope.statistics = {};

      $scope.gotPoints = function(result) {
      return result.points > 0

    };
   }
);

function animateIn() {
  $("#wonDonutChart").addClass('animated rotateIn');
  $("#playedDonutChart").addClass('animated rotateIn');
  $("#topThreeDonutChart").addClass('animated rotateIn');
//  $("#bountiesDonutChart").addClass('animated rotateIn');
  $("#lastDonutChart").addClass('animated rotateIn');
  $("#hostedDonutChart").addClass('animated rotateIn');
  $("#pointsDonutChart").addClass('animated rotateIn');
  setTimeout (function () {
     $("#wonDonutChart").removeClass('animated rotateIn');
     $("#playedDonutChart").removeClass('animated rotateIn');
     $("#topThreeDonutChart").removeClass('animated rotateIn');
//     $("#bountiesDonutChart").removeClass('animated rotateIn');
     $("#lastDonutChart").removeClass('animated rotateIn');
     $("#hostedDonutChart").removeClass('animated rotateIn');
     $("#pointsDonutChart").removeClass('animated rotateIn');
  },2000);
}

function animateOut() {
   $("#wonDonutChart").addClass('animated rotateOut');
   $("#playedDonutChart").addClass('animated rotateOut');
   $("#topThreeDonutChart").addClass('animated rotateOut');
//   $("#bountiesDonutChart").addClass('animated rotateOut');
   $("#lastDonutChart").addClass('animated rotateOut');
   $("#hostedDonutChart").addClass('animated rotateOut');
   $("#pointsDonutChart").addClass('animated rotateOut');
 setTimeout (function () {
     $("#wonDonutChart").removeClass('animated rotateOut');
     $("#playedDonutChart").removeClass('animated rotateOut');
     $("#topThreeDonutChart").removeClass('animated rotateOut');
//     $("#bountiesDonutChart").removeClass('animated rotateOut');
     $("#lastDonutChart").removeClass('animated rotateOut');
     $("#hostedDonutChart").removeClass('animated rotateOut');
     $("#pointsDonutChart").removeClass('animated rotateOut');
     animateIn();
  },2000);

}

$(document).ready(function(){

    function blockUI() {
        $.blockUI({ message: 'Gathering all the statistics goodness - please wait'});
        setTimeout($.unblockUI, 2000);
     }

    blockUI();

    var playerMap = new Object();
    var yearList = [2013, 2014, 2015, 2016, 2017, 2018, 2019,2020, 2021]
     for (var year = 0; year < yearList.length; year++) {
        statisticYear = yearList[year];
        $.ajax({
            url: '../json/' + statisticYear + '/' + statisticYear + '_season_statistics.json', dataType: 'json', async: false, success: function(data) {
                 for (var i = 0; i < data.Statistics.length; i++) {
                    var playerName = data.Statistics[i].playerName;
                    accumulateStatistics(playerMap, 'Played', data.Statistics[i].gamesPlayed, playerName, statisticYear);
                    accumulateStatistics(playerMap, 'Won', data.Statistics[i].gamesWon, playerName, statisticYear);
                    accumulateStatistics(playerMap, 'Top3', data.Statistics[i].topThree, playerName, statisticYear);
                    accumulateStatistics(playerMap, 'Last', data.Statistics[i].luckyLast, playerName, statisticYear);
                    accumulateStatistics(playerMap, 'Hosted', data.Statistics[i].hosted, playerName, statisticYear);
                    accumulateStatistics(playerMap, 'Points', data.Statistics[i].totalPoints, playerName, statisticYear);
                 }
            }
        });
    };

    outputDonutData(playerMap, 2021);
    animateIn();

    $("#seasons").attr("selectedIndex", -1);

     $("#seasons").change(function() {
        blockUI();

        var season = $("#seasons option:selected").val();
          outputDonutData(playerMap, season)
          animateOut();
     });


     function outputDonutData(playerMap, season) {

          var playedDonutData = [];
          var wonDonutData = [];
          var topThreeDonutData = [];
//          var bountiesDonutData = [];
          var lastDonutData = [];
          var hostedDonutData = [];
          var pointsDonutData = [];

          wonDonutData.push(['Player', 'Won']);
          playedDonutData.push(['Player', 'Played']);
          topThreeDonutData.push(['Player', 'Top 3']);
//          bountiesDonutData.push(['Player', 'Bounties']);
          lastDonutData.push(['Player', 'Last']);
          hostedDonutData.push(['Player', 'Hosted']);
          pointsDonutData.push(['Player', 'Points']);

          // This puts the results into the the donut data maps based upon the selected season or all
          for (var player in playerMap) {
              if (player.substring(0,4) == season) {
                  if (player.substring(4,10) == "Played") {
                     playedDonutData.push([player.substring(11, player.length), playerMap[player]]);
                  }
                  if (player.substring(4,7) == "Won") {
                     wonDonutData.push([player.substring(8, player.length), playerMap[player]]);
                  }
                  if (player.substring(4,10) == "Points") {
                     pointsDonutData.push([player.substring(11, player.length), playerMap[player]]);
                  }
                  if (player.substring(4,8) == "Top3") {
                     topThreeDonutData.push([player.substring(9, player.length), playerMap[player]]);
                  }
//                  if (player.substring(4,10) == "Bounty") {
//                     bountiesDonutData.push([player.substring(11, player.length), playerMap[player]]);
//                  }
                  if (player.substring(4,10) == "Hosted") {
                     hostedDonutData.push([player.substring(11, player.length), playerMap[player]]);
                  }
                  if (player.substring(4,8) == "Last") {
                     lastDonutData.push([player.substring(9, player.length), playerMap[player]]);
                  }
              }
          }

          drawDonutChart(wonDonutData, "Won", "wonDonutChart");
          drawDonutChart(playedDonutData, "Played", "playedDonutChart");
          drawDonutChart(pointsDonutData, "Total Points", "pointsDonutChart");
          drawDonutChart(topThreeDonutData, "Top 3", "topThreeDonutChart");
//          drawDonutChart(bountiesDonutData, "Bounties", "bountiesDonutChart");
          drawDonutChart(hostedDonutData, "Hosted", "hostedDonutChart");
          drawDonutChart(lastDonutData, "Lucky last", "lastDonutChart");
     }

     function formatName(player) {
         var initial = player.substring(0,1).toUpperCase();
         var playerName = initial + player.substring(1, player.length - 1);
         if (playerName == "Mark") {
             playerName += " " + player.substring(player.length - 1, player.length);
         }
         return playerName
    }

    function accumulateStatistics (playerMap, statisticType, value, playerName, season) {

        if (playerMap['All ' + statisticType + ':' + playerName] !== undefined) {
            playerMap['All ' + statisticType + ':' + playerName] = parseInt(playerMap['All ' + statisticType + ':' + playerName]) + value;
        } else {
            playerMap['All ' + statisticType + ':' +  playerName] = value;
        }
        if (playerMap[season + statisticType + ':' + playerName] !== undefined) {
            playerMap[season + statisticType + ':' + playerName] = parseInt(playerMap[season + statisticType + ':' + playerName]) + value;
        } else {
            playerMap[season + statisticType + ':' + playerName] = value;
        }
    }
});
var playerEventPosition;
var season = $('meta[name="season"]').attr("content");

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
        $scope.displayTable = $scope.statistics.eventTables[$scope.eventId];
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

     //  Get news ticker item
        $http.get('../json/general/news-item.txt').success(function (data) {
          $scope.newsItem = data;
        });
});

function populateDetailsFromJson ($scope, $http)  {
    var statistics = {};
    var eventTables = {};

    $http.get('../json/' + season + '/current-table.json').success(function (data) {
        noOfTourneys = data.length;
        playerEventPosition = calculatePlayerMovement(data);
        $scope.eventId = data.length;
        if ($scope.eventId == 1) {
            $scope.displayMovement = false;
        } else {
            $scope.displayMovement = true;
        }
        statistics.players = data[0]["event" + noOfTourneys];
        for (i = 0; i < noOfTourneys; i ++) {
             eventTables[i + 1] = data[noOfTourneys - 1 - i]["event" + (i + 1)];
             for (j = 0; j < eventTables[i + 1].length; j ++) {
                var movement = 0;
                if (i > 0) {
                     ladderMovement = getLadderMovement((i + 1) + ":" + eventTables[i + 1][j].name) -
                                getLadderMovement(i + ":" + eventTables[i + 1][j].name);
                     eventTables[i + 1][j].movement = ladderMovement;
                }
             }
             statistics.eventTables = eventTables;
         }
        $scope.displayTable = eventTables[noOfTourneys];
        getUrlsForPlayers(statistics.players, season);
        $scope.statistics = statistics;
        $scope.noOfTourneys = noOfTourneys;
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
       $scope.statistics.playerMenuDropdown = players;
    });


    $http.get('../json/' + season + '/form-table.json').success(function (data) {
            $scope.formTable = data;
            getUrlsForPlayers(data, season);
    });

    // Used for dropdown menus
    $http.get('../json/2014/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        statistics.events = data;
        getUrlForEvents(data);
    });

    $http.get('../json/2013/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        statistics.previousEvents = data;
        getUrlForEvents(data);
    });

    $http.get('../json/general/extras.json').success(function (data) {
       statistics.extras = data;
    });

    $scope.statistics = statistics;
}

function getUrlsForPlayers(players, year) {
    for (var i=0; i < players.length; i++) {
        var nameParts = players[i].name.split(" ");
        players[i].url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=' + year;
    }
}

function getUrlForEvents(events) {
    for (var i=0; i < events.length; i++) {
        var eventDate = events[i].eventDate
        events[i].url =  "../events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
    }
}

function getLadderMovement(playerEvent) {
    return playerEventPosition[playerEvent];
}

function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

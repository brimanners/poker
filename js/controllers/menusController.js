//var test = angular.module('poker', []);

app.controller('menusController', ['$scope', '$http', function($scope, $http) {

   var statistics = {};

   $http.get('../json/general/players.json').success(function (data) {
          var players = [];
          var nationality = {};
          for (i = 0; i < data.length; i++) {
              for (j = 0; j < data[i].players.length; j++) {
                  var player = {};
                  var playerNationality = [];
                  player.name = data[i].players[j].name;
                  player.year = data[i].year;
                  var nameParts = player.name.split(" ");
                  player.url = "../players/player.html?name=" + nameParts[0].toLowerCase() + nameParts[1] + '&year=' + data[i].year;
                  players.push(player);
                  nationality[player.name] = data[i].players[j].Nationality;
                  playerNationality.push(nationality);
              }
         }
         $scope.playerNationality = playerNationality;
         $scope.statistics.playerMenuDropdown = players;
      });
}]);
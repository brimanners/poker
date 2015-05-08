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
     var blah = "";
  });

   $http.get('../json/2015/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       getUrlForEvents(data);
       $scope.statistics.events = data;
   });

    $http.get('../json/2014/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       getUrlForEvents(data);
       $scope.statistics.CCXIV_Events = data;
   });

   $http.get('../json/2013/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       getUrlForEvents(data);
       $scope.statistics.CCXIII_Events = data;
   });

   $http.get('../json/general/extras.json').success(function (data) {
      $scope.statistics.extras = data;
   });

   function getUrlForEvents(events) {
       for (var i=0; i < events.length; i++) {
           var eventDate = events[i].eventDate
           events[i].url =  "../events/" + eventDate.substring(6) + eventDate.substring(3,5) + eventDate.substring(0,2) + ".html";
       }
   }
}]);
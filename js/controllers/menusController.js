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

  $http.get('../json/2013/event-history.json').success(function (data) {
         for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
             data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
         }
         getUrlForEvents2(data);
         $scope.statistics.CCXIII_Events = data;
  });

  $http.get('../json/2014/event-history.json').success(function (data) {
         for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
             data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
         }
         getUrlForEvents2(data);
         $scope.statistics.CCXIV_Events = data;
     });

   $http.get('../json/2015/event-history.json').success(function (data) {
       for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
           data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
       }
       getUrlForEvents2(data);
       $scope.statistics.CCXV_Events = data;
   });

  $http.get('../json/2016/event-history.json').success(function (data) {
     for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
       data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
     }
     getUrlForEvents2(data);
     $scope.statistics.CCXVI_Events = data;
   });

   $http.get('../json/2017/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
          data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        getUrlForEvents2(data);
       $scope.statistics.CCXVII_Events = data;
   });

   $http.get('../json/2018/event-history.json').success(function (data) {
           for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
             data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
           }
           getUrlForEvents2(data);
           $scope.statistics.events = data;
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

   function getUrlForEvents2(events){
       for (var i=0; i < events.length; i++) {
          var eventDate = events[i].eventDate
          events[i].url =  "../events/event.html?event=" + events[i].no;
       }
   }

}]);

function menuRedirect(url) {
  var currentUrl = url.href;
  if (window.location.href.indexOf("/event.html#/") > -1) {
    window.location.href = url.href;
    window.location.reload(true);
  }
}
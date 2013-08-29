var eventModule = angular.module('event1', []);        // poker is the name of the ng-app on the template

eventModule.controller('event1-controller', function ($scope) {
      var results = {};         // create a model object that can be put on the scope later

      // This will eventually be either copied and pasted from Clojure app, or called directly when the clojure app is wrapped up into an uberjar and hosted?
      results.tournamentOne = [            // Doesn't seem to like numbers in the name?
                        {"forename":"Brian","surname":"M","points":14},
                        {"forename":"Ben","surname":"I","points":11},
                        {"forename":"Steve","surname":"W","points":8},
                        {"forename":"Dave","surname":"M","points":5},
                        {"forename":"Mark","surname":"L","points":4},
                        {"forename":"Paul","surname":"B","points":3},
                        {"forename":"Jade","surname":"W","points":2},
                        {"forename":"Michael","surname":"R","points":1}
                      ];

      results.tournamentTwo = [
                        {"forename":"Mark","surname":"L","points":14},
                        {"forename":"Ben","surname":"I","points":11},
                        {"forename":"Steve","surname":"W","points":8},
                        {"forename":"Dave","surname":"M","points":5},
                        {"forename":"Jade","surname":"W","points":4},
                        {"forename":"Paul","surname":"B","points":3},
                        {"forename":"Brian","surname":"M","points":2},
                        {"forename":"Michael","surname":"R","points":1}
                      ];

       results.ladder = [
                         {"won":0,"forename":"Steve","points":16,"surname":"W","average":8.0,"played":2},
                         {"won":0,"forename":"Dave","points":10,"surname":"M","average":5.0,"played":2},
                         {"won":1,"forename":"Brian","points":16,"surname":"M","average":8.0,"played":2},
                         {"won":0,"forename":"Michael","points":2,"surname":"R","average":1.0,"played":2},
                         {"won":0,"forename":"Jade","points":6,"surname":"W","average":3.0,"played":2},
                         {"won":0,"forename":"Ben","points":22,"surname":"I","average":11.0,"played":2},
                         {"won":0,"forename":"Paul","points":6,"surname":"B","average":3.0,"played":2},
                         {"won":1,"forename":"Mark","points":18,"surname":"L","average":9.0,"played":2},
                        ];

      $scope.results = results;

       //this function feel like they should be a in general util type area - need to work out scoping so all angular controller can see....
      $scope.positionSuffix = function(position) {
          switch (position) {
              case 1 : return "st"; break;
              case 2 : return "nd"; break;
              case 3 : return "rd"; break;
              default : return "th"; break;
          }
      }
   }
);
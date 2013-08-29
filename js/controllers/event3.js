var eventModule = angular.module('event3', []);        // poker is the name of the ng-app on the template

eventModule.controller('event3-controller', function ($scope) {
      var results = {};         // create a model object that can be put on the scope later

      // This will eventually be either copied and pasted from Clojure app, or called directly when the clojure app is wrapped up into an uberjar and hosted?
      results.tournamentOne = [            // Doesn't seem to like numbers in the name?
                        {"forename":"Jade","surname":"W","points":14},
                        {"forename":"Ben","surname":"I","points":11},
                        {"forename":"Paul","surname":"B","points":8},
                        {"forename":"Steve","surname":"W","points":5},
                        {"forename":"Dave","surname":"M","points":4},
                        {"forename":"Brian","surname":"M","points":3},
                        {"forename":"Mark","surname":"V","points":2},
                        {"forename":"Simon","surname":"M","points":1}
                      ];

      results.tournamentTwo = [
                        {"forename":"Simon","surname":"M","points":14},
                        {"forename":"Paul","surname":"B","points":11},
                        {"forename":"Ben","surname":"I","points":8},
                        {"forename":"Mark","surname":"V","points":5},
                        {"forename":"Brian","surname":"M","points":4},
                        {"forename":"Dave","surname":"M","points":3},
                        {"forename":"Steve","surname":"W","points":2},
                        {"forename":"Jade","surname":"W","points":1}
                      ];

       results.ladder = [
                         {"won":0,"forename":"Steve","points":29,"surname":"W","average":4.8,"played":6},
                         {"won":0,"forename":"Dave","points":17,"surname":"M","average":4.3,"played":4},
                         {"won":1,"forename":"Brian","points":31,"surname":"M","average":5.2,"played":6},
                         {"won":0,"forename":"Michael","points":2,"surname":"R","average":1.0,"played":2},
                         {"won":1,"forename":"Jade","points":31,"surname":"W","average":5.2,"played":6},
                         {"won":0,"forename":"Ben","points":49,"surname":"I","average":8.2,"played":6},
                         {"won":0,"forename":"Paul","points":29,"surname":"B","average":4.8,"played":6},
                         {"won":1,"forename":"Mark","points":18,"surname":"L","average":9.0,"played":2},
                         {"won":2,"forename":"Mark","points":25,"surname":"V","average":6.3,"played":4},
                         {"won":1,"forename":"Simon","points":15,"surname":"M","average":7.5,"played":2}
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
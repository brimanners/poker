var eventModule = angular.module('event2', []);        // poker is the name of the ng-app on the template

eventModule.controller('event2-controller', function ($scope) {
      var results = {};         // create a model object that can be put on the scope later

      // This will eventually be either copied and pasted from Clojure app, or called directly when the clojure app is wrapped up into an uberjar and hosted?
      results.tournamentOne = [            // Doesn't seem to like numbers in the name?
                        {"forename":"Mark","surname":"V","points":9},
                        {"forename":"Ben","surname":"I","points":7},
                        {"forename":"Brian","surname":"M","points":5},
                        {"forename":"Jade","surname":"W","points":3},
                        {"forename":"Paul","surname":"B","points":2},
                        {"forename":"Steve","surname":"W","points":1}
                      ];

      results.tournamentTwo = [
                        {"forename":"Mark","surname":"V","points":9},
                        {"forename":"Jade","surname":"W","points":7},
                        {"forename":"Steve","surname":"W","points":5},
                        {"forename":"Brian","surname":"M","points":3},
                        {"forename":"Paul","surname":"B","points":2},
                        {"forename":"Ben","surname":"I","points":1},
                      ];

       results.ladder = [
                         {"won":0,"forename":"Steve","points":22,"surname":"W","average":5.5,"played":4},
                         {"won":0,"forename":"Dave","points":10,"surname":"M","average":5.0,"played":2},
                         {"won":1,"forename":"Brian","points":24,"surname":"M","average":6.0,"played":4},
                         {"won":0,"forename":"Michael","points":2,"surname":"R","average":1.0,"played":2},
                         {"won":0,"forename":"Jade","points":16,"surname":"W","average":4.0,"played":4},
                         {"won":0,"forename":"Ben","points":30,"surname":"I","average":7.5,"played":4},
                         {"won":0,"forename":"Paul","points":10,"surname":"B","average":2.5,"played":4},
                         {"won":1,"forename":"Mark","points":18,"surname":"L","average":9.0,"played":2},
                         {"won":2,"forename":"Mark","points":18,"surname":"V","average":9.0,"played":2}
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
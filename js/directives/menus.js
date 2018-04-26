app.directive('menus', function($compile) {
  return {
    restrict: 'E',
    templateUrl: '../templates/menus.html'
  };
});

window.onload = function() {
  var elevator = new Elevator({
    element: document.querySelector('.elevator-button'),
    mainAudio: '../music/elevator.mp3',
    endAudio: '../music/ding.mp3'
  });
}
$(document).ready(function() {

    setTimeout (function () {
        var $element = $('#news');
        $element.animate({ opacity: 0 },1000).animate({ opacity: 1},1000);
        $element.animate({ opacity: 0 },1000).animate({ opacity: 1},1000);
        $element.animate({ opacity: 0 },1000).animate({ opacity: 1},1000);
    },3000);

   setTimeout (function () {
        $('#newsTicker').removeClass('hidden').addClass('animated bounceInRight')
   },1000);

   setTimeout (function () {
      $('#countdown-text').removeClass('hidden').addClass('animated bounceInLeft')
   },2000);

   setTimeout (function () {
      $('#countdown-holder').addClass('animated swing')
   },3000);

   setTimeout (function () {
         $('#countdown-holder').removeClass('animated swing')
   },4000);

   setTimeout (function () {
            $('#countdown-holder').addClass('animated swing')
   },4500);

   setTimeout (function () {
            $('#countdown-holder').removeClass('animated swing')
      },5500);

  setTimeout (function () {
           $('#countdown-holder').addClass('animated swing')
  },6000);

//countdown-holder

   setTimeout (function () {
        $('#nextEvent').removeClass('animated wobble');
   },8000);

   setTimeout (function () {
        $('#nextEvent').addClass('animated wobble');
   },8100);

});

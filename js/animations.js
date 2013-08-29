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
        $('#nextEvent').addClass('animated wobble')
   },4000);

   setTimeout (function () {
        $('#nextEvent').removeClass('animated wobble');
   },6000);

   setTimeout (function () {
        $('#nextEvent').addClass('animated wobble');
   },6100);

   setTimeout (function () {
        $('#nextEvent').removeClass('animated wobble');
   },8000);

   setTimeout (function () {
        $('#nextEvent').addClass('animated wobble');
   },8100);

});

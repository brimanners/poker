$(document).ready(function() {
   var startInterval = 1;
   var interval = startInterval;
   var timeOutInterval = 200;
   var animation = "animated rollIn";
//   var animation = "animated lightSpeedIn";

   setTimeout (function () {
        $('#level1').removeClass('invisible').addClass(animation);
   },interval);

   interval = interval + timeOutInterval;
   setTimeout (function () {
           $('#level2').removeClass('invisible').addClass(animation);
   },interval);

   interval = interval + timeOutInterval;
   setTimeout (function () {
              $('#level3').removeClass('invisible').addClass(animation);
   },interval);

    interval = interval + timeOutInterval;
   setTimeout (function () {
             $('#level4').removeClass('invisible').addClass(animation);
   },interval);

   interval = interval + timeOutInterval;
   setTimeout (function () {
                $('#level5').removeClass('invisible').addClass(animation);
     },interval);

   interval = interval + timeOutInterval;
   setTimeout (function () {
               $('#level6').removeClass('invisible').addClass(animation);
    },interval);

   interval = interval + timeOutInterval;
   setTimeout (function () {
        $('#level7').removeClass('invisible').addClass(animation);
   },interval);

   interval = interval + timeOutInterval;
   setTimeout (function () {
        $('#level8').removeClass('invisible').addClass(animation);
    },interval);

   interval = interval + timeOutInterval;
    setTimeout (function () {
        $('#level9').removeClass('invisible').addClass(animation);
    },interval);

    interval = interval + timeOutInterval;
    setTimeout (function () {
        $('#level10').removeClass('invisible').addClass(animation);
    },interval);

    interval = interval + timeOutInterval;
        setTimeout (function () {
            $('#level11').removeClass('invisible').addClass(animation);
        },interval);

    interval = interval + timeOutInterval;
        setTimeout (function () {
            $('#level12').removeClass('invisible').addClass(animation);
        },interval);

    interval = interval + timeOutInterval;
        setTimeout (function () {
            $('#level13').removeClass('invisible').addClass(animation);
        },interval);

    interval = interval + timeOutInterval;
        setTimeout (function () {
            $('#level14').removeClass('invisible').addClass(animation);
        },interval);

    interval = interval + timeOutInterval;
        setTimeout (function () {
            $('#level15').removeClass('invisible').addClass(animation);
        },interval);
});

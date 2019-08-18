$(function () {
    $('#container').highcharts({
        title: {
            text: 'Accumulated points',
            x: -20 //center
        },
        xAxis: {
            title: {
                        text: 'Event Number'
                    },
            categories: ['1', '2', '3', '4', '5', '6']
        },
        yAxis: {
            title: {
                text: 'Points'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'points'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{name: 'Ben I',
                 data: [3, 7, 10, 10]
                },
                {
                 name: 'Steve W',
                 data: [6, 6, 10, 10]
                },
                {
                 name: 'Brian M',
                 data: [10, 19, 33, 47]
                },
                {
                 name: 'Simon W',
                 data: [8, 8, 19, 19]
                },
                {
                 name: 'Mark V',
                 data: [2, 14, 15, 18]
                },
               {
                name: 'Carlos',
                data: [4, 7, 9, 14]
               },
               {
                name: 'Jade',
                data: [1, 1, 6, 7]
               },
               {
                name: 'Dave',
                data: [0, 18, 26, 37]
               },
               {
                name: 'Andrew F',
                data: [0, 15, 15, 17]
               },
               {
                name: 'Paul B',
                data: [0, 6, 6, 6]
               },
               {
                name: 'Michael',
                data: [0, 5, 5, 9]
               },
               {
                name: 'Mark L',
                data: [0, 2, 2, 2]
               }
               ,
              {
               name: 'Andrew L',
               data: [0, 1, 1, 1]
              },
              {
                 name: 'Maan A',
                 data: [0, 0, 0, 8]
                }
               ]
    });
});


/**
* Grid-light theme for Highcharts JS
* @author Torstein Honsi
*/

// Load the fonts
Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Dosis:400,600',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: null,
      style: {
         fontFamily: "Dosis, sans-serif"
      }
   },
   title: {
      style: {
         fontSize: '16px',
         fontWeight: 'bold',
         textTransform: 'uppercase'
      }
   },
   tooltip: {
      borderWidth: 0,
      backgroundColor: 'rgba(219,219,216,0.8)',
      shadow: false
   },
   legend: {
      itemStyle: {
         fontWeight: 'bold',
         fontSize: '13px'
      }
   },
   xAxis: {
      gridLineWidth: 1,
      labels: {
         style: {
            fontSize: '12px'
         }
      }
   },
   yAxis: {
      minorTickInterval: 'auto',
      title: {
         style: {
            textTransform: 'uppercase'
         }
      },
      labels: {
         style: {
            fontSize: '12px'
         }
      }
   },
   plotOptions: {
      candlestick: {
         lineColor: '#404048'
      }
   },


   // General
   background2: '#F0F0EA'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

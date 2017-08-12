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
            categories: ['1', '2', '3', '4', '5']
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
                 data: [10, 21, 21, 31]
                }, {
                 name: 'Junior A',
                 data: [8, 8, 8, 8]
                },
                {
                 name: 'Steve W',
                 data: [6, 11, 21, 21]
                },
                {
                 name: 'Jade W',
                 data: [4, 5, 7, 7]
                },
                {
                 name: 'Andy F',
                 data: [3, 17, 17, 19]
                },
                {
                 name: 'Carlos P',
                 data: [2, 2, 10, 10]
                },
                {
                 name: 'Brian M',
                 data: [1, 18, 21, 27]
                },
                {
                 name: 'Dave M',
                 data: [0, 8, 12, 12]
                },
                {
                 name: 'Simon W',
                 data: [0, 4, 10, 11]
                },
                {
                 name: 'Michael R',
                 data: [0, 3, 3, 7]
                },
                {
                 name: 'Mark V',
                 data: [0, 2, 3, 6]
                },
                {
                 name: 'Mark L',
                 data: [0, 0, 0, 8]
                }],

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

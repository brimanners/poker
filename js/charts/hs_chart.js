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
        series: [{
            name: 'Brian M',
            data: [8, 16, 30, 33, 50, 53, 61]
        }, {
            name: 'Ben I',
            data: [6, 10, 14, 28, 36, 40, 44]
        }, {
            name: 'Dave M',
            data: [0, 2, 13, 13, 24, 30, 30]
        }, {
            name: 'Mark L',
            data: [0, 0, 8, 19, 19, 19, 19]
        }, {
            name: 'Mark V',
            data: [1, 11, 16, 18, 19, 19, 19]
        }, {
             name: 'Simon W',
             data: [0, 0, 2, 2, 16, 16, 18]
        }, {
             name: 'Jade W',
             data: [0, 6, 7, 12, 15, 30, 30]
        }, {
            name: 'Steve W',
            data: [4, 4, 12, 12, 12, 21, 21]
        }, {
             name: 'Junior A',
             data: [0, 0, 3, 3, 8, 26, 32]
        }, {
            name: 'Paul B',
            data: [0, 0, 0, 4, 8, 13, 13]
        },{
            name: 'Andy F',
            data: [2, 3, 3, 4, 4, 6, 6]
        }, {
            name: 'Simon M',
            data: [0, 3, 3, 3, 3, 3, 3]
         }, {
             name: 'Carlos P',
             data: [0, 0, 0, 0, 2, 14, 15]
          }
          , {
           name: 'Michael R',
           data: [0, 0, 0, 0, 0, 1, 1]
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

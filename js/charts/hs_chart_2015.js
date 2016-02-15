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
                    name: 'Ben I',
                    data: [14, 18, 26, 33, 47, 59, 68, 71]
                }, {
                    name: 'Simon W',
                    data: [11, 16, 16, 35, 36, 41, 45]
                }, {
                    name: 'Paul B',
                    data: [8, 10, 10, 20, 25, 40, 44, 44]
                }, {
                    name: 'Steve W',
                    data: [5, 5, 10, 16, 27, 45, 63, 71]
                }, {
                    name: 'Dave M',
                    data: [4, 16, 17, 21, 21, 27, 32, 32]
                },
                {
                    name: 'Mark L',
                    data: [3, 21, 21, 34, 38, 38, 40, 40]
                },
                {
                    name: 'Mark V',
                    data: [2, 17, 17, 20, 23, 25, 26, 26]
                },
                {
                    name: 'Brian M',
                    data: [0, 6, 9, 25, 33, 42, 57, 59]
                },
                {
                    name: 'Andy F',
                    data: [0, 9, 9, 10, 10, 11, 11, 11]
                },
                {
                    name: 'Junior A',
                    data: [0, 3, 7, 7, 7, 7, 17]
                },
                {
                    name: 'Jade W',
                    data: [0, 1, 15, 17, 19, 22, 28, 29]
                },
                {
                    name: 'Craig X',
                    data: [1, 1, 1, 1, 1, 1, 1]
                },
                {
                    name: 'Carlos X',
                    data: [0, 0, 2, 2, 19, 23, 26, 32]
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

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
                 data: [8, 14, 18, 19, 25]
                },
                {
                 name: 'Steve W',
                 data: [1, 6, 6, 6, 6]
                },
                {
                 name: 'Brian M',
                 data: [11, 29, 46, 52, 56]
                },
                {
                 name: 'Dave M',
                 data: [4, 19, 24, 27, 29]
                },
                {
                 name: 'Simon W',
                 data: [14, 26, 26, 26, 26]
                },
                {
                 name: 'Michael R',
                 data: [2, 7, 10, 18, 18]
                },
                {
                 name: 'Mark V',
                 data: [5, 5, 19, 23, 23]
                },
                {
                 name: 'Mark L',
                 data: [1, 10, 10, 12, 12]
                },
               {
                name: 'Carlos',
                data: [0, 2, 2, 2, 2]
               },
                {
                 name: 'Paul B',
                 data: [0, 4, 15, 15, 16]
                },
               {
                name: 'Andy F',
                data: [0, 1, 2, 2, 2]
               },
               {
                name: 'Andrew L',
                data: [0, 0, 0, 10, 10]
               },
               {
                 name: 'Kevin H',
                 data: [0, 0, 2, 2]
               }]
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

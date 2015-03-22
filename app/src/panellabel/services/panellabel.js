'use strict';

angular.module('inovniReportApp')
  .factory('InfochartDataAvailable', function () {

    var db = {
        elements: {
            data: null
        },
        chart: null
    };

    var getDataElements = function(){

        var data = [

            {
                id: 'IC_EL_DATA-total-annual-client',
                column: 'total-annual-client',
                title: 'Total Annual Client',
                value: '700.000.000.00',
                category: 'group1',
                visible: true
            },
            {
                id: 'IC_EL_DATA-percentage-client-by-month',
                column: 'percentage-client-by-month',
                title: 'Percentage Client By Month',
                value: '28.7%',
                category: 'group2',
                visible: true
            },
            {
                id: 'IC_EL_DATA-biggest-client',
                column: 'biggest-client',
                title: 'Biggest Client',
                value: 'MC Donalds',
                category: 'group3',
                visible: true
            }

        ];

        return data;

    }

    var getChart = function(){

        var chart = [

            {
                name:'Basic line',
                categorized: true
            },
            {
                name:'Basic area',
                categorized: true
            },
            {
                name:'Pie chart',
                categorized: true
            }

        ];

        return chart;

    }

    // Public API here
    return {
        getData: function () {

            db.elements.data = getDataElements();
            db.chart = getChart();

            return db;
        }
    };
  });

'use strict';

angular.module('inovniReportApp')
  .factory('InfochartData', ['InfochartSettings', 'localStorageService', function (InfochartSettings, localStorageService) {

    var db = {
        parameters: {
            dgId: null,
            axis: null,
            column: null,
            row: null
        },
        sections: null,
        dataGrid: null,
        chartDataGrid: null,
        databaseLabels: null
    };

    var getSections = function(){

        var sections = [
            {
                id: 'IC_SEC-Example01',
                visible: true,
                svg: {
                    initial: 'image1.svg',
                    current: null
                }
            },
            {
                id: 'IC_SEC-Example02',
                visible: true,
                svg: {
                    initial: 'image2.svg',
                    current: null
                }
            },
            {
                id: 'IC_SEC-Example03',
                visible: true,
                svg: {
                    initial: 'image3.svg',
                    current: null
                }
            },
            {
                id: 'IC_SEC-Example04',
                visible: true,
                svg: {
                    initial: 'image4.svg',
                    current: null
                }
            }
        ];

        return sections;

    };

    var getDataGrid = function(){
        return null;
    };

    var getParameters = function(){

        var ret = {
            dgId: null,
            axis: null,
            column: null,
            row: null
        }

        return ret;
    };

    var getChartDataGrid = function(){

    };

    var getDatabaseLabels = function(){

    };

    var getDBCache = function(key){

        var cacheDB = localStorageService.get('db');
        return cacheDB[key];

    };

    var setDefaultDataGrid = function(column, row){

        var column = (column == undefined) ? parseInt(InfochartSettings.dataGrid.minColumns) : parseInt(column);
        var row = (row == undefined) ? parseInt(InfochartSettings.dataGrid.minRows) : parseInt(row);

        var matrix = new Array(row);

        for (var i = 0; i < row; i++) {
           matrix[i] = new Array(column);
        }

        for (var i = 0; i < matrix.length; i++){
           for (var j = 0; j < matrix[i].length; j++){
              matrix[i][j] = {value: '', checked: false};
           }
        }

        return matrix;

    };

    var setDBCache = function(key){

        if (localStorageService.get('db') == null) {

            var dbCopy = angular.copy(db);

            for(var index in dbCopy){
                dbCopy[index] = null;
            }

            localStorageService.set('db', dbCopy);

        }

        var cacheDB = localStorageService.get('db');
        cacheDB[key] = db[key];
        localStorageService.set('db', cacheDB);

    };

    var isDBCached = function(key){

        var ret = false;

        if (key == undefined) {
            return (localStorageService.get('db') != null) ? true : false;
        };

        if (localStorageService.get('db') != null) {

            if (localStorageService.get('db')[key] != null) {
                ret = true;
            }else{
                ret = false;
            }

        }else{
            ret = false;
        }

        return ret;

    };

    // Public API here
    return {

        svgXml: null,
        getDatabase: function () {

            db.sections = isDBCached('sections') ? getDBCache('sections') : getSections();
            db.dataGrid = isDBCached('dataGrid') ? getDBCache('dataGrid') : getDataGrid();
            db.parameters = isDBCached('parameters') ? getDBCache('parameters') : getParameters();

            return db;

        },
        generateDataGrid: function(column, row){

            if (isDBCached('dataGrid')) {
                db.dataGrid = getDBCache('dataGrid') == null ? setDefaultDataGrid(column, row) : getDBCache('dataGrid');
            }else{
                db.dataGrid = setDefaultDataGrid(column, row);
            }

            return db.dataGrid;

        },
        setSVGChanges: function(SVGId){

            var ret = false;

            if (SVGId == undefined || SVGId == '') {return false};
            if (this.svgXml == null || this.svgXml == '') {return false};
            if (db.sections.length == 0) {return false};

            var arrIdx = db.sections.map(function(e){return e.id}).indexOf(SVGId);

            if (arrIdx != -1) {
                db.sections[arrIdx].svg.current = this.svgXml;
                ret = true;
            };

            return ret;

        },
        getCacheSVGById: function(id){

            var ret = false;

            if (id == undefined || id == '') {return false};
            if (db.sections.length == 0) {return false};

            var arrIdx = db.sections.map(function(e){return e.id}).indexOf(id);

            if (arrIdx != -1) {

                if (db.sections[arrIdx].svg.current != null && db.sections[arrIdx].svg.current != '') {
                    this.svgXml = db.sections[arrIdx].svg.current;
                    ret = true;
                }else{
                    ret = false;
                }

            }else{
                ret = false;
            }

            return ret;

        },
        createCache: function(key){
            setDBCache(key);
        },
        setDBParameter: function(key, value){
            db.parameters[key] = value;
        },
        isSectionsCached: function(){
            return isDBCached('sections');
        },
        // updateDatagrid: function(arr){

        //     // ex: arr = {key: 'var', value: 'test 1'}

        //     var dataGrid = this.getDatabase().dataGrid;
        //     //InfochartStatus.get().dgrid.axis



        //     for (var i = 0; i < arr.length; i++){
        //         dataGrid[i][0].value = arr[i].key;
        //         dataGrid[i][1].value = arr[i].value;
        //     }


        //     for (var i = 0; i < dataGrid.length; i++){

        //        for (var j = 0; j < dataGrid[i].length; j++){

        //             if ( i <= (arr.length-1) && j <= (arr.length-1) ) {

        //                 if (j==0) {
        //                     dataGrid[i][j].value = arr[j].key;
        //                 }else{
        //                     dataGrid[i][j].value = arr[j].value;
        //                 }

        //             };

        //        }
        //     }

        // },
        isDataGridCached: function(){

            if (isDBCached('dataGrid')) {

                // check if a minimum cells are at least filled up
                if (getDBCache('dataGrid')[0][0].value != '') {

                    if (getDBCache('dataGrid')[1][0].value != '' || getDBCache('dataGrid')[0][1].value != '') {
                        return true;
                    }else{
                        return false;
                    }

                }else{
                    return false;
                }

            }else{
                return false;
            }


        }

    };

  }]);

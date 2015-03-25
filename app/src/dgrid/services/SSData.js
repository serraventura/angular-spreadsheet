'use strict';

angular.module('angularSpreadsheetApp')
  .factory('SSData', ['SSSettings', 'localStorageService', function (SSSettings, localStorageService) {

    var db = {
        parameters: {
            dgId: null,
            axis: null,
            column: null,
            row: null
        },
        dataGrid: null
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

    var getDBCache = function(key){

        var cacheDB = localStorageService.get('db');
        return cacheDB[key];

    };

    var setDefaultDataGrid = function(column, row){

        var column = (column == undefined) ? parseInt(SSSettings.dataGrid.minColumns) : parseInt(column);
        var row = (row == undefined) ? parseInt(SSSettings.dataGrid.minRows) : parseInt(row);

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

        getDatabase: function () {

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
        createCache: function(key){
            setDBCache(key);
        },
        setDBParameter: function(key, value){
            db.parameters[key] = value;
        },
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

'use strict';

angular.module('angularSpreadsheetApp')
  .service('SSStatus', ['SSSettings', 'Util', function SSStatus(SSSettings, Util) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var th = this;

  	this.appStatus = {

        dgrid:{
            _pIGID: null,
            _dgId: SSSettings.dataGrid._dgId,
            axis: SSSettings.dataGrid.axis,
            column: null,//SSSettings.dataGrid.minColumns,
            row: null//SSSettings.dataGrid.minRows
        }

  	};

    this.setAppStatus = {

        dgrid:{
            _dgId: function(id){
                th.appStatus.dgrid._dgId = id;
            },
            axis: function(axis){
                th.appStatus.dgrid.axis = axis;
            },
            column: function(num){
                th.appStatus.dgrid.column = num;
            },
            row: function(num){
              	th.appStatus.dgrid.row = num;
            }
        },

    };

  	// Status
  	this.get = function(){
  	  	return this.appStatus;
  	};

    // Status
    this.set = function(){
        return this.setAppStatus;
    };

    this.loadInitialConfig = function(db){

        var IGID = Util.url.parameter('_IGID_');

        this.appStatus.dgrid._pIGID = (IGID != null) ? parseInt(IGID) : IGID;
        this.appStatus.dgrid._dgId = (db.parameters.dgId == null) ? SSSettings.dataGrid._dgId : db.parameters.dgId;
        this.appStatus.dgrid.axis = (db.parameters.axis == null) ? SSSettings.dataGrid.axis : db.parameters.axis;
        this.appStatus.dgrid.column = (db.parameters.column == null) ? this.appStatus.dgrid.column : db.parameters.column;
        this.appStatus.dgrid.row = (db.parameters.row == null) ? this.appStatus.dgrid.row : db.parameters.row;

    };

	// ####################################

  }]);

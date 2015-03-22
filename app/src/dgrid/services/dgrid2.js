'use strict';

angular.module('inovniReportApp')
  .service('InfochartStatus', ['InfochartSettings', 'Util', function InfochartStatus(InfochartSettings, Util) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var th = this;

  	this.appStatus = {

  		menu:{
  			right:{
	  			activeOption: 'text'
  			},
  			left:{

  			}
  		},
  		section:{
			selectedSectionId: null,
            quantity: null
  		},
  		svg:{
  			elements:{
  				latestPositionY: null,
  				latestPositionX: 20,
                text: []
  			},
            latestSVGChangedId: null,
            isAllSVGDone: false
  		},
        dgrid:{
            _pIGID: null,
            _dgId: InfochartSettings.dataGrid._dgId,
            axis: InfochartSettings.dataGrid.axis,
            column: null,//InfochartSettings.dataGrid.minColumns,
            row: null//InfochartSettings.dataGrid.minRows
        },
        propertyPanel:{
            active: false
        }

  	};


    this.setAppStatus = {

        menu:{
            right:{
                activeOption: function(menu){
                    th.appStatus.menu.right.activeOption = menu.id;
                }
            },
            left:{

            }
        },
        section:{
            selectedSectionId: function(sectionId){
                th.appStatus.section.selectedSectionId = sectionId;
            },
            quantity: function(num){
                th.appStatus.section.quantity = num;
            }
        },
        svg:{
            elements:{
                latestPositionY: function(value){
                    th.appStatus.svg.elements.latestPositionY = value;
                },
                latestPositionX: function(value){
                    th.appStatus.svg.elements.latestPositionX = value;
                },
                text: function(arrText){
                    th.appStatus.svg.elements.text.push(arrText);
                }
            },
            latestSVGChangedId: function(id){
                th.appStatus.svg.latestSVGChangedId = id;
            },
            isAllSVGDone: function(bool){
                th.appStatus.svg.isAllSVGDone = bool;
            }
        },
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
        propertyPanel:{
            active: function(arg){
                th.appStatus.propertyPanel.active = arg;
            }
        }

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
        this.appStatus.dgrid._dgId = (db.parameters.dgId == null) ? InfochartSettings.dataGrid._dgId : db.parameters.dgId;
        this.appStatus.dgrid.axis = (db.parameters.axis == null) ? InfochartSettings.dataGrid.axis : db.parameters.axis;
        this.appStatus.dgrid.column = (db.parameters.column == null) ? this.appStatus.dgrid.column : db.parameters.column;
        this.appStatus.dgrid.row = (db.parameters.row == null) ? this.appStatus.dgrid.row : db.parameters.row;

        this.appStatus.section.selectedSectionId = db.sections[0].id;

    };

	// ####################################

  }]);

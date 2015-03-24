'use strict';

angular.module('angularSpreadsheetApp')
  .directive('dGrid', function (SSData, SSStatus, SSSettings, $interval, $timeout) {
    return {

      templateUrl: 'src/dgrid/views/dgrid.html',
      restrict: 'E',
      controller: 'DgridCtrl',
      link: function postLink(scope, element, attrs) {

        var longContentChecked = null;
        var longContentIndex = null;
        var maxIntervalColumnLoad = 5;
        scope.maxIntervalRowLoad = 5;

        var isDataGridCached = SSData.isDataGridCached();

        var attrCol = (attrs.column == "") ? SSSettings.dataGrid.minColumns : parseInt(attrs.column);
        var attrRow = (attrs.row == "") ? SSSettings.dataGrid.minRows : parseInt(attrs.row);

        var col = (SSStatus.get().dgrid.column == null) ? attrCol : SSStatus.get().dgrid.column;
        var row = (SSStatus.get().dgrid.row == null) ? attrRow : SSStatus.get().dgrid.row;

        var dgid = (SSStatus.get().dgrid._pIGID == null) ? SSStatus.get().dgrid._dgId : SSStatus.get().dgrid._pIGID;

        function getTotalColumn(num){
            return new Array(parseInt(num));
        };

        function simulateTypedContent(){

            if (!isDataGridCached) {

                var listAllValues = $('.dgrid > tbody > tr > td > input');

                listAllValues.each(function(i){

                    if (this.value != '' && this.value != undefined) {
                        angular.element(this).triggerHandler('input');
                    };

                });

            }

        };

        function loadSetup(){

            var rAxis = $('input:radio');
            var xAxis = $('#text-element input:radio:eq(0)');
            var yAxis = $('#text-element input:radio:eq(1)');

            // deal with axis highlight according to the axis saved
            rAxis.click( function(){
                highlightAxis();
            });

            if (SSStatus.get().dgrid.axis == 'x') {
                xAxis.trigger('click');
            }else if (SSStatus.get().dgrid.axis == 'y') {
                yAxis.trigger('click');
            };

            // trigger text element change in the SVG
            // all the text element will match the data DGRID
            $('#dgId').val(dgid);
            $('#btnDgId').trigger('click');

        };

        function highlightAxis(){

            var axis = SSStatus.get().dgrid.axis;
            var xEl = $('.dgrid > tbody > tr:eq(0) > td > input');
            var allEl = $('.dgrid > tbody > tr > td > input');

            if (axis == 'x') {

                allEl.removeClass('dgrid-variable');
                xEl.addClass('dgrid-variable');

            }else if (axis == 'y') {

                allEl.removeClass('dgrid-variable');

                $(".dgrid tr").each(function(){
                    $(this).find('td:eq(1) > input').addClass('dgrid-variable');
                });

            };

        };

        scope.isLongContent = function(idx){
            return longContentChecked && (longContentIndex == idx);
        };

        scope.adaptLongContent = function(e, idx){
            var textarea = $(e.target).next();

            if (textarea.val().length > 20) {
                longContentChecked = true;
                longContentIndex = idx;
            }else{
                longContentChecked = false;
                longContentIndex = null;
            }

        };

        scope.lazyLoadColoumn = function(index){
            if (index <= maxIntervalColumnLoad) {
                return true;
            }else{
                return false;
            }
        };

        scope.lazyLoadRow = function(index){
            if (index <= scope.maxIntervalRowLoad) {
                return true;
            }else{
                return false;
            }
        };

        scope.setAxis = function(axis){
            SSStatus.set().dgrid.axis(axis);
        };

        $interval(function(){

            maxIntervalColumnLoad = (maxIntervalColumnLoad + 5);

            if ( maxIntervalColumnLoad > parseInt(attrs.column) ) {
                highlightAxis();
            };

        }, 1000, (attrs.column/maxIntervalColumnLoad) );

        $interval(function(){

            scope.maxIntervalRowLoad = (scope.maxIntervalRowLoad + 5);

            if ( scope.maxIntervalRowLoad > parseInt(attrs.row) ) {
                highlightAxis();
            };

        }, 1000, (attrs.row/scope.maxIntervalRowLoad) );

        scope.dataGrid = SSData.generateDataGrid(col, row);
        scope.totalColumn = getTotalColumn(col);
        scope.axis = SSStatus.get().dgrid.axis;

        SSStatus.set().dgrid.column(col);
        SSStatus.set().dgrid.row(row);

loadSetup();
simulateTypedContent();




      }

    };
    
  });

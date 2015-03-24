'use strict';

angular.module('angularSpreadsheetApp')
  .directive('dgrid', function (SSData, SSStatus, SSSettings, $interval, $timeout) {
    return {

      templateUrl: 'src/dgrid/views/dgrid.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

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

        function DGRIDDataManagementByAxis(id, axis, arr, boolAll){

            /*
                DGRIDDataManagementByAxis(2, 'x', [], false); -- returns based on the X axis an especific line;
                DGRIDDataManagementByAxis(2, 'x', [], true); -- returns based on the X axis all lines with data;

                var array = SSStatus.get().svg.elements.text; // [{key: 'var', value: 'test 1'}]
                DGRIDDataManagementByAxis(2, 'x', array, false);
                -- Same behavior that the previous parameter, but in this case insert data in the DGRID.
            */

            var arrFinal = [];
            var isInsert = ((arr != undefined) && (arr.length > 0));

            if (boolAll == undefined) {boolAll = false};
            if (isInsert) {boolAll = false};

            if (axis == 'x') {

                var listOfVars = $('.dgrid > tbody > tr:eq(0) > td > input');
                var listOfValues = $('.dgrid > tbody > tr:eq(' + (id-1) + ') > td > input');
                var listAllValues = $('.dgrid > tbody > tr > td > input');

                listOfVars.each(function(i){

                    if (isInsert && i > arr.length) {return false};

                    if (isInsert && i <= (arr.length-1)) {
                        this.value = arr[i].id;
                    };

                    if (this.value != '') {
                        arrFinal.push({key: this.value, value: []});
                    };

                });

                if (boolAll) {

                    var c = 0;

                    listAllValues.each(function(i){

                        if (arrFinal.length == 0) {return false};

                        if (isInsert && i <= (arr.length-1)) {
                            this.value = arr[i].text;
                        };

                        if (this.value != '' && arrFinal[c].key != this.value) {
                            arrFinal[c].value.push(this.value);
                        };

                        c++;

                        if (c>=arrFinal.length) {c=0};

                    });

                }else{

                    listOfValues.each(function(i){

                        if (isInsert && i > arr.length) {return false};

                        if (isInsert && i <= (arr.length-1)) {
                            this.value = arr[i].text;
                        };

                        if (this.value != '' && i <= (arrFinal.length-1)) {
                            arrFinal[i].value.push(this.value);
                        };

                    });

                }



            }else if (axis == 'y') {

                var trListOfElements = $(".dgrid tr");
                var tdListOfElements = $(".dgrid td");

                trListOfElements.each(function(i){

                    if (isInsert && i > arr.length) {return false};

                    var inputEl = $(this).find('td:eq(1) > input');

                    if (isInsert && i <= arr.length && inputEl.val() != undefined) {
                        inputEl.val(arr[i-1].id);
                    };

                    if (inputEl.val() != '' && inputEl.val() != undefined) {
                        arrFinal.push({key: inputEl.val(), value: []});
                    };

                });

                if (boolAll) {

                    var c = 0;
                    var counterValues = 1;
                    var maxValues = 0;

                    $(".dgrid tr:eq(1) td input").each(function(){

                        if (this.value.length > 0) {
                            maxValues++;
                        };

                    });

                    tdListOfElements.each(function(i){

                        var allInputEl = $(this).find('input');

                        if (arrFinal.length == 0) {return false};

                        if (isInsert && i <= (arr.length-1)) {
                            allInputEl.val(arr[i].text);
                        };

                        if (allInputEl.val() != '' && allInputEl.val() != undefined && arrFinal[c].key != allInputEl.val() && i > 0) {

                            arrFinal[c].value.push(allInputEl.val());

                            //if (counterValues == arrFinal.length) {
                            if (counterValues == maxValues-1) {
                                c++;
                                counterValues = 1;
                            }else{
                                counterValues++;
                            }

                        };

                        if (c>=arrFinal.length) {
                            c=0;
                            return false;
                        };

                    });

                }else{

                    trListOfElements.each(function(i){

                        var inputEl = $(this).find('td:eq(' + (id) + ') > input');

                        if (isInsert && i > arr.length) {return false};

                        if (isInsert && i <= arr.length && inputEl.val() != undefined) {
                            inputEl.val(arr[i-1].text);
                        };

                        if (inputEl.val() != '' && i <= arrFinal.length && i > 0) {
                            arrFinal[i-1].value.push(inputEl.val());
                        };

                    });

                }

            }

            return arrFinal

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

        function updateSVGBySection(sectionName){

            var s = Snap('#'+sectionName);
            var elValue = $('#dgId').val();
            var arrDgrid = [];
            var axis = null;

            elValue = (elValue == '' || elValue == undefined) ? dgid : parseInt(elValue);
            SSStatus.set().dgrid._dgId(elValue);
            axis = SSStatus.get().dgrid.axis;

            arrDgrid = DGRIDDataManagementByAxis(elValue, axis); //getDataFromDgrid(elValue);

            s.selectAll('g > text').forEach(function(el){

                for (var i = arrDgrid.length - 1; i >= 0; i--) {
                    if (el.node.id.indexOf(arrDgrid[i].key+'@') != -1) {
                        el.node.textContent = arrDgrid[i].value;
                    }
                };

            });

        };

        function expandDGRIDRows(cols, plusRows){

            var arrCols = [];

            for (var i = 1; i <= cols; i++) {
                arrCols.push({value: '', checked: false});
            };

            for (var i = 1; i <= plusRows; i++) {
                scope.dataGrid.push(angular.copy(arrCols));
            };

        };

        function adaptDGRIDbyContent(){

            if (!isDataGridCached) {

                var svgTextEl = SSStatus.get().svg.elements.text;

                if (svgTextEl.length > col) {

                    SSStatus.set().dgrid.axis('y');

                    if (svgTextEl.length > row) {

                        // redefine dgrid adding the number of lines necessary
                        expandDGRIDRows( col, (svgTextEl.length-row) );

                    }

                }

            };

        };


        var longContentChecked = null;
        var longContentIndex = null;

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

        scope.applyDataToSVG = function(){

            var arrSections = this.sections;

            for (var i = 0; i < arrSections.length; i++) {
                updateSVGBySection('SVG-'+arrSections[i].id);
            };

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

        // watch
        scope.$watch(function() {
            //if all the SVGs content are loaded this watch will be triggered
            return SSStatus.get().svg.isAllSVGDone;
        }, function(newVal, oldVal) {

            if (newVal !== oldVal) {

                //resize DGRID if necessary
                adaptDGRIDbyContent();

                // wait the digest cicle finish
                $timeout(function(){

                    if (!isDataGridCached) {
                        //insert data from SVG into DGRID
                        DGRIDDataManagementByAxis(dgid, SSStatus.get().dgrid.axis, SSStatus.get().svg.elements.text);
                    };

                    loadSetup();
                    simulateTypedContent();

                }, 0, false);

            }

        }, false);


      }






    };
  });

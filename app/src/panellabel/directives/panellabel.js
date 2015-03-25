'use strict';

angular.module('angularSpreadsheetApp')
.directive('panelLabel', function (SSStatus) {
    return {
      templateUrl: 'src/panellabel/views/panellabel.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        function convertGridIdToPanel(id){
            return (id == null) ? id : (id-1);
        };

        var dgId = (SSStatus.get().dgrid._pIGID == null) ? SSStatus.get().dgrid._dgId : SSStatus.get().dgrid._pIGID;

        scope.dataGridId = convertGridIdToPanel(dgId);

        scope.getAxis = function(){
            return SSStatus.get().dgrid.axis;
        };

        scope.isElementDataGridEmpty = function(item){

            var ret = false;

            if (item == '') {
                ret = true;
            };

            if (SSStatus.get().dgrid._dgId == 0) {
                ret = true;
            };

            return ret;
        };

        // watch
        scope.$watch(function() {
            return SSStatus.get().dgrid._dgId;
        }, function(newVal, oldVal) {

            if (newVal !== oldVal) {
                scope.dataGridId = convertGridIdToPanel(SSStatus.get().dgrid._dgId);
            }

        }, false);


      }
    };
  });

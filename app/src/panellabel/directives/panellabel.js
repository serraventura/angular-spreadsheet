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

        scope.addElementToSection = function(dataElement, varDefined){

            var labelId = null;

            if (varDefined == undefined) {
                labelId = dataElement.id;
            }else{
                labelId = this.getAxis() == 'y' ? varDefined[0].value : varDefined.value;
                labelId = labelId+'@';
            }

            var sectionId = SSStatus.get().section.selectedSectionId;
            var latestPositionY = SSStatus.get().svg.elements.latestPositionY;
            var latestPositionX = SSStatus.get().svg.elements.latestPositionX;
            var yTop = 0;
            var yMargin = 20;
            var xMargin = 50;

            var s = Snap('#SVG-'+sectionId);
            var mainGroup = s.selectAll('g');

            if (mainGroup.length != 1) {
                console.log('SVG:', 'SVG format unexpected');
                return false;
            };

            var group = s.select('g');
            var yBottom = group.getBBox(true).y2;

            if (latestPositionY != null) {
                yTop = latestPositionY;
            }else{
                yTop = group.getBBox(true).y;
            }

            if ( (yTop+yMargin) >= yBottom) {

                latestPositionX = (latestPositionX+xMargin);
                yTop = (group.getBBox(true).y+yMargin);

            }else{
                yTop = (yTop+yMargin);
            }

            // keep status up to date
            SSStatus.set().svg.elements.latestPositionY(yTop);
            SSStatus.set().svg.elements.latestPositionX(latestPositionX);

            var t = s.text(latestPositionX, yTop, dataElement.value);

            labelId = '_DRAG_'+ labelId + t.id;

            t.attr({
                id: labelId,
                class: 'svg-text',
                style: 'cursor: move',
                'ng-click': 'openRightMenu(menu)'
            });

            s.select('g').append(t);

            return true;

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

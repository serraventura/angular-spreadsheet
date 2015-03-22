'use strict';

angular.module('inovniReportApp')
.directive('panelLabel', function (InfochartStatus, InfochartDataAvailable) {
    return {
      templateUrl: 'src/infochart/views/parts/panellabel.html',
      restrict: 'E',
      priority: 3,
      link: function postLink(scope, element, attrs) {

        function convertGridIdToPanel(id){
            return (id == null) ? id : (id-1);
        };

        var dgId = (InfochartStatus.get().dgrid._pIGID == null) ? InfochartStatus.get().dgrid._dgId : InfochartStatus.get().dgrid._pIGID;

        scope.dataElement = InfochartDataAvailable.getData().elements.data;

        scope.dataGridId = convertGridIdToPanel(dgId);

        scope.getAxis = function(){
            return InfochartStatus.get().dgrid.axis;
        };

        scope.isElementDataGridEmpty = function(item){

            var ret = false;

            if (item == '') {
                ret = true;
            };

            if (InfochartStatus.get().dgrid._dgId == 0) {
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

            var sectionId = InfochartStatus.get().section.selectedSectionId;
            var latestPositionY = InfochartStatus.get().svg.elements.latestPositionY;
            var latestPositionX = InfochartStatus.get().svg.elements.latestPositionX;
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
            InfochartStatus.set().svg.elements.latestPositionY(yTop);
            InfochartStatus.set().svg.elements.latestPositionX(latestPositionX);

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
            return InfochartStatus.get().dgrid._dgId;
        }, function(newVal, oldVal) {

            if (newVal !== oldVal) {
                scope.dataGridId = convertGridIdToPanel(InfochartStatus.get().dgrid._dgId);
            }

        }, false);


      }
    };
  });

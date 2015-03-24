'use strict';

angular.module('angularSpreadsheetApp')
  .service('Util', function Util() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var th = this;

    return {

        url:{
            parameter: function(paramName) {
                var param = (RegExp(paramName + '=' + '(.+?)(&|$)').exec(location.href)||[,null])[1];
                return (param != null) ? decodeURI(param) : param;
            }
        }

    };


  });
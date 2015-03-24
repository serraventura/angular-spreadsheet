'use strict';

angular.module('angularSpreadsheetApp')
  .controller('DgridCtrl', function ($scope, SSData, SSStatus) {

		// initializations
		var db = SSData.getDatabase();

		// define first load status
		SSStatus.loadInitialConfig(db);

		$scope.$watch('dataGrid', function(newValue, oldValue) {

		    if (newValue !== oldValue) {
		        SSData.createCache('dataGrid');
		    }

		}, true);

		// # DB Parameters dgId, axis, column, row
		$scope.$watch(function() {
		    return SSStatus.get().dgrid._dgId;
		}, function(newVal, oldVal) {

		    if (newVal !== oldVal) {
		        SSData.setDBParameter('dgId', newVal);
		        SSData.createCache('parameters');
		    }

		}, false);

		$scope.$watch(function() {
		    return SSStatus.get().dgrid.axis;
		}, function(newVal, oldVal) {

		    if (newVal !== oldVal) {
		        SSData.setDBParameter('axis', newVal);
		        SSData.createCache('parameters');
		    }

		}, false);

		$scope.$watch(function() {
		    return SSStatus.get().dgrid.column;
		}, function(newVal, oldVal) {

		    if (newVal !== oldVal) {
		        SSData.setDBParameter('column', newVal);
		        SSData.createCache('parameters');
		    }

		}, false);

		$scope.$watch(function() {
		    return SSStatus.get().dgrid.row;
		}, function(newVal, oldVal) {

		    if (newVal !== oldVal) {
		        SSData.setDBParameter('row', newVal);
		        SSData.createCache('parameters');
		    }

		}, false);

  });

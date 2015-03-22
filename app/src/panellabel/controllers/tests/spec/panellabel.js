'use strict';

describe('Controller: PanellabelPanellabelCtrl', function () {

  // load the controller's module
  beforeEach(module('angularSpreadsheetApp'));

  var PanellabelPanellabelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PanellabelPanellabelCtrl = $controller('PanellabelPanellabelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

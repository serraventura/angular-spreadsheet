'use strict';

describe('Controller: DgridDgridCtrl', function () {

  // load the controller's module
  beforeEach(module('angularSpreadsheetApp'));

  var DgridDgridCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DgridDgridCtrl = $controller('DgridDgridCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

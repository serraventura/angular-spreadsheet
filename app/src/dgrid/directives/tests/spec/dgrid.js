'use strict';

describe('Directive: dgrid/dgrid', function () {

  // load the directive's module
  beforeEach(module('angularSpreadsheetApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dgrid></dgrid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dgrid/dgrid directive');
  }));
});

'use strict';

describe('Directive: panelLabel/panelLabel', function () {

  // load the directive's module
  beforeEach(module('angularSpreadsheetApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<panel-label></panel-label>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the panelLabel/panelLabel directive');
  }));
});

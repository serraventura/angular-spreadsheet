'use strict';

describe('Service: dgrid/dgrid', function () {

  // load the service's module
  beforeEach(module('angularSpreadsheetApp'));

  // instantiate service
  var dgrid/dgrid;
  beforeEach(inject(function (_dgrid/dgrid_) {
    dgrid/dgrid = _dgrid/dgrid_;
  }));

  it('should do something', function () {
    expect(!!dgrid/dgrid).toBe(true);
  });

});

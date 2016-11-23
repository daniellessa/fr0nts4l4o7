'use strict';

describe('Service: timesService', function () {

  // load the service's module
  beforeEach(module('salao7WebApp'));

  // instantiate service
  var timesService;
  beforeEach(inject(function (_timesService_) {
    timesService = _timesService_;
  }));

  it('should do something', function () {
    expect(!!timesService).toBe(true);
  });

});

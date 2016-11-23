'use strict';

describe('Service: calendarFactory', function () {

  // load the service's module
  beforeEach(module('salao7WebApp'));

  // instantiate service
  var calendarFactory;
  beforeEach(inject(function (_calendarFactory_) {
    calendarFactory = _calendarFactory_;
  }));

  it('should do something', function () {
    expect(!!calendarFactory).toBe(true);
  });

});

'use strict';

describe('Service: propertiesFactory', function () {

  // load the service's module
  beforeEach(module('salao7WebApp'));

  // instantiate service
  var propertiesFactory;
  beforeEach(inject(function (_propertiesFactory_) {
    propertiesFactory = _propertiesFactory_;
  }));

  it('should do something', function () {
    expect(!!propertiesFactory).toBe(true);
  });

});

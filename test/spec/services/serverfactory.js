'use strict';

describe('Service: serverFactory', function () {

  // load the service's module
  beforeEach(module('salao7WebApp'));

  // instantiate service
  var serverFactory;
  beforeEach(inject(function (_serverFactory_) {
    serverFactory = _serverFactory_;
  }));

  it('should do something', function () {
    expect(!!serverFactory).toBe(true);
  });

});

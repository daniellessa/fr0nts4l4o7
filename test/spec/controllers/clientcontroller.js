'use strict';

describe('Controller: ClientcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var ClientcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientcontrollerCtrl = $controller('ClientcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClientcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});

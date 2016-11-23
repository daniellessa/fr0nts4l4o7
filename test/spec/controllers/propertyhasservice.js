'use strict';

describe('Controller: PropertyhasserviceCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var PropertyhasserviceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropertyhasserviceCtrl = $controller('PropertyhasserviceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PropertyhasserviceCtrl.awesomeThings.length).toBe(3);
  });
});

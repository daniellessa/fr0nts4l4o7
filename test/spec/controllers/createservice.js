'use strict';

describe('Controller: CreateserviceCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var CreateserviceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateserviceCtrl = $controller('CreateserviceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateserviceCtrl.awesomeThings.length).toBe(3);
  });
});

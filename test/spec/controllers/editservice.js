'use strict';

describe('Controller: EditserviceCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var EditserviceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditserviceCtrl = $controller('EditserviceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditserviceCtrl.awesomeThings.length).toBe(3);
  });
});

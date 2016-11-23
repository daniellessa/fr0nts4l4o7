'use strict';

describe('Controller: CreateprofessionalCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var CreateprofessionalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateprofessionalCtrl = $controller('CreateprofessionalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateprofessionalCtrl.awesomeThings.length).toBe(3);
  });
});

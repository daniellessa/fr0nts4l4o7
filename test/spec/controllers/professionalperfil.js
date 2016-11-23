'use strict';

describe('Controller: ProfessionalperfilCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var ProfessionalperfilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfessionalperfilCtrl = $controller('ProfessionalperfilCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfessionalperfilCtrl.awesomeThings.length).toBe(3);
  });
});

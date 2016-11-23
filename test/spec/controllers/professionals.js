'use strict';

describe('Controller: ProfessionalsCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var ProfessionalsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfessionalsCtrl = $controller('ProfessionalsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfessionalsCtrl.awesomeThings.length).toBe(3);
  });
});

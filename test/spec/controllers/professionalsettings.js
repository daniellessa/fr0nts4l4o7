'use strict';

describe('Controller: ProfessionalsettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var ProfessionalsettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfessionalsettingsCtrl = $controller('ProfessionalsettingsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfessionalsettingsCtrl.awesomeThings.length).toBe(3);
  });
});

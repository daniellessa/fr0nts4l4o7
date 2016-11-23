'use strict';

describe('Controller: NavheaderCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var NavheaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavheaderCtrl = $controller('NavheaderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NavheaderCtrl.awesomeThings.length).toBe(3);
  });
});

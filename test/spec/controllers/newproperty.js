'use strict';

describe('Controller: NewpropertyCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var NewpropertyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewpropertyCtrl = $controller('NewpropertyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewpropertyCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: DnprogressbarCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var DnprogressbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DnprogressbarCtrl = $controller('DnprogressbarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DnprogressbarCtrl.awesomeThings.length).toBe(3);
  });
});

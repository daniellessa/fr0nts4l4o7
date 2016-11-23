'use strict';

describe('Controller: AnsideCtrl', function () {

  // load the controller's module
  beforeEach(module('salao7WebApp'));

  var AnsideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnsideCtrl = $controller('AnsideCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AnsideCtrl.awesomeThings.length).toBe(3);
  });
});

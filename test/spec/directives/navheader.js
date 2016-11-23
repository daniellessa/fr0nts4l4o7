'use strict';

describe('Directive: navHeader', function () {

  // load the directive's module
  beforeEach(module('salao7WebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nav-header></nav-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navHeader directive');
  }));
});

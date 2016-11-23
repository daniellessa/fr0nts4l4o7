'use strict';

describe('Directive: uiCalendar', function () {

  // load the directive's module
  beforeEach(module('salao7WebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-calendar></ui-calendar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the uiCalendar directive');
  }));
});

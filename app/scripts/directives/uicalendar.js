'use strict';

/**
 * @ngdoc directive
 * @name salao7WebApp.directive:uiCalendar
 * @description
 * # uiCalendar
 */
angular.module('salao7WebApp')
  .directive('uiCalendar', function () {
    return {
      templateUrl: 'views/directives/uicalendar.html',
      restrict: 'E',
      controller: 'UicalendarCtrl'
    };
  });

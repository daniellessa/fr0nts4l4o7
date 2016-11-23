'use strict';

/**
 * @ngdoc directive
 * @name salao7WebApp.directive:dnProgressbar
 * @description
 * # dnProgressbar
 */
angular.module('salao7WebApp')
  .directive('dnProgressbar', function () {
    return {
      templateUrl: 'views/directives/dnprogressbar.html',
      restrict: 'E',
      controller: 'DnprogressbarCtrl'
    };
  });

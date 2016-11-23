'use strict';

/**
 * @ngdoc directive
 * @name salao7WebApp.directive:navHeader
 * @description
 * # navHeader
 */
angular.module('salao7WebApp')
  .directive('navHeader', function () {
    return {
      templateUrl: 'views/directives/navheader.html',
      restrict: 'E',
      controller: 'NavheaderCtrl'
    };
  });

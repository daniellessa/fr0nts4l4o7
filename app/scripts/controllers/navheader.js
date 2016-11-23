'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:NavheaderCtrl
 * @description
 * # NavheaderCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('NavheaderCtrl',['$scope','$aside','$auth','$state','propertiesFactory',
    function ($scope, $aside, $auth, $state, propertiesFactory) {

  	$scope.currentProperty = null;
  	$scope.properties = [];

    
    
  	
    var getProperties = function (){
      $scope.properties = propertiesFactory.getProperties();
    }

    $scope.setCurrentProperty = function(currentProperty) {
      propertiesFactory.setCurrentProperty(currentProperty);
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.goToHome = function() {
      $state.go('main');
    };

    $scope.goToProfessionals = function(){
      $state.go('professionals');
    };

    $scope.goToPropertyService = function(){
      $state.go('services');
    }

    $scope.goToClients = function(){
      $state.go('clients');
    }

    $scope.logout = function(){
      $auth.logout();
      $state.go('login');
    };
    
    
  }]);

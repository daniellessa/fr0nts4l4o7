'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('MainCtrl', [ '$auth', '$scope', '$state', 'propertiesFactory',
    function ($auth, $scope, $state, propertiesFactory) {
    
    
    
   var loadProperties = function () {
    	if($auth.isAuthenticated()){
    		propertiesFactory.loadProperties(function(err, properties){
		    	$state.go('main')
		    });
    	}else{
    		$state.go('login')
    	}
    };

    // loadProperties();
  }]);

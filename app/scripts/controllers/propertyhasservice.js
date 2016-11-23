'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:PropertyhasserviceCtrl
 * @description
 * # PropertyhasserviceCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('PropertyhasserviceCtrl', [ '$scope', 'serverFactory', 'propertiesFactory', '$mdDialog', '$timeout', '$q', '$log', '$mdToast',
    function ($scope, serverFactory, propertiesFactory, $mdDialog, $timeout, $q, $log, $mdToast) {
  

  $scope.services = [];
  $scope.selected = [];
  $scope.properties = propertiesFactory.getProperties();
  $scope.currentProperty = propertiesFactory.getCurrentProperty();
  $scope.isOpenProperty = false;

  

  $scope.loadServices = function() {
	serverFactory.getServicesByProperty(function(result){
  		$scope.services = result;
  	});
  };


  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

	$scope.createService = function($event) {
      	$mdDialog.show({
	        controller: 'CreateserviceCtrl',
	        controllerAs: 'ctrl',
	        templateUrl: 'views/modals/createservice.html',
	        parent: angular.element(document.body),
	        targetEvent: $event,
	        clickOutsideToClose:true,
          locals: {
            propertyId: $scope.currentProperty.id
          }
      	})
      	.then(function() {
	         $scope.loadServices();
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
  }

  $scope.editService = function(serviceId, $event) {
  	console.log('ID: ', serviceId);
  	$mdDialog.show({
        controller: 'EditserviceCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'views/modals/editservice.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true,
        locals: {
        	serviceId: serviceId
        }
  	})
  	.then(function() {
      $scope.loadServices();
    }, function() {
      
    });
  };

  $scope.haveForDelete = function() {
  	if($scope.selected.length > 0){
  		return true;
  	}else{
  		return false;
  	}
  };

  $scope.deleteServices = function() {
  	var listForDelete = $scope.selected;
  	for (var i = 0; i < listForDelete.length; i++) {
  		serverFactory.deletePropertyHasService(listForDelete[i].id, function(result){
  			$scope.loadServices();
        $scope.showSimpleToast('Serviços excluidos com sucesso!')
  		});
  	};
  	$scope.selected = [];
  };

  function success(desserts) {
    $scope.desserts = desserts;
  }

  $scope.getDesserts = function () {
    //$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
  };


    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
    $scope.newService = newService;
    function newService(service) {
      alert("Sorry! You'll need to create a Constituion for " + service + " first!");
    }
   
    function querySearch (query) {
      var results = query ? $scope.services.filter( this.createFilterFor(query) ) : $scope.services;
      return results;
      
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }

    $scope.changeCurrentProperty = function(property) {
        $scope.currentProperty = property;
        propertiesFactory.setCurrentProperty(property);
        $scope.loadServices();
    };

    $scope.toggleProperties = function() {
        if($scope.isOpenProperty == false){
            $scope.isOpenProperty == true;
        }else {
            $scope.isOpenProperty == false;
        }
    };

    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };
    $scope.toastPosition = angular.extend({},last);

      $scope.getToastPosition = function() {
      sanitizePosition();

      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;

      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;

      last = angular.extend({},current);
    }

    $scope.showSimpleToast = function(message) {

      var pinTo = $scope.getToastPosition();
      
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position(pinTo)
          .hideDelay(3000)
      );
      console.log(message);
    };
  

    $scope.loadServices();



  }]);

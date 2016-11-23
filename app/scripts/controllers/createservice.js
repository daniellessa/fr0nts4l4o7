'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:CreateserviceCtrl
 * @description
 * # CreateserviceCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('CreateserviceCtrl', [ '$scope', 'userFactory', 'propertyId', 'serverFactory', '$timeout', '$q', '$mdDialog', '$mdToast',
    function ($scope, userFactory, propertyId, serverFactory, $timeout, $q, $mdDialog, $mdToast) {

  	var user = userFactory.getProfissional();
  	$scope.titleModal = 'Cadastrar novo serviço';
  	$scope.titleButtom = 'Finalizar'
  	$scope.services = [];
  	$scope.states = [];
  	$scope.selectedItem;
	$scope.querySearch   = querySearch;

  	serverFactory.getAllServices(function(result){
  		$scope.services = result;
  		$scope.states = loadAll();
  	});



    $scope.addServiceInTheProperty = function($event){

      if(!$scope.selectedItem){
        $scope.showSimpleToast('Escolha um serviço!')
        return
      }

      if(!$scope.description){
        $scope.showSimpleToast('Prencha o campo breve descrição!')
        return
      }

      if(!$scope.oldPrice){
        $scope.showSimpleToast('Prencha o campo preço!')
        return
      }

    	var service = {
    		property: propertyId,
    		service: $scope.selectedItem.id,
    		oldPrice: $scope.oldPrice,
    		price: $scope.price,
    		description: $scope.description
    	}

      

    	serverFactory.postPropertyHasService(service, function(result){
        $scope.showSimpleToast('Serviço adicionado com sucesso!');
    		$scope.finish($event);
    	});    	
    };
  
    $scope.addService = function(service) {
    	var newService = {name: service};
    	serverFactory.postService(newService, function(createdService){
        $scope.selectedItem = createdService;
    		serverFactory.getAllServices(function(result){
		  		$scope.services = result;
		  		$scope.states = loadAll();
          $scope.showSimpleToast('Serviço adicionado a lista!');
		  	});
    	});
    };
    
    $scope.cancel = function($event) {
      $mdDialog.cancel();
    };
    $scope.finish = function($event) {
      $mdDialog.hide();
    };
    
    function querySearch (query) {
      return query ? $scope.states.filter( createFilterFor(query) ) : $scope.states;
    };
   
    function loadAll() {
      var allStates = $scope.services;
      return allStates.map( function (state) {
        return {
          value: state.name.toLowerCase(),
          display: state.name,
          id: state.id
        };
      });
    };
    
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }

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
    };

  }]);

    

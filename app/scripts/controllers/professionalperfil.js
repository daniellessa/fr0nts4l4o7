'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:ProfessionalperfilCtrl
 * @description
 * # ProfessionalperfilCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('ProfessionalperfilCtrl', [ '$scope', '$stateParams', '$mdDialog', 'serverFactory', 'propertiesFactory', '$mdToast',
    function ($scope, $stateParams, $mdDialog, serverFactory, propertiesFactory, $mdToast) {
    
    var professionalId = $stateParams.professionalId;
    $scope.titleModal = 'Configurações do(a) Colaborador(a) ';
  	$scope.titleButtom = 'Fechar';
  	$scope.professional = {};
    $scope.professions = [];
    $scope.services = [];
    $scope.selected = [];


    $scope.loadProfessional = function() {
    	serverFactory.getProfessinal(professionalId, function(result){
    		$scope.professional = result;
    	});
    };

    $scope.loadProfessonalsHasServices = function() {
      serverFactory.getProfessionalHasService(professionalId, function(result){
        $scope.services = result;
      });
    };

    $scope.loadProfessions = function() {
      serverFactory.getProfessions(function(result){
        $scope.professions = result;
      });
    };

    $scope.updateProfessional = function() {
      serverFactory.updateProfessinal($scope.professional, function(err, updated){
        if(err)
          $scope.showSimpleToast('Falha ao atualizar o profissional!');

          $scope.showSimpleToast('Profissional atualizado com sucesso!')
         $scope.loadProfessional();
      });
    }

    $scope.deleteServices = function() {
      console.log($scope.selected)
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
            propertyId: propertiesFactory.getCurrentPropertyId()
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

  	$scope.cancel = function($event) {
      $mdDialog.cancel();
    };
    $scope.finish = function($event) {
      $mdDialog.hide();
    };

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    $scope.haveForDelete = function() {
      if($scope.selected.length > 0){
        return true;
      }else{
        return false;
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
    };

    $scope.loadProfessional();
    $scope.loadProfessonalsHasServices();
    $scope.loadProfessions();


  }]);

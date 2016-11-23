'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:EditserviceCtrl
 * @description
 * # EditserviceCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('EditserviceCtrl', ['$scope', 'serviceId', 'userFactory', 'serverFactory', '$timeout', '$q', '$mdDialog', '$mdToast',
    function ($scope, serviceId, userFactory, serverFactory, $timeout, $q, $mdDialog, $mdToast) {
    
    var user = userFactory.getProfissional();
    $scope.service = {};
  	$scope.titleModal = 'Editar serviço';
  	$scope.titleButtom = 'Salvar'

  	serverFactory.getOnePropertyHasService(serviceId, function(result){
  		$scope.service = result;
  		console.log(result);
  	});

  	$scope.updateService = function($event) {
  		serverFactory.updatePropertyHasService($scope.service, function(result){
        $scope.showSimpleToast('Serviço atualizado com sucesso!')
  			$scope.finish($event);
  		});
  	};

  	$scope.cancel = function($event) {
      $mdDialog.cancel();
    };
    $scope.finish = function($event) {
      $mdDialog.hide();
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

  }]);

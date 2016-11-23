'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:ClientcontrollerCtrl
 * @description
 * # ClientcontrollerCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('ClientcontrollerCtrl', [ '$scope', 'propertiesFactory', 'serverFactory', '$mdDialog', '$timeout', '$q', '$log', '$mdToast',
    function ($scope, propertiesFactory, serverFactory, $mdDialog, $timeout, $q, $log, $mdToast) {
    
    $scope.selected;
    $scope.properties = propertiesFactory.getProperties();
    $scope.currentProperty = propertiesFactory.getCurrentProperty();
    $scope.clients = [];

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



    serverFactory.getUsersByProperty(function(clients){
    	$scope.clients =  clients;
    });

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

    $scope.showActionToast = function(message, ok, cancel) {
      var pinTo = $scope.getToastPosition();
      var toast = $mdToast.simple()
        .textContent(message)
        .action('Desfazer')
        .highlightAction(true)// Accent is used by default, this just demonstrates the usage.
        .position(pinTo)
        .hideDelay(6000);

        console.log('teste')

      $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
          cancel();
        }else{
          ok();
        }
      });
    };

    


    $scope.createClient = function($event) {
      	$mdDialog.show({
	        controller: 'CreateclientCtrl',
	        controllerAs: 'ctrl',
	        templateUrl: 'views/modals/createclient.html',
	        parent: angular.element(document.body),
	        targetEvent: $event,
	        clickOutsideToClose:true,
          locals: {
            user: null
          }
      	})
      	.then(function() {
  	      serverFactory.getUsersByProperty(function(clients){
            $scope.clients =  clients;
          });
	    }, function() {
	       $scope.status = 'You cancelled the dialog.';
	    });
    }

    $scope.updateClient = function(user, $event) {
        $mdDialog.show({
          controller: 'CreateclientCtrl',
          controllerAs: 'ctrl',
          templateUrl: 'views/modals/createclient.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true,
          locals: {
            user: user
          }
        })
        .then(function() {
          serverFactory.getUsersByProperty(function(clients){
            $scope.clients =  clients;
          });
      }, function() {
         $scope.status = 'You cancelled the dialog.';
      });
    }

    $scope.deleteClient = function(id, $event) {
      var deleteConfirm = function() {
        serverFactory.deleteClient(id, function(err, success){
          if(err)
            $scope.showSimpleToast('Falha ao excluir o cliente');

          serverFactory.getUsersByProperty(function(clients){
            $scope.clients =  clients;
          });
          $scope.showSimpleToast('Cliente excluido com sucesso!');
        });
      }
      var undo = function() {
        $scope.showSimpleToast('Cliente não exluido');
      }
      $scope.showActionToast('O Cliente selecionado será excluido!', deleteConfirm, undo)
    }

    $scope.editClient = function(user, $event) {
      $scope.updateClient(user, $event);
    }

    $scope.changeCurrentProperty = function(property) {
      $scope.currentProperty = property;
      propertiesFactory.setCurrentProperty(property);
      serverFactory.getUsersByProperty(function(clients){
        $scope.clients =  clients;
        $scope.showSimpleToast('Estabelecimento alterado para '+ property.name);
      });
      
    };

  }]);

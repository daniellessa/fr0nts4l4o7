'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:ProfessionalsCtrl
 * @description
 * # ProfessionalsCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
	  .controller('ProfessionalsCtrl', [ '$scope', 'userFactory', 'serverFactory', 'propertiesFactory', '$mdDialog', '$mdMedia', '$state', '$mdToast',
        function ($scope, userFactory, serverFactory, propertiesFactory, $mdDialog, $mdMedia, $state, $mdToast) {
	    
	    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	  	$scope.user = userFactory.getProfissional();
	  	$scope.professionals = []; 
        $scope.properties = propertiesFactory.getProperties();
        $scope.currentProperty = propertiesFactory.getCurrentProperty();
	    $scope.qrcode = 'teste';
        $scope.isOpenProperty = false;
    	

    	$scope.loadProfessionals = function() {
    		serverFactory.getProfessionalsByProperty(function(result){
    			$scope.professionals = result;
    		});
    	};

    	$scope.getFirstName = function(fullName){
    		var name = fullName.split(" ");
    		return name[0];
    	};

    	$scope.getLastName = function(fullName){
    		var name = fullName.split(" ");
    		lastPosition = name.length -1;
    		return name[lastPosition];
    	};

    	$scope.createProfessional = function($event) {
    		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    		$mdDialog.show({
		        controller: 'CreateprofessionalCtrl',
		        controllerAs: 'ctrl',
		        templateUrl: 'views/modals/createprofessional.html',
		        parent: angular.element(document.body),
		        targetEvent: $event,
		        clickOutsideToClose:true,
		        fullscreen: useFullScreen
		  	})
		  	.then(function() {
		      $scope.loadServices();
		    }, function() {
		      
		    });
		    $scope.$watch(function() {
		      return $mdMedia('xs') || $mdMedia('sm');
		    }, function(wantsFullScreen) {
		      $scope.customFullscreen = (wantsFullScreen === true);
		    });
    	};

        $scope.removeProfessional = function(id) {
            serverFactory.deleteProfessional(id, function(err, result){
                if(err)
                    $scope.showSimpleToast('Falha ao remover profissional')

                $scope.showSimpleToast('Profissional removido com sucesso!')
                $scope.loadProfessionals();
            });
        }

        $scope.activeProfessional = function(id) {
            serverFactory.activeProfessional(id, function(err, result){
                if(err)
                    $scope.showSimpleToast('Falha ao ativar profissional')

                $scope.showSimpleToast('Profissional ativado com sucesso!')
                $scope.loadProfessionals();
            });
        }


    	$scope.goToProfessionalPerfil = function(professional) {
    		$state.go('professionalPerfil', { professionalId: professional.id });
    	};

        $scope.changeCurrentProperty = function(property) {
            $scope.currentProperty = property;
            propertiesFactory.setCurrentProperty(property);
            $scope.loadProfessionals();
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
        };




    	setTimeout(function(){
    		$scope.loadProfessionals();
    	}, 500);
    	
  }]);

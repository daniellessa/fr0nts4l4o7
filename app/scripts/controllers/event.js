'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('EventCtrl', ['$scope', 'event', 'calendarFactory', '$uibModalInstance', '$mdToast',
    function ($scope, event, calendarFactory, $uibModalInstance, $mdToast) {
  	$scope.event = {};

  	calendarFactory.getEvent(event.id, function(result){
  		$scope.event = result;
  		console.log($scope.event);
  	});

  	$scope.cancelEvent = function() {
  		calendarFactory.cancelEvent($scope.event, function(result){
			 $uibModalInstance.close();
       $scope.showSimpleToast('Evendo cancelado com sucesso!');
  		});
  	};

  	$scope.cancel = function() {
  		$uibModalInstance.dismiss('cancel');
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

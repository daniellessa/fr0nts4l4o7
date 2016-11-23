'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:AnsideCtrl
 * @description
 * # AnsideCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('AnsideCtrl', ['$aside', '$scope', '$auth', '$state', 'userFactory',
    function ($aside, $scope, $auth, $state, userFactory) {
    
    $scope.icon_menu = "menu";
    $scope.user = userFactory.getProfissional();
    console.log($scope.user.user.url)

  	/* Aside */

    $scope.asideState = {
      open: false
    };

    $scope.getFirstName = function(fullName){
      var name = fullName.split(" ");
      return name[0];
    };

    $scope.getLastName = function(fullName){
      var name = fullName.split(" ");
      var lastPosition = name.length -1;
      return name[lastPosition];
    };
    
    $scope.openAside = function(position, backdrop) {
      $scope.asideState = {
        open: true,
        position: position
      };
      
    function postClose() {
      $scope.asideState.open = false;
    }
      
    $aside.open({
      templateUrl: 'views/anside.html',
      placement: position,
      size: 'sm',
      backdrop: backdrop,
      controller: function($scope, $uibModalInstance) {

        $scope.goToMain = function(){
          $state.go('main');
          $uibModalInstance.close();
        };
        $scope.goToProfessionals = function(){
          $state.go('professionals');
          $uibModalInstance.close();
        };
        $scope.goToClients = function(){
          $state.go('clients');
          $uibModalInstance.close();
        };
        $scope.goToPropertyService = function(){
          $state.go('services');
          $uibModalInstance.close();
        };
        $scope.logout = function(){
          $auth.logout();
          $state.go('login');
          $uibModalInstance.close();
        };



        $scope.ok = function(e) {
          $uibModalInstance.close();
          e.stopPropagation();
        };
        $scope.cancel = function(e) {
          $uibModalInstance.dismiss();
          e.stopPropagation();
        };
      }
    }).result.then(postClose, postClose);

    }

  }]);

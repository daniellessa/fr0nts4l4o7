'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('LoginCtrl', [ '$scope', '$http', '$auth', '$state',
    function ($scope, $http, $auth, $state) {

  	$scope.user = {
  		email:null,
  		password:null
  	}
    $scope.resposta;
    $scope.notification;

  	$scope.login = function() {

  		$auth.login({
  			email: $scope.user.email,
  			password: $scope.user.password
  		})
  		.then(function (response){
        console.log(response);
        // var priv = $auth.getPayload().tipo_profissional;
        // if(priv > 2){
  			   $state.go('main');
        // }else{
        //   $auth.logout();
        //   $scope.notification = "Desculpe! Acesso apenas para profissionais!"
        //   delete $scope.user;
        // }
  		})
  		.catch(function() {
  			$scope.notification = "Usuário e/ou senha inválidos!"
        delete $scope.user;
  		});
  	};

    $scope.newProperty = function() {
      $state.go('newProperty');
    };
    
  }]);

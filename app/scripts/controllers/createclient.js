'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:CreateclientCtrl
 * @description
 * # CreateclientCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('CreateclientCtrl', [ 'user', '$scope', 'userFactory', 'serverFactory', '$mdDialog', '$mdMedia', '$state', 'Upload', '$timeout', '$mdToast',
    function (user, $scope, userFactory, serverFactory, $mdDialog, $mdMedia, $state, Upload, $timeout, $mdToast) {
    

    $scope.sexies = ['M','F'];
    $scope.user = {};
  	$scope.picFile;
  	$scope.croppedDataUrl;
  	$scope.croppedDataUrlAux = 'images/person_default.png';
  	$scope.progress;
  	$scope.result;
  	$scope.showSetupImage = true;
  	$scope.textButton = 'Salvar';

  	if(user) {
  		$scope.textButton = 'Atualizar';
  		$scope.user.id = user.id;
  		$scope.user.name = user.name;
  		$scope.user.phone = user.phone;
  		$scope.user.sex = user.sex;
  		$scope.user.bucketName = user.bucketName;
  		$scope.user.photoPath = user.photoPath;

  		$scope.croppedDataUrlAux = user.url;
  	}


  	$scope.clearImage = function() {
    	$scope.picFile = null;
    };

    $scope.cancel = function($event) {
      $mdDialog.cancel();
    };
    $scope.finish = function($event) {
      $mdDialog.hide();
    };

    var createUser = function() {
    	$scope.user.bucketName = $scope.creds.bucketName;

    	serverFactory.postUser($scope.user, function(err, result){
    		if(err)
    			console.log(err);

    		$scope.showSimpleToast('Cliente salvo com sucesso!');
    		$mdDialog.hide();
    	});
    };

    var updateUser = function() {
    	$scope.user.bucketName = $scope.creds.bucketName;

    	serverFactory.updateUser($scope.user, function(err, result){
    		if(err)
    			console.log(err);

    		console.log(result);
    		$scope.showSimpleToast('Cliente Atualizado com sucesso!');
    		$mdDialog.hide();
    	});
    };

    $scope.postUser = function() {

    	if(!$scope.user.photoPath){
    		$scope.showSimpleToast('selecione uma foto');
    		return
    	}
    	if(!$scope.user.name){
    		$scope.showSimpleToast('Prencha o campo nome');
    		return
    	}
    	if(!$scope.user.phone){
    		$scope.showSimpleToast('Prencha o camo telefone');
    		return
    	}

    	if(user)
    		updateUser();
    	else
    		createUser();
    	
    };





    $scope.creds = {
      bucketName: 'agendamobile',
      access_key: 'AKIAJGIC2XIIKU6QT4PA',
      secret_key: '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'
    }

     $scope.upload = function(dataUrl, name) {
      
      var file = $scope.picFile;
      var date = new Date();
      var fileName = 'agendamobile-profile-images/image_'+date.getTime()+'.jpg';
      $scope.user.photoPath = fileName;
      
      // Configure The S3 Object 
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'sa-east-1';
      var bucketName = new AWS.S3({ params: { Bucket: $scope.creds.bucketName } });
     
      if(file) {
        var params = { Key: fileName, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };
     
        bucketName.putObject(params, function(err, data) {
          if(err) {
            // There Was An Error With Your S3 Config
            alert(err.message);
            return false;
          }
          else {
            // Success!
            $scope.clearImage();
            $scope.croppedDataUrlAux = dataUrl;
            $scope.apply();
          }
        })
        .on('httpUploadProgress',function(progress) {
              // Log Progress Information
              var percent = Math.round(progress.loaded / progress.total * 100);
              if(percent == 100){
              	$scope.showSetupImage = false;
              	$scope.showSimpleToast('Foto carregado com sucesso!');
              }
              	

              console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
      }
      else {
        // No File Selected
        $scope.showSimpleToast('Nenhuma imagem selecionada!');
      }
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

'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:CreateprofessionalCtrl
 * @description
 * # CreateprofessionalCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('CreateprofessionalCtrl', ['$scope', 'userFactory', 'serverFactory', '$mdDialog', '$mdMedia', '$state', 'Upload', '$timeout',
    function ($scope, userFactory, serverFactory, $mdDialog, $mdMedia, $state, Upload, $timeout) {
    
  	$scope.sexies = ['M','F'];
  	$scope.professions = [];
    $scope.professional = {};
  	$scope.picFile;
  	$scope.croppedDataUrl;
  	$scope.croppedDataUrlAux = 'images/person_default.png';
  	$scope.progress;
  	$scope.result;






  	$scope.loadProfessions = function() {
      serverFactory.getProfessions(function(result){
        $scope.professions = result;
      });
    };

    $scope.clearImage = function() {
    	$scope.picFile = null;
    };

    $scope.cancel = function($event) {
      $mdDialog.cancel();
    };
    $scope.finish = function($event) {
      $mdDialog.hide();
    };




    // $scope.upload = function (dataUrl, name) {
    // 	console.log(Upload.dataUrltoBlob(dataUrl, name));
    //     Upload.upload({
    //         url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
    //         data: {
    //             file: Upload.dataUrltoBlob(dataUrl, name)
    //         },
    //     }).then(function (response) {
    //         $timeout(function () {
    //             $scope.result = response.data;
    //             $scope.clearImage();
    //             $scope.croppedDataUrlAux = dataUrl;
    //             $scope.progress = 0;
    //         });
    //     }, function (response) {
    //         if (response.status > 0) $scope.errorMsg = response.status 
    //             + ': ' + response.data;
    //     }, function (evt) {
    //         $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    //     });
    // }

    $scope.creds = {
      bucket: 'agendamobile',
      access_key: 'AKIAJGIC2XIIKU6QT4PA',
      secret_key: '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'
    }
 
    $scope.upload = function(dataUrl, name) {
      
      var file = $scope.picFile;
      var date = new Date();
      var fileName = 'agendamobile-profile-images/image_'+date.getTime()+'.jpg';
      $scope.professional.photoPath = fileName;
      
      // Configure The S3 Object 
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'sa-east-1';
      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
     
      if(file) {
        var params = { Key: fileName, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };
     
        bucket.putObject(params, function(err, data) {
          if(err) {
            // There Was An Error With Your S3 Config
            alert(err.message);
            return false;
          }
          else {
            // Success!
            $scope.clearImage();
            $scope.croppedDataUrlAux = dataUrl;
          }
        })
        .on('httpUploadProgress',function(progress) {
              // Log Progress Information
              console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
      }
      else {
        // No File Selected
        alert('No File Selected');
      }
    }


    $scope.loadProfessions(); 

  }]);

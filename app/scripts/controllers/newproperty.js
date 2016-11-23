'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:NewpropertyCtrl
 * @description
 * # NewpropertyCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('NewpropertyCtrl', [ '$scope', '$state', 'serverFactory', 'NgMap',
    function ($scope, $state, serverFactory, NgMap) {

  	$scope.sexies = ['M','F'];
  	$scope.croppedDataUrlAux = 'images/person_default.png';
  	$scope.professions = [];
  	$scope.place = null;
  	$scope.isProfessional = false;

    // NgMap.getMap().then(function(map) {
    //   console.log(map.getCenter());
    //   console.log('markers', map.markers);
    //   console.log('shapes', map.shapes);
    

   //  $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7TqXjyl25UoxvDI3AjWYCl1n0VfktPs8";
  	// $scope.center = "-23.5505199,-46.6333094"
  	

   //  $scope.map = { 
  	// 	center: { 
  	// 		latitude: -23.5505199, 
  	// 		longitude: -46.6333094 
  	// 	}, 
  	// 	zoom: 8 
  	// };

  	// $scope.marker = {
   //    id: 0,
   //    coords: {
   //      latitude: -23.5505199, 
  	// 	longitude: -46.6333094 
   //    },
   //    options: { draggable: true },
   //    events: {
   //      dragend: function (marker, eventName, args) {
   //        var lat = marker.getPosition().lat();
   //        var lon = marker.getPosition().lng();
   //        $scope.marker.options = {
   //          draggable: true
   //        };
   //      }
   //    }
   //  };

    // $scope.setMarker = function () {
    // 	try {
    // 		$scope.marker.coords.latitude = $scope.place.geometry.location.lat();
	   //  	$scope.marker.coords.longitude = $scope.place.geometry.location.lng();
	   //  	$scope.map.center.latitude = $scope.place.geometry.location.lat();
	   //  	$scope.map.center.longitude = $scope.place.geometry.location.lng();
	   //  	$scope.map.zoom = 16;
	   //  	console.log($scope.place.geometry.location.lat() + ' - ' + $scope.place.geometry.location.lng());
    // 	}catch(ex){}
    // };

  	$scope.loadProfessions = function() {
      serverFactory.getProfessions(function(result){
        $scope.professions = result;
      });
    };

    $scope.cancel = function() {
    	$state.go('login');
    };

    

    $scope.loadProfessions();
    
  }]);

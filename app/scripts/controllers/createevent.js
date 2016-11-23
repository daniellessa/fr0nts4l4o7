'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:CreateeventCtrl
 * @description
 * # CreateeventCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('CreateeventCtrl', [ '$scope', 'startDate', 'endDate', 'currentProfessional', 'serverFactory', 'userFactory', 'propertiesFactory', 'calendarFactory', '$mdDialog', '$mdMedia', '$timeout', '$mdToast',
    function ($scope, startDate, endDate, currentProfessional, serverFactory, userFactory, propertiesFactory, calendarFactory, $mdDialog, $mdMedia, $timeout, $mdToast) {


    $scope.addZero = function(value) {
      var valueString = value+'';
      if(valueString.length == 1){
        return '0'+valueString;
      }else{
        return valueString;
      }
    };

  	$scope.title;
  	$scope.date;
  	$scope.startAt = new Date(startDate);
  	$scope.endsAt = new Date(endDate);
    $scope.startTime = $scope.addZero($scope.startAt.getHours())+':'+$scope.addZero($scope.startAt.getMinutes());
    $scope.endsTime = $scope.addZero($scope.endsAt.getHours())+':'+$scope.addZero($scope.endsAt.getMinutes());
  	$scope.user;
  	$scope.professionals = [];
    $scope.professional = currentProfessional,
  	$scope.services = [];
    $scope.serviceName;
  	$scope.users = [];
  	$scope.currentProperty = propertiesFactory.getCurrentProperty();

    $scope.simulateQuery = false;
    $scope.isDisabled    = false;
    $scope.repos         = loadAll();
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
  


  	$scope.types = [
  		{id:1,name:'Serviço'},
  		// {id:2,name:'warning'},
  		{id:3,name:'Bloqueio'},
  		// {id:4,name:'inverse'},
  		// {id:5,name:'success'},
  		// {id:6,name:'especial'}
  	];

    $scope.checkAvailabilityStart = function(startAt) {
      serverFactory.checkAvailabilityStart(startAt, function(result){
        console.log(result);
        if(result)
        {
          var date = new Date(result.endsAt);
          $scope.startTime = $scope.addZero(date.getHours())+':'+$scope.addZero(date.getMinutes());
        }
      });
    };

    $scope.checkAvailabilityStart(startDate);

  	$scope.loadServicesProfessional = function(professionalId) {
  		if(professionalId)
  		{
  			serverFactory.getProfessionalHasService(professionalId, function(result){
  				$scope.services = result;
  			});
  		}
  	};

  	$scope.loadUsers = function() {
  		serverFactory.getUsersByProperty(function(result){
  			$scope.users = result;
        $scope.repos = result;
  		});
  	};

    $scope.changeService = function() {

      for (var i = 0; i < $scope.services.length; i++) {
        if($scope.services[i].service.name === $scope.serviceName)
          $scope.service = $scope.services[i];
      }

      // $scope.service = JSON.parse($scope.service);
      console.log($scope.service.duration);
      var ends = new Date($scope.startAt.getFullYear()+'-'+$scope.addZero(($scope.startAt.getMonth()+1))+'-'+$scope.addZero($scope.startAt.getDate())+'T'+$scope.startTime+':00');
      var newDate = new Date($scope.startAt.getFullYear()+'-'+$scope.addZero(($scope.startAt.getMonth()+1))+'-'+$scope.addZero($scope.startAt.getDate())+'T'+$scope.service.duration);
      newDate.setHours(ends.getHours() + newDate.getHours());
      newDate.setMinutes(ends.getMinutes() + newDate.getMinutes());
      newDate.setHours(newDate.getHours() + 6);
      $scope.endsTime = $scope.addZero(newDate.getHours())+':'+$scope.addZero(newDate.getMinutes());
      console.log(newDate);
    };

  	$scope.createEvent = function(ev) {

      var s = $scope.startAt;
      var e = $scope.endsAt;
      var startAt = new Date(s.getFullYear()+'-'+$scope.addZero((s.getMonth()+1))+'-'+$scope.addZero(s.getDate())+'T'+$scope.startTime+':00');
      var endsAt = new Date(e.getFullYear()+'-'+$scope.addZero((e.getMonth()+1))+'-'+$scope.addZero(e.getDate())+'T'+$scope.endsTime+':00');

      // startAt.setHours(startAt.getHours() - 2);
      // endsAt.setHours(endsAt.getHours() - 2);

  		var userId = null;
  		if($scope.type == 1){
  			userId = $scope.user.id;
  		}

      var service = null;
      if($scope.service){
        service = $scope.service.service.id;
      }
      
  		var serverEvent = {
  			professional: currentProfessional.id,
  			user: userId,
  			service: service,
  			property: $scope.currentProperty.id,
  			title: $scope.title,
  			startAt: startAt,
  			endsAt: endsAt,
  			status: 1,
  			type: $scope.type
  		};

      $scope.checkAvailabilityEnds(ev, serverEvent);

  	};

    $scope.checkAvailabilityEnds = function(ev, event) {
      serverFactory.checkAvailabilityEnds(event.endsAt, function(result){
        console.log(result);
        if(!result){
          calendarFactory.postEvent(event, function(response){
            $scope.showSimpleToast('Evento criado com sucesso!');
            $scope.finish(ev);
          });
        }else{
          $scope.showSimpleToast('Tempo insuficiente para este evento!')
        }

      });
    };

  	$scope.cancel = function($event) {
      $mdDialog.cancel();
    };
    $scope.finish = function($event) {
      $mdDialog.hide();
    };

    $scope.loadServicesProfessional(currentProfessional.id);
  	$scope.loadUsers();


    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? $scope.repos.filter( createFilterFor(query) ) : $scope.repos,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      // $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $scope.user = item;
    }
    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
      var repos = $scope.users;
      return repos.map( function (repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        console.log(item);
        return (item.name.toLowerCase().indexOf(lowercaseQuery) === 0);
      };
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

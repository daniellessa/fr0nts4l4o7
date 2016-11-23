'use strict';

/**
 * @ngdoc function
 * @name salao7WebApp.controller:UicalendarCtrl
 * @description
 * # UicalendarCtrl
 * Controller of the salao7WebApp
 */
angular.module('salao7WebApp')
  .controller('UicalendarCtrl', [ '$scope', '$mdToast', 'moment', 'calendarFactory', 'userFactory', 'serverFactory', '$mdDialog', '$mdMedia', '$uibModal', 'propertiesFactory',
  	function ($scope, $mdToast, moment, calendarFactory, userFactory, serverFactory, $mdDialog, $mdMedia, $uibModal, propertiesFactory) {

  	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  	$scope.user = userFactory.getProfissional();
	$scope.professionals = [];
	$scope.properties = [];
	$scope.currentProperty = {};
	$scope.currentProfessional = {};
	$scope.events = [];
	$scope.eventSelected;
	$scope.workStarts = '08:00';
	$scope.workEnds = '17:00';
	$scope.split = '15';
	$scope.calendarView = 'month';
	$scope.calendarDate = new Date();
	$scope.viewChangeEnabled = true;
	$scope.isCellOpen = false;
	$scope.isOpen = false;
	$scope.isOpenProperty = false;


	$scope.createEvent = function(event, $event) {
		console.log(event);
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
	        controller: 'CreateeventCtrl',
	        controllerAs: 'ctrl',
	        templateUrl: 'views/modals/create-event.html',
	        parent: angular.element(document.body),
	        targetEvent: $event,
	        clickOutsideToClose:true,
	        fullscreen: useFullScreen,
	        locals: {
	        	event: event
	        }
	  	})
	  	.then(function() {
	      $scope.events = [];
	      $scope.carregarAgenda();
	      $scope.showSimpleToast('Evento Criado com sucesso!');
	    }, function() {
	      
	    });
	    $scope.$watch(function() {
	      return $mdMedia('xs') || $mdMedia('sm');
	    }, function(wantsFullScreen) {
	      $scope.customFullscreen = (wantsFullScreen === true);
	    });
	};
				
	$scope.loadProfessionals = function() {
		propertiesFactory.loadProperties(function(err, properties){
	  		if(!err){
	      		$scope.properties = properties;
	      		$scope.currentProperty = properties[0];
	      		
	      		serverFactory.getProfessionalsByProperty(function(result){
			      	$scope.professionals = result;
			      	$scope.currentProfessional = result[0];
			      	$scope.carregarAgenda();
			    });
	  		}	
	  	});   
  	};

	$scope.carregarAgenda = function(){
      calendarFactory.getEventsList($scope.currentProfessional.id, function(events){
        for (var i = 0; i < events.length; i++) {
        	$scope.saveEvent(events[i]);
        };
      });
	};

	$scope.changeCurrentProfessional = function(professional) {
		$scope.currentProfessional = professional;
		$scope.events = [];
		$scope.carregarAgenda();
		$scope.showSimpleToast('Profissional alterado para '+ professional.user.name);
	};

	$scope.changeCurrentProperty = function(property) {
		$scope.currentProperty = property;
		propertiesFactory.setCurrentProperty(property);
		$scope.events = [];
		$scope.carregarAgenda();
		$scope.showSimpleToast('Estabelecimento alterado para '+ property.name);
	};

	$scope.clearCurrentProfessional = function(){
		$scope.currentProfessional = null;
	};

	$scope.toggleProfessionals = function() {
		if($scope.isOpen == false){
			$scope.isOpen == true;
		}else {
			$scope.isOpen == false;
		}
	};

	$scope.toggleProperties = function() {
		if($scope.isOpenProperty == false){
			$scope.isOpenProperty == true;
		}else {
			$scope.isOpenProperty == false;
		}
	};

	$scope.goToDay = function (date) {
		$scope.calendarDate = date;
		$scope.calendarView = 'day';
	};

 	/* calendar methods */
 	$scope.onClickEvent = function(ev, event){

 		// if(event.type === 1){
		    var modalInstance = $uibModal.open({
		    animation: $scope.animationsEnabled,
		    templateUrl: 'views/modals/event.html',
		    controller: 'EventCtrl',
		    resolve: {
		      	event: function () {
		          return event;
		        }
		    }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.events = [];
		      $scope.carregarAgenda();
		    }, function () {
		    	//dissmiss modal
		    });
		// }else
		// 	$scope.showSimpleToast('Bloqueios não possuem outros detalhes!');
	};

	$scope.saveEvent = function(event){
		var title;
		if(event.title.length > 0)
		{
			title = event.title;
		}
		else
		{
			title = event.user.name +
				' - ' + event.service.name;
				console.log(event.user.url);
		}

		var event = {
			id: event.id,
			title: title,
	        type: convertType(event.type),
	        startsAt: new Date(event.startAt),
	        endsAt: new Date(event.endsAt),
		    editable: true, 
		    deletable: true, 
		    draggable: true, 
		    resizable: true, 
		    incrementsBadgeTotal: true, 
		    recursOn: 'year',
		    allDay: false,
		}
		$scope.events.push(event);
	};

	$scope.timespanClicked = function(ev, event) {
	  $scope.createEvent(event, ev);
	};

	$scope.eventClicked = function(event) {
	  alert('Clicked', event);
	};

	$scope.eventEdited = function(event) {
	  alert('Edited', event);
	};

	$scope.eventDeleted = function(event) {
	  alert('Deleted', event);
	};

	$scope.eventTimesChanged = function(event, newStart, newEnds) {
	  console.log('Change: ', newStart);
	  console.log('Chnage: ', newEnds);
	  
	  newStart.setHours(newStart.getHours() - 2);
	  newEnds.setHours(newEnds.getHours() - 2);

	  event.startsAt = newStart;
	  event.endsAt = newEnds;
	  calendarFactory.updateEvent(event, function(response){
	  	if(response){
	  		$scope.events = [];
	  		$scope.carregarAgenda();
	  		$scope.showSimpleToast('Evento Atualizado!')
	  	}
	  });
	};

	$scope.toggle = function($event, field, event) {
	  $event.preventDefault();
	  $event.stopPropagation();
	  event[field] = !event[field];
	};

	$scope.viewChangeClicked = function(date, nextView) {
	  console.log(date, nextView);
	  return $scope.viewChangeEnabled;
	};

	$scope.rangeSelected = function($event, startDate, endDate) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
	        controller: 'CreateeventCtrl',
	        controllerAs: 'ctrl',
	        templateUrl: 'views/modals/create-event.html',
	        parent: angular.element(document.body),
	        targetEvent: $event,
	        clickOutsideToClose:true,
	        fullscreen: useFullScreen,
	        locals: {
	        	startDate: startDate,
	        	endDate: endDate,
	        	currentProfessional: $scope.currentProfessional
	        }
	  	})
	  	.then(function() {
	      $scope.events = [];
	      $scope.carregarAgenda();
	    }, function() {
	      
	    });
	    $scope.$watch(function() {
	      return $mdMedia('xs') || $mdMedia('sm');
	    }, function(wantsFullScreen) {
	      $scope.customFullscreen = (wantsFullScreen === true);
	    });
    };

	var convertType = function(status) {
		switch(status){
			case 1:
				return 'info';
				break;
			case 2:
				return 'warning';
				break;
			case 3:
				return 'important';
				break;
			case 4:
				return 'inverse';
				break;
			case 5:
				return 'success';
				break;	
			case 6:
				return 'especial';
				break;
		}
	};

	setTimeout(function(){
		$scope.loadProfessionals();
	}, 500);

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

'use strict';

/**
 * @ngdoc overview
 * @name salao7WebApp
 * @description
 * # salao7WebApp
 *
 * Main module of the application.
 */
angular
  .module('salao7WebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'satellizer',
    'ui.bootstrap',
    'mwl.calendar',
    'ui.router',
    'ngImgCrop',
    'ngAside',
    'irontec.simpleChat',
    'jp.ng-bs-animated-button',
    'ngMdIcons',
    'ja.qr',
    'ui.bootstrap.datetimepicker',
    'angucomplete',
    'ui.utils.masks',
    'md.data.table',
    'ngMaterial',
    'ngMaterialDatePicker',
    'ngFileUpload', 
    'ngImgCrop',
    // 'uiGmapgoogle-maps',
    // 'ngMap',
    // 'google.places'
  ])
  .constant("CONSTANTS", {
    // 'API_URL':'http://localhost:1337/',
    'API_URL':'http://salao7-prod.us-east-1.elasticbeanstalk.com/',
    'PREFIX_IMAGE': 'https://s3-sa-east-1.amazonaws.com/agendamobile/'
  })
  .config(['$stateProvider','$urlRouterProvider','$authProvider','CONSTANTS',function($stateProvider, $urlRouterProvider, $authProvider, CONSTANTS) {

    $urlRouterProvider.otherwise("/main");

    $authProvider.baseUrl = CONSTANTS.API_URL;
    $authProvider.loginUrl = '/auth_professional';
    $authProvider.logoutRedirect = 'login';

    $authProvider.withCredentials = true;
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';

    $authProvider.tokenRoot = null; // set the token parent element if the token is not the JSON root
    $authProvider.tokenName = 'token';

    $stateProvider
      .state('main',
      {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            
            if (!$auth.isAuthenticated())
            {
              $location.path('/login');
            }
            else
            {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
      .state('login',
      {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            
            if ($auth.isAuthenticated())
            {
              $location.path('/main');
            }
            else
            {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
      .state('professionals',
      {
        url: '/team',
        templateUrl: 'views/professionals.html',
        controller: 'ProfessionalsCtrl'
      })
      .state('services',
      {
        url: '/services',
        templateUrl: 'views/propertyhasservice.html',
        controller: 'PropertyhasserviceCtrl'
      })
      .state('professionalPerfil',
      {
        url: '/professional/:professionalId',
        templateUrl: 'views/professionalperfil.html',
        controller: 'ProfessionalperfilCtrl'
      })
      .state('newProperty',
      {
        url: '/cadastro',
        templateUrl: 'views/newproperty.html',
        controller: 'NewpropertyCtrl'
      })
      .state('clients',
      {
        url: '/clients',
        templateUrl: 'views/client.html',
        controller: 'ClientcontrollerCtrl'
      });



  }]).config(['calendarConfig', function(calendarConfig) {

    //console.log(calendarConfig); //view all available config

    //calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; //change the month view template to a custom template

    calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour

    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter

    calendarConfig.i18nStrings.weekNumber = '{week}'; //This will set the week number hover label on the month view

    calendarConfig.allDateFormats.angular.title.week = 'Semana {week} de {year}';

    calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.

    calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.

    calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.

  }])
// .config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyC7TqXjyl25UoxvDI3AjWYCl1n0VfktPs8',
//         v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization'
//     });
// });
'use strict';

/**
 * @ngdoc service
 * @name salao7WebApp.calendarFactory
 * @description
 * # calendarFactory
 * Factory in the salao7WebApp.
 */
angular.module('salao7WebApp')
  .factory('calendarFactory', [ '$http', '$auth', 'propertiesFactory', 'CONSTANTS',
    function ($http, $auth, propertiesFactory, CONSTANTS) {
    // Service logic
    // ...


    // Public API here
    return {
      getEventsList: function (professionalId, callback) {
        $http.get(CONSTANTS.API_URL +  'events/'+ professionalId +'/'+ propertiesFactory.getCurrentPropertyId())
          .success(function(response){
            callback(response);
          })
          .error(function(data, status){
            return ['Erro: ', status];
          });
      },
      getEvent: function (eventId, callback) {
        $http.get(CONSTANTS.API_URL + 'event/'+ eventId)
          .success(function(response){
            callback(response);
          })
          .error(function(data, status){
            return ['Erro: ', status];
          });
      },
      postEvent: function (event, callback) {
        $http.post(CONSTANTS.API_URL + 'event', event)
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      updateEvent: function (event, callback) {
        $http.post(CONSTANTS.API_URL + 'updateEvent', event)
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      cancelEvent: function (event, callback) {
        $http.post(CONSTANTS.API_URL + 'deleteEvent', event)
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
    };
  }]);

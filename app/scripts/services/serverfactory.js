'use strict';

/**
 * @ngdoc service
 * @name salao7WebApp.serverFactory
 * @description
 * # serverFactory
 * Factory in the salao7WebApp.
 */
angular.module('salao7WebApp')
  .factory('serverFactory', [ '$http', 'CONSTANTS', 'userFactory', 'propertiesFactory',
    function ($http, CONSTANTS, userFactory, propertiesFactory) {
    // Service logic
    // ...
    var professional = userFactory.getProfissional();
    
    return {
      getProfessions: function(callback) {
        $http.get(CONSTANTS.API_URL + 'professions')
        .success(function(response){
            callback(response);
          })
          .error(function(data, status){
            return ['Erro: ', status];
          });
      },
      getProfessinal: function(id, callback) {
        $http.get(CONSTANTS.API_URL + 'professional/' + id)
        .success(function(response){
            callback(response);
          })
          .error(function(data, status){
            return ['Erro: ', status];
          });
      },
      updateProfessinal: function(professional, callback) {
        $http.post(CONSTANTS.API_URL + 'updateProfessional/', professional)
        .success(function(response){
            callback(null, response);
          })
          .error(function(data, status){
            callback(status);
          });
      },
      getProfessionalsByProperty: function (callback) {
        $http.get(CONSTANTS.API_URL + 'professionals/' + propertiesFactory.getCurrentPropertyId())
        .success(function(response){
            callback(response);
          })
          .error(function(data, status){
            return ['Erro: ', status];
          });
      },
      getServicesProfessional: function (professionalId, callback) {
        $http.get(CONSTANTS.API_URL + 'servicesProfessional/' + professionalId)
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      getUsersByProperty: function (callback) {
        $http.get(CONSTANTS.API_URL + 'usersProperty/' + propertiesFactory.getCurrentPropertyId())
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      getServicesByProperty: function (callback) {
        $http.get(CONSTANTS.API_URL + 'propertyHasServices/' + propertiesFactory.getCurrentPropertyId())
        .success(function(response){
          callback(response);
          console.log(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      getAllServices: function (callback) {
        $http.get(CONSTANTS.API_URL + 'services')
        .success(function(response){
          callback(response);
          console.log(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      postService: function (service, callback) {
        $http.post(CONSTANTS.API_URL + 'services', service)
        .success(function(response){
          callback(response);
          console.log(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      checkAvailabilityStart: function (start, callback) {
        $http.post(CONSTANTS.API_URL + 'checkAvailabilityStart', {start: start})
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      checkAvailabilityEnds: function (ends, callback) {
        $http.post(CONSTANTS.API_URL + 'checkAvailabilityEnds', {ends: ends})
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      postPropertyHasService: function (service, callback) {
        $http.post(CONSTANTS.API_URL + 'propertyHasServices', service)
        .success(function(response){
          callback(response);
          console.log(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      getOnePropertyHasService: function (id, callback) {
        $http.get(CONSTANTS.API_URL + 'onePropertyHasServices/' + id)
        .success(function(response){
          callback(response);
          console.log(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      getProfessionalHasService: function (id, callback) {
        $http.get(CONSTANTS.API_URL + 'professionalHasServices/' + id)
        .success(function(response){
          callback(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      updatePropertyHasService: function (service, callback) {
        $http.post(CONSTANTS.API_URL + 'updatePropertyHasServices', service)
        .success(function(response){
          callback(response);
          console.log(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      deletePropertyHasService: function (id, callback) {
        $http.delete(CONSTANTS.API_URL + 'deletePropertyHasServices/' + id)
        .success(function(response){
          callback(response);
          console.log(response);
        })
        .error(function(data, status){
          return ['Erro: ', status];
        });
      },
      postUser: function (user, callback) {
        $http.post(CONSTANTS.API_URL + 'user/'+ propertiesFactory.getCurrentPropertyId(), user)
        .success(function(response){
          callback(null, response);
          console.log(response);
        })
        .error(function(data, status){
          return callback(data);
        });
      },
      updateUser: function (user, callback) {
        $http.post(CONSTANTS.API_URL + 'updateUser/', user)
        .success(function(response){
          callback(null, response);
          console.log(response);
        })
        .error(function(data, status){
          return callback(data);
        });
      },
      deleteClient: function (id, callback) {
        $http.delete(CONSTANTS.API_URL + 'deleteClient/' + id)
        .success(function(response){
          callback(null, response);
          console.log(response);
        })
        .error(function(data, status){
          return callback(data);
        });
      },
      deleteProfessional: function (id, callback) {
        $http.delete(CONSTANTS.API_URL + 'removeProfessional/' + id)
        .success(function(response){
          callback(null, response);
        })
        .error(function(data, status){
          return callback(data);
        });
      },
      activeProfessional: function (id, callback) {
        $http.put(CONSTANTS.API_URL + 'activeProfessional/' + id)
        .success(function(response){
          callback(null, response);
        })
        .error(function(data, status){
          return callback(data);
        });
      },
    }
  }]);

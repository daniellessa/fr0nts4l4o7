'use strict';

/**
 * @ngdoc service
 * @name salao7WebApp.propertiesFactory
 * @description
 * # propertiesFactory
 * Factory in the salao7WebApp.
 */
angular.module('salao7WebApp')
  .factory('propertiesFactory', [ '$http', 'CONSTANTS', 'userFactory', '$state',
    function ($http, CONSTANTS, userFactory, $state) {
    // Service logic
    // ...

    var currentProperty = null;
    var properties = [];



    // Public API here
    return {
      loadProperties: function (cb) {
        $http.get(CONSTANTS.API_URL + 'propertiesProfessional')
        .success(function(propertiesServer){
            if(propertiesServer.length > 0)
            {
              properties = propertiesServer;
              currentProperty = propertiesServer[0];
            }
            return cb(null,propertiesServer);

          })
          .error(function(data, status){
            return cb(status);
          });
      },
      getProperties: function () {
        return properties;
      },
      getCurrentProperty: function () {
        return currentProperty;
      },
      getCurrentPropertyId: function () {
        if(currentProperty){
          return currentProperty.id;
        }else{
          $state.go('main')
        }
         
      },
      setCurrentProperty: function (property) {
        currentProperty = property;
        console.log(currentProperty);
      },
        
    };

  }]);

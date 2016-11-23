'use strict';

/**
 * @ngdoc service
 * @name salao7WebApp.userFactory
 * @description
 * # userFactory
 * Factory in the salao7WebApp.
 */
angular.module('salao7WebApp')
  .factory('userFactory', ['$auth', function ($auth) {
    // Service logic
    // ...

    var profissional = null;
    try{
      profissional = {
          id: $auth.getPayload().id,
          email: $auth.getPayload().email,
          user: {
            id:$auth.getPayload().user.id,
            name:$auth.getPayload().user.name,
            phone:$auth.getPayload().user.phone,
            sex:$auth.getPayload().user.sex,
            bucketName:$auth.getPayload().user.bucketName,
            photoPath:$auth.getPayload().user.photoPath,
            url:$auth.getPayload().user.url
          },
          profession: {
            id:$auth.getPayload().profession.id,
            name:$auth.getPayload().profession.name,
          },
          properties:$auth.getPayload().properties
        };
        console.log(properties);
    }catch(err){

    }

    // Public API here
    return {
      getProfissional: function () {
        return profissional;
      },
      isAuthenticated: function() {
        return $auth.isAuthenticated();
      },
    };
  }]);

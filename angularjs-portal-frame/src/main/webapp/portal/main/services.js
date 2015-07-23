'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.main.services', []);

  app.factory('mainService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC) {
    var prom = $http.get(SERVICE_LOC.sessionInfo, { cache: true});
    var sidebarPromise = $http.get(SERVICE_LOC.sidebarInfo, { cache: true});
    var welcomePromise = $http.get(SERVICE_LOC.welcomeInfo, { cache: true});
    var userPromise;

    var getUser = function() {
      if (userPromise) {
        return userPromise;
      }

      userPromise = prom.then(
          function(data, status) { //success function
            return data.data.person;
          }, function(data, status) { // failure function
            miscService.redirectUser(status, "Get User Info");
          });
      return userPromise;
    };

    var getSidebar = function() {
      return sidebarPromise.success(
          function(data, status) { //success function
            return data.sidebar;
          }).error(function(data, status) { // failure function
            miscService.redirectUser(status, "Get sidebar info");
          });
    };
    
    var getWelcome = function() {
      return welcomePromise.success(
        function(data, status) { //success function
          return data.welcome;
        }).error(function(data, status) { // failure function
          miscService.redirectUser(status, "Get welcome info");
        });
    };

    return {
      getUser: getUser,
      getSidebar : getSidebar,
      getWelcome : getWelcome
    };

  }]);

  return app;

});


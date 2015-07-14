'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.notifications.services', []);

  app.factory('notificationsService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC) {
      
      var getAllNotifications = function() {
          if(SERVICE_LOC.notificationsURL) {
              return $http.get(SERVICE_LOC.notificationsURL, {cache : true}).then(
                  function(result) {
                      return  result.data.notifications;
                  } ,
                  function(reason){
                      miscService.redirectUser(reason.status, 'notifications json feed call');
                  }
              );
          } else {
              return null;
          }
      };
      
      return {
          getAllNotifications: getAllNotifications
      };

  }]);

  return app;

});


'use strict';

define(['angular', 'jquery'], function(angular, $) {

  var app = angular.module('portal.notifications.services', []);

  app.factory('notificationsService', ['$q','$http', 'miscService', 'SERVICE_LOC', function($q, $http, miscService, SERVICE_LOC) {
      var filteredNotificationPromise;
      var notificationPromise = $http.get(SERVICE_LOC.notificationsURL, {cache : true}).then(
                                              function(result) {
                                                  return  result.data.notifications;
                                              } ,
                                              function(reason){
                                                  miscService.redirectUser(reason.status, 'notifications json feed call');
                                              }
                                          );
      var groupPromise = $http.get(SERVICE_LOC.groupURL, {cache : true}).then (
                                    function(result){
                                      return result.data.groups;
                                    },function(reason){
                                      miscService.redirectUser(reason.status, 'group json feed call');
                                    });
      var getAllNotifications = function() {
          return notificationPromise;
      };

      var getNotificationsByGroups = function() {
        var successFn, errorFn;
        //if it already happened, just return it
        if(filteredNotificationPromise) {
          return filteredNotificationPromise;
        }

        successFn = function(result){
          //post processing
          var groups = result[1], allNotifications = result[0];
          var notificationsByGroup = [];
          $.each(allNotifications, function (index, notification){ //for each notification
            var added = false;
            $.each(notification.groups, function(index, group) { //for each group for that notification
              if(!added) {
                var inGroup = $.grep(groups, function(e) {return e.name === group}).length; //intersect, then get length
                if(inGroup > 0) {//are they in that group?
                  notificationsByGroup.push(notification); //they should see this notification
                  added = true;
                }
              }
            });
          });

          return notificationsByGroup;
        }

        errorFn = function(reason) {
          miscService.redirectUser(reason.status, 'q for filtered notifications');
        }

        //setup new q
        filteredNotificationPromise = $q.all([notificationPromise, groupPromise]).then(successFn, errorFn);

        return filteredNotificationPromise;
      };

      return {
          getAllNotifications: getAllNotifications,
          getNotificationsByGroups : getNotificationsByGroups
      };

  }]);

  return app;

});

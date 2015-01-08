'use strict';

(function() {
  var app = angular.module('portal.notification.directives', []);

  app.directive('notifications', function(){

      return {
        restrict : 'E',
        templateUrl : 'partials/notifications.html'
      }
    });
  
  app.directive('notificationBell', function(){
      return {
          restrict : 'E',
          templateUrl : 'partials/notification-bell.html'
        }
  });

})();

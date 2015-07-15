'use strict';

define(['angular', 'require'], function(angular, require){

    var app = angular.module('portal.notifications.directives', []);

    app.directive('notifications', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/notifications.html')
        }
    });

    app.directive('notificationBell', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/notification-bell.html')
        }
    });

    return app;

});


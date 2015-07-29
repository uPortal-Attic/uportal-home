define(['angular', 'jquery', 'portal', 'portal/main/route', 'portal/settings/routes', 'portal/notifications/route'], function(angular, $, portal, main, settings, notifications) {
    /*
     This module intentionally left empty. This file is intended to serve as an extension point
     for My UW Madison 'App' developers that overlay angularjs-portal-frame.

     For more information, see: https://github.com/UW-Madison-DoIT/my-app-seed
     */
    var app = angular.module('my-app', ['portal']);

    // Example route configuration
    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/settings', settings.settings).
            when('/material', settings.material).
            when('/notifications', notifications).
            otherwise(main);
    }]);

    return app

});


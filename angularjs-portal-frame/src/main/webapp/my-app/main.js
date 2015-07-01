define(['angular', 'jquery', 'portal', 'portal/main/route', 'portal/settings/route'], function(angular, $, portal, main, settings) {
    /*
     This module intentionally left empty. This file is intended to serve as an extension point
     for My UW Madison 'App' developers that overlay angularjs-portal-frame.

     For more information, see: https://github.com/UW-Madison-DoIT/my-app-seed
     */
    var app = angular.module('my-app', ['portal']);

    // Example route configuration
    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider.
            state('/settings', settings).
            /* when('/notifications', {templateUrl: require.toUrl('./partials/notifications-full.html')}). */
            otherwise(main);
    }]);

    return app

});


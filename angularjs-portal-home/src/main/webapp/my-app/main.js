define([
    'angular',
    'require',
    './features/route',
    './marketplace/routes',
    './layout/list/route',
    'portal/notifications/route',
    'portal/settings/route',
    './layout/static/routes',
    './layout/widget/route',
    'portal',
    'app-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './layout/controllers',
    './layout/directives',
    './layout/services',
    './layout/static/controllers',
    './layout/static/directives',
    './layout/widget/controllers',
    './layout/widget/directives',
    './marketplace/controllers',
    './marketplace/directives',
    './marketplace/services',
    './notifications/controllers',
    './notifications/directives',
    './search/controllers'
], function(angular, require, featuresRoute, marketplaceRoutes, listRoute, notificationsRoute, settingsRoute, staticRoutes, widgetRoute) {

    var app = angular.module('my-app', [
        'app-config',
        'my-app.layout.controllers',
        'my-app.layout.directives',
        'my-app.layout.services',
        'my-app.layout.static.controllers',
        'my-app.layout.static.directives',
        'my-app.layout.widget.controllers',
        'my-app.layout.widget.directives',
        'my-app.marketplace.controllers',
        'my-app.marketplace.directives',
        'my-app.marketplace.services',
        'my-app.search.controllers',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal'
    ]);

    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/apps', marketplaceRoutes.main).
            when('/apps/details/:fname', marketplaceRoutes.details).
            when('/apps/search/:initFilter', marketplaceRoutes.main).
            when('/features', featuresRoute).
            when('/list', listRoute).
            when('/notifications', notificationsRoute).
            when('/settings', settingsRoute).
            when('/static/:fname', staticRoutes.staticMax).
            when('/exclusive/:fname', staticRoutes.exclusiveMax).
            when('/widgets', widgetRoute).
            otherwise({ redirectTo : '/list'});
    }]);


    return app;

});


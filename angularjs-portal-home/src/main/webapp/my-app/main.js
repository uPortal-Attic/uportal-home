define([
    'angular',
    'require',
    './features/route',
    './marketplace/routes',
    './layout/list/route',
    './notifications/route',
    'portal/settings/route',
    './layout/static/route',
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
], function(angular, require, featuresRoute, marketplaceRoutes, listRoute, notificationsRoute, settingsRoute, staticRoute, widgetRoute) {

    var app = angular.module('my-app', [
        'app-config',
        'my-app.layout.controllers',
        'my-app.layout.directives',
        'my-app.layout.services',
        'my-app.layout.widget.controllers',
        'my-app.layout.widget.directives',
        'my-app.marketplace.controllers',
        'my-app.marketplace.directives',
        'my-app.marketplace.services',
        'my-app.notifications.controllers ',
        'my-app.notifications.directives',
        'my-app.search.controllers',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal'
    ]);

    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/apps', marketplaceRoutes.main).
            when('/apps/details/:fname', marketplaceRoutes.details).
            when('/apps/search/:initFilter', marketplaceRoutes.main).
            when('/features', featuresRoute).
            when('/list', listRoute).
            when('/notifications', notificationsRoute).
            when('/settings', settingsRoute).
            when('/static/:fname', staticRoute).
            when('/widgets', widgetRoute).
            otherwise({ redirectTo : '/list'});
    }]);

    return app;

});


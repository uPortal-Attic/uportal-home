define([
    'angular',
    'require',
    'portal',
    'app-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './layout/controllers',
    './layout/directives',
    './layout/services',
    './layout/widget/controllers',
    './marketplace/controllers',
    './marketplace/directives',
    './marketplace/services',
    './notifications/controllers',
    './notifications/directives',
    './search/controllers'
], function(angular, require, portal) {

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
        'my-app.notification.controllers ',
        'my-app.notification.directives',
        'my-app.search.controllers',
        'ngRoute',
        'ngSanitize',
        'ngStorage'
    ]);

    // This replaces the routing configuration of portal, defined in the frame project, NOT the my-app module defined here
    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    portal.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/apps', {templateUrl: require.toUrl('./partials/marketplace.html')}).
            when('/apps/details/:fname', {templateUrl: require.toUrl('./partials/marketplace-details.html'), controller:'MarketplaceDetailsController'}).
            when('/apps/search/:initFilter', {templateUrl: require.toUrl('./partials/marketplace.html')}).
            when('/features', {templateUrl: require.toUrl('./partials/features.html')}).
            when('/list', {templateUrl: require.toUrl('./partials/home-list-view.html')}).
            when('/notifications', {templateUrl: require.toUrl('./partials/notifications-full.html')}).
            when('/settings', {templateUrl: require.toUrl('./partials/settings.html')}).
            when('/static/:fname', {templateUrl: require.toUrl('./partials/static-content-max.html')}).
            when('/widgets', {templateUrl: require.toUrl('./partials/home-widget-view.html')}).
            otherwise({ redirectTo : '/list'});
    }]);

    return app;

});


define([
    'angular',
    'require',
    'app-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './layout/controllers',
    './layout/directives',
    './layout/services',
    './layout/widget/controllers',
    './main/controllers',
    './main/directives',
    './main/services',
    './marketplace/controllers',
    './marketplace/directives',
    './marketplace/services',
    './misc/controllers',
    './misc/directives',
    './misc/filters',
    './misc/services',
    './notifications/controllers',
    './notifications/directives',
    './search/controllers',
    'ui-bootstrap',
    'ui-gravatar',
    'sortable'
], function(angular, require) {

    var app = angular.module('portal', [
        'app-config',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal.layout.controllers',
        'portal.layout.directives',
        'portal.layout.services',
        'portal.layout.widget.controllers',
        'portal.layout.widget.directives',
        'portal.main.controllers',
        'portal.main.directives',
        'portal.main.services',
        'portal.marketplace.controllers',
        'portal.marketplace.directives',
        'portal.marketplace.services',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.services',
        'portal.notification.controllers ',
        'portal.notification.directives',
        'portal.search.controllers',
        'ui.bootstrap',
        'ui.gravatar',
        'ui.sortable'
    ]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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


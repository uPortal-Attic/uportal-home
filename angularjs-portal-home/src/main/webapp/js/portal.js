define(['angular', 'ngRoute'], function(angular, ngRoute) {

    var app = angular.module('portal', [
        'app-config',
        'ngRoute',
        'ngStorage',
        'ui.bootstrap',
        'ngSanitize',
        'ui.sortable',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.service',
        'portal.main.controllers',
        'portal.main.service',
        'portal.layout.directives',
        'portal.layout.controllers',
        'portal.layout.widget.controllers',
        'portal.layout.service',
        'portal.search.controllers',
        'portal.main.directives',
        'portal.marketplace.controller',
        'portal.marketplace.service',
        'portal.marketplace.directives',
        'portal.notification.controller',
        'portal.notification.directives'
    ]);
    app.config(['$routeProvider',function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/apps', {templateUrl: 'portal.partials/marketplace.html'}).
            when('/features', {templateUrl: 'portal.partials/features.html'}).
            when('/settings', {templateUrl: 'portal.partials/settings.html'}).
            when('/notifications', {templateUrl: 'portal.partials/notifications-full.html'}).
            when('/apps/details/:fname', {templateUrl: 'portal.partials/marketplace-details.html', controller:'MarketplaceDetailsController'}).
            when('/apps/search/:initFilter', {templateUrl: 'portal.partials/marketplace.html'}).
            when('/static/:fname', {templateUrl: 'portal.partials/static-content-max.html'}).
            when('/widgets', {templateUrl: 'portal.partials/home-widget-view.html'}).
            when('/list', {templateUrl: 'portal.partials/home-list-view.html'}).
            otherwise({ redirectTo : '/list'});
    }]);

    return app;

});


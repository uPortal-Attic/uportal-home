define([
    'angular',
    'require',
    './marketplace/routes',
    './layout/list/route',
    'portal/notifications/route',
    'portal/settings/routes',
    'portal/features/route',
    'portal/about/route',
    './layout/route',
    './layout/static/routes',
    './layout/widget/routes',
    './search/routes',
    'portal',
    'app-config',
    '../js/web-config',
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
    './rating/components',
    './rating/controllers',
    './search/controllers',
    './search/directives',
    './search/services',
], function(angular, require, marketplaceRoutes, listRoute, notificationsRoute, portalSettingsRoutes,
			featuresRoute, aboutRoute, layoutRoute, staticRoutes, widgetRoutes, searchRoutes) {
    let app = angular.module('my-app', [
        'app-config',
        'web-config',
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
        'my-app.rating.components',
        'my-app.rating.controllers',
        'my-app.search.controllers',
        'my-app.search.directives',
        'my-app.search.services',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal',
    ]);

    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/apps', marketplaceRoutes.main).
            when('/apps/browse/:initFilter', marketplaceRoutes.main).
            when('/apps/details/:fname', marketplaceRoutes.details).
            when('/apps/search/:initFilter', searchRoutes.search).
            when('/compact', listRoute).
            when('/expanded', widgetRoutes.widgetView).
            when('/notifications', notificationsRoute).
            when('/settings', portalSettingsRoutes.betaSettings).
            when('/user-settings', portalSettingsRoutes.userSettings).
            when('/features', featuresRoute).
            when('/static/:fname', staticRoutes.staticMax).
            when('/exclusive/:fname', staticRoutes.exclusiveMax).
            when('/widget/:fname', widgetRoutes.widgetFullScreen).
            when('/about', aboutRoute).
            when('/widget-creator', widgetRoutes.widgetCreator).
            otherwise(layoutRoute);
    }]);


    return app;
});

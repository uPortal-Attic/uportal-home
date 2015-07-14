define([
    'angular',
    'require',
    './features/route',
    './marketplace/routes',
    './layout/list/route',
    './notifications/route',
    'portal/settings/route',
    './layout/static/routes',
    './layout/widget/route',
    'portal',
    'app-config',
    'ui-router',
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
        'my-app.notifications.controllers ',
        'my-app.notifications.directives',
        'my-app.search.controllers',
        'ui.router',
        'ngSanitize',
        'ngStorage',
        'portal'
    ]);

    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider.
            state(marketplaceRoutes.main).
            state(marketplaceRoutes.details).
            state(marketplaceRoutes.search).
            state(featuresRoute).
            state(listRoute).
            state(notificationsRoute).
            state(settingsRoute).
            state(staticRoutes.staticMax).
            state(staticRoutes.exclusiveMax).
            state(widgetRoute);
        $urlRouterProvider.otherwise('/list');
    }]);

    return app;

});


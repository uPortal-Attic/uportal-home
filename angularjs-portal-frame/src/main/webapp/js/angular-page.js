define(['angular', 'angular-route', 'angular-sanitize', 'ng-storage', 'ui-bootstrap', 'sortable', 'main-controllers', 'main-directives', 'main-service', 'search-controller', 'services', 'controllers', 'directives', 'filters', 'app-config'], function(angular) {

    var app = angular.module('portal', [
        'ngRoute',
        'ngStorage',
        'ui.bootstrap',
        'ngSanitize',
        'ui.sortable',
        'app-config',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.service',
        'portal.main.controllers',
        'portal.main.service',
        'portal.main.directives',
        'portal.search.controllers'
    ]);

    app.config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/settings', {templateUrl: 'partials/settings.html'}).
            /* when('/notifications', {templateUrl: 'partials/notifications-full.html'}). */
            otherwise({templateUrl: 'partials/main.html'});
    }]);

    return app;

});


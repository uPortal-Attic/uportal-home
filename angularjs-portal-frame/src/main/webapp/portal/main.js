define([
    'angular',
    'require',
    'app-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './main/controllers',
    './main/directives',
    './main/services',
    './misc/controllers',
    './misc/directives',
    './misc/filters',
    './misc/services',
    './search/controllers',
    './search/directives',
    '../js/sortable',
    'ui-bootstrap'
], function(angular, require) {

    var app = angular.module('portal', [
        'app-config',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal.main.controllers',
        'portal.main.directives',
        'portal.main.services',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.services',
        'portal.search.controllers',
        'portal.search.directives',
        'ui.bootstrap',
        'ui.sortable'
    ]);

    app.config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/settings', {templateUrl: require.toUrl('./partials/settings.html')}).
            /* when('/notifications', {templateUrl: require.toUrl('./partials/notifications-full.html')}). */
            otherwise({templateUrl: require.toUrl('./partials/main.html')});
    }]);

    return app;

});


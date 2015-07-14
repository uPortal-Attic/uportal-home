define([
    'angular',
    'require',
    'app-config',
    'ngSanitize',
    'ngStorage',
    './main/controllers',
    './main/directives',
    './main/services',
    './misc/controllers',
    './misc/directives',
    './misc/filters',
    './misc/services',
    './notifications/services',
    './search/controllers',
    './search/directives',
    'sortable',
    'ui-bootstrap',
    'ui-gravatar'
], function(angular, require) {

    var app = angular.module('portal', [
        'app-config',
        'ngSanitize',
        'ngStorage',
        'portal.main.controllers',
        'portal.main.directives',
        'portal.main.services',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.services',
        'portal.notifications.services',
        'portal.search.controllers',
        'portal.search.directives',
        'ui.bootstrap',
        'ui.gravatar',
        'ui.sortable'
    ]);

    return app;

});


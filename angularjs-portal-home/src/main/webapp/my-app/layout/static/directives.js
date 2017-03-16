'use strict';

define(['angular', 'require'], function(angular, require) {

    let app = angular.module('my-app.layout.static.directives', []);

    app.directive('staticContentCard', function() {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('./partials/static-content-card.html'),
        };
    });

    app.directive('staticContentCardMax', function() {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('./partials/static-content-card-max.html'),
        };
    });

    return app;

});


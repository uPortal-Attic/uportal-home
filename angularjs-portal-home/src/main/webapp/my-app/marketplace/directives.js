'use strict';

define(['angular', 'require'], function(angular, require) {

    var app = angular.module('my-app.marketplace.directives', []);
    app.directive('marketplaceEntry', function() {
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/marketplace-entry.html')
        }
    });

    app.directive('ratingModalTemplate', function() {
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/rating-modal-template.html')
        }
    });

    return app;

});


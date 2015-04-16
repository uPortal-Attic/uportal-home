'use strict';

define(['angular', 'require'], function(angular, require) {

    var app = angular.module('portal.marketplace.directives', []);
    app.directive('marketplacePortlet', function() {
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/marketplace-portlet.html')
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


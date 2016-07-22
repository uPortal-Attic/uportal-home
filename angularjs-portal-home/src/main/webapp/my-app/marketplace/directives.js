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

	app.directive('marketplaceNoResults', function() {
		return {
			restrict : 'E',
			templateUrl : require.toUrl('./partials/marketplace-no-results.html')
		}
	});

	app.directive('marketplaceLoadMore', function() {
		return {
			restrict : 'E',
			templateUrl : require.toUrl('./partials/marketplace-load-more.html')
		}
	});

    return app;

});


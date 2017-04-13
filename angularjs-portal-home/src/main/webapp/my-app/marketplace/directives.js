'use strict';

define(['angular', 'require'], function(angular, require) {
    return angular.module('my-app.marketplace.directives', [])
    .directive('marketplaceEntry', function() {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('./partials/marketplace-entry.html'),
        };
    })

  .directive('marketplaceNoResults', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/marketplace-no-results.html'),
    };
  })

  .directive('marketplaceLoadMore', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/marketplace-load-more.html'),
    };
  });
});

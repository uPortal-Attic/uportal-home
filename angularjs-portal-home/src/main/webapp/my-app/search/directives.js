'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('my-app.search.directives', [])

  .directive('marketplaceResults', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/marketplace-results.html'),
    };
  })

  .directive('directoryResults', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/directory-results.html'),
    };
  })

  .directive('campusDomainResults', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/campus-domain-results.html'),
    };
  });
});

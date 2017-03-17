'use strict';

define(['angular', 'require'], function(angular, require) {
  var app = angular.module('my-app.search.directives', []);

  app.directive('marketplaceResults', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/marketplace-results.html'),
    };
  });

  app.directive('directoryResults', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/directory-results.html'),
    };
  });

  app.directive('campusDomainResults', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/campus-domain-results.html'),
    };
  });

  return app;
});

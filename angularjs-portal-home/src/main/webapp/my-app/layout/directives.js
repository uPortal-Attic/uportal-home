'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('my-app.layout.directives', [])

  .directive('portletIcon', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/portlet-icon.html'),
    };
  })

  .directive('marketplaceLight', function() {
    return{
      restrict: 'E',
      templateUrl: require.toUrl('./partials/marketplace-light.html'),
    };
  })

  .directive('homeHeader', function() {
    return{
      restrict: 'E',
      templateUrl: require.toUrl('./partials/home-header.html'),
    };
  })

  .directive('homeToggle', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/home-toggle.html'),
        controller: 'ToggleController',
      };
  })

  .directive('removeButton', function() {
    return {
      restrict: 'E',
      controller: 'LayoutController',
      templateUrl: require.toUrl('./partials/remove-button.html'),
    };
  });
});

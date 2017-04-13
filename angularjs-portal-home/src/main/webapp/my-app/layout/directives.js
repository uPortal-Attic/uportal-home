'use strict';

define(['angular', 'require'], function(angular, require) {
    var app = angular.module('my-app.layout.directives', []);

    // Compact Mode
    app.directive('defaultCard', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/default-card.html'),
      };
    });

    app.directive('portletIcon', function() {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('./partials/portlet-icon.html'),
        };
    });

    app.directive('marketplaceLight', function() {
        return{
            restrict: 'E',
            templateUrl: require.toUrl('./partials/marketplace-light.html'),
        };
    });

    app.directive('homeHeader', function() {
        return{
            restrict: 'E',
            templateUrl: require.toUrl('./partials/home-header.html'),
        };
    });

    app.directive('homeToggle', function() {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('./partials/home-toggle.html'),
            controller: 'ToggleController',
        };
    });

    app.directive('removeButton', function() {
      return {
          restrict: 'E',
          controller: 'LayoutController',
          templateUrl: require.toUrl('./partials/remove-button.html'),
      };
  });

    return app;
});


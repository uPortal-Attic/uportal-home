'use strict';

/*
  DEPRECATED
*/

define(['angular', 'require'], function(angular, require) {
    return angular.module('my-app.layout.static.directives', [])

    .directive('staticContentCard', function() {
        return {
          restrict: 'E',
          templateUrl: require.toUrl('./partials/static-content-card.html'),
        };
    })

    .directive('staticContentCardMax', function() {
        return {
          restrict: 'E',
          templateUrl:
              require.toUrl('./partials/static-content-card-max.html'),
        };
    });
});

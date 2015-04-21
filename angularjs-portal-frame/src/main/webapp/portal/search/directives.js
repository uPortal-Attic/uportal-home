'use strict';

define(['angular', 'require'], function(angular, require) {

  var app = angular.module('portal.search.directives', []);

  app.directive('search', [function() {
    return {
      restrict : 'E',
      templateUrl : require.toUrl('./partials/search.html'),
      controller: 'SearchController'
    }
  }]);

  return app;

});


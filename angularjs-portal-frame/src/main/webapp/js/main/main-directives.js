'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.main.directives', []);

  app.directive('portalHeader', function() {
    return {
      restrict : 'E',
      templateUrl : 'partials/header.html'
    }
  });

  app.directive('sideBarMenu', function(){
    return {
      restrict : 'E',
      templateUrl : 'partials/sidebar-left.html'
    }
  });

  app.directive('search', [function() {
    return {
      restrict : 'E',
      templateUrl : 'partials/search.html',
      controller: 'SearchController'
    }
  }]);

  app.directive('username', function() {
    return {
      restrict : 'E',
      templateUrl : 'partials/username.html'
    }
  });

  app.directive('siteFooter', function() {
      return {
        restrict : 'E',
        templateUrl : 'partials/footer.html'
      }
    });

  app.directive('betaHeader', function() {
      return {
          restrict : 'E',
          templateUrl : 'partials/beta-header.html'
      }
  });

  return app;

});


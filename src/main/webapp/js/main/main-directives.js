'use strict';

(function() {
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

  app.directive('search', function() {
    return {
      restrict : 'E',
      templateUrl : 'partials/search.html'
    }
  });

  app.directive('username', function() {
    return {
      restrict : 'E',
      templateUrl : 'partials/username.html'
    }
  });

  app.directive('marketplacePortlet', function() {
    return {
      restrict : 'E',
      templateUrl : 'partials/marketplace-portlet.html'
    }
  });

  app.directive('siteFooter', function() {
    return {
      restrict : 'E',
      templateUrl : 'partials/footer.html'
    }
  });

})();

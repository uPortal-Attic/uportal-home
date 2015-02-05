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

  app.directive('search', ['miscService', 'marketplaceService', '$location', function(miscService, marketplaceService, $location) {
    return {
      restrict : 'E',
      templateUrl : 'partials/search.html',
      controller: function($scope) {
          $scope.initialFilter = '';
          $scope.filterMatches = [];
          $scope.portletListLoading = true;
          marketplaceService.getPortlets().then(function(data){
              $scope.portlets = data.portlets;
              $scope.portletListLoading = false;
          });

          $scope.$watch('initialFilter', function(newVal, oldVal) {
              if (!newVal || !$scope.portlets) {
                  $scope.filterMatches = [];
                  return;
              }

              $scope.filterMatches = miscService.filterPortletsBySearchTerm($scope.portlets, newVal);
          });

          $scope.onSelect = function(portlet) {
              $scope.initialFilter = portlet.name;
              $location.path("/apps/search/" + $scope.initialFilter);
          };
      }
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

})();

'use strict';

(function() {
  var app = angular.module('portal.search.controllers', []);
  app.controller('SearchController', [ 'miscService', '$location', '$scope', '$localStorage', function(miscService, $location, $scope, $localStorage) {
      $scope.initialFilter = '';
      $scope.filterMatches = [];
      $scope.portletListLoading = true;
      if($localStorage && $localStorage.typeaheadSearch) {
          //TODO : Add in search for somewhere for frame
      }

      $scope.$watch('initialFilter', function(newVal, oldVal) {
          if (!newVal || !$scope.portlets) {
              $scope.filterMatches = [];
              return;
          }

          $scope.filterMatches = [];//this is where you would run your filter function
      });

      $scope.onSelect = function(portlet) {
          $scope.initialFilter = portlet.name;
          $location.path("/apps/search/" + $scope.initialFilter);
      };
    }]);
})();
'use strict';

define(['angular'], function(angular) {

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
              $location.path("/apps/search/"+ portlet.name);
              $scope.initialFilter = "";
              $scope.showSearch = false;
              $scope.showSearchFocus = false;
      };

      $scope.submit = function(){
          if($scope.initialFilter != "") {
            $location.path("/apps/search/"+ $scope.initialFilter);
            $scope.initialFilter = "";
            $scope.showSearch = false;
            $scope.showSearchFocus = false;
          }
        };
    }]);

    return app;

});

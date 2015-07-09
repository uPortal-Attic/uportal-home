'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.search.controllers', []);
  app.controller('SearchController', [ 'miscService', '$location', '$scope', '$localStorage','SEARCH', function(miscService, $location, $scope, $localStorage, SEARCH) {
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
          if(SEARCH.isWeb) {
              $location.path("apps/search/"+ portlet.name);
              $scope.initialFilter = "";
              $scope.showSearch = false;
              $scope.showSearchFocus = false;
          } else {
              //frame app redirect
              window.location = SEARCH.searchURL + portlet.name;
          }
      };

      $scope.submit = function(){
          if($scope.initialFilter != "") {
            if(SEARCH.isWeb) {
                $location.path("apps/search/"+ $scope.initialFilter);
                $scope.initialFilter = "";
                $scope.showSearch = false;
                $scope.showSearchFocus = false;
            } else {
                //frame app redirect
                window.location = SEARCH.searchURL + $scope.initialFilter;
            }
          }
        };
    }]);

    return app;

});

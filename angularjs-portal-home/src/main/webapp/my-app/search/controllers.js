'use strict';

define(['angular', 'portal/search/controllers'], function(angular) {

    var app = angular.module('my-app.search.controllers', ['portal.search.controllers']);
    app.controller('SearchController', [ 'marketplaceService', '$location', '$scope', '$localStorage', function(marketplaceService, $location, $scope, $localStorage) {
        $scope.initialFilter = '';
        $scope.filterMatches = [];
        $scope.portletListLoading = true;
        if($localStorage && $localStorage.typeaheadSearch) {
            marketplaceService.getPortlets().then(function(data){
                $scope.portlets = data.portlets;
                $scope.portletListLoading = false;
            });
        }

        $scope.$watch('initialFilter', function(newVal, oldVal) {
            if (!newVal || !$scope.portlets) {
                $scope.filterMatches = [];
                return;
            }

            $scope.filterMatches = marketplaceService.filterPortletsBySearchTerm($scope.portlets, newVal);
        });

        $scope.onSelect = function(portlet) {
            $location.path("apps/details/"+ portlet.fname);
            $scope.initialFilter = "";
            $scope.showSearch = false;
            $scope.showSearchFocus = false;
        };

        $scope.submit = function(){
            if($scope.initialFilter != "") {
                $location.path("apps/search/"+ $scope.initialFilter);
                $scope.initialFilter = "";
                $scope.showSearch = false;
                $scope.showSearchFocus = false;
            }
        };
    }]);
    
    app.controller('SearchResultController', [function() {
      //scope functions
      $scope.searchTermFilter = function(portlet) {
          return marketplaceService.portletMatchesSearchTerm(portlet, $scope.searchTerm, {
              searchDescription: true,
              searchKeywords: true,
              defaultReturn : true
          });
      };
      
      $scope.toggleShowAll = function() {
          $scope.showAll = !$scope.showAll;
      };
      
      var init = function(){
        $scope.sortParameter = ['-rating','-userRated'];
        $scope.portlets = [];
        $scope.searchText = $scope.searchTerm;
        $scope.searchResultLimit = 20;
        $scope.showAll = false;
        
        //get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            $scope.portlets = data.portlets;
        });
      };
      init();
    }]);

    return app;

});


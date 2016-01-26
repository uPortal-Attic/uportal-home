'use strict';

define(['angular', 'portal/search/controllers', 'my-app/marketplace/controllers'], function(angular) {

    var app = angular.module('my-app.search.controllers', ['portal.search.controllers', 'my-app.marketplace.controllers']);
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
    
    app.controller('SearchResultController', 
     ['$scope', '$controller','marketplaceService', 'googleCustomSearchService',
     function($scope, $controller,marketplaceService, googleCustomSearchService) {
      var base = $controller('marketplaceCommonFunctions', {$scope : $scope});
      
      var recalcTotalCount = function(){
        //all results are set to arrays by the time this is called.
        $scope.totalCount = $scope.googleResults.length + $scope.myuwResults.length;
      }
      
      var initWiscEduSearch = function(){
        googleCustomSearchService.googleSearch($scope.searchTerm).then(
          function(results){
            if(results && results.responseData && results.responseData.results) {
              $scope.googleResults = results.responseData.results;
              $scope.googleResultsEstimatedCount = results.responseData.cursor.estimatedResultCount;
              recalcTotalCount();
            }
          }
        );
      };

      var init = function(){
        $scope.sortParameter = ['-rating','-userRated'];
        $scope.myuwResults = [];
        $scope.googleResults = [];
        recalcTotalCount();
        $scope.searchResultLimit = 20;
        $scope.showAll = false;
        base.setupSearchTerm();
        base.initializeConstants();
        //get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            $scope.myuwResults = data.portlets;
            recalcTotalCount();
        });
      };
      init();
      initWiscEduSearch();
    }]);

    return app;

});


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
     ['$location', '$rootScope', '$scope', '$controller','marketplaceService', 'googleCustomSearchService', 'directorySearchService','PortalSearchService',
     function($location, $rootScope, $scope, $controller,marketplaceService, googleCustomSearchService, directorySearchService, PortalSearchService) {
      var base = $controller('marketplaceCommonFunctions', {$scope : $scope});

      var initCampusDomainSearch = function(){
        googleCustomSearchService.googleSearch($scope.searchTerm).then(
          function(data){
            if(data && data.results) {
              $scope.googleResults = data.results;
              if(data.estimatedResultCount){
                $scope.googleResultsEstimatedCount = data.estimatedResultCount;
              }
              if(!data.estimatedResultCount || data.estimatedResultCount == 0){
                  $scope.googleEmptyResults = true;
              }
            }
          }
        );
      };

      var initDirectorySearch = function(){
        $scope.directoryLoading = true;
        directorySearchService.directorySearch($scope.searchTerm).then(
          function(results){
            $scope.directoryLoading = false;
            if(results){
              if(results.records && results.count) {
                $scope.directoryResults = results.records;
                $scope.directoryResultCount = results.count;
              } else {
                $scope.directoryResultsEmpty = true;
              }
              if(results.errors && results.errors[0] && results.errors[0].code && results.errors[1] && results.errors[1].error_msg){
                if(results.errors[0].code == 4){
                  $scope.directoryTooManyResults = true;
                }
                $scope.directoryErrorMessage= results.errors[1].error_msg;
              }
            }
          }, function(){
            $scope.directoryLoading = false;
            $scope.directoryError = true;
          }
        );
      };

      var initDirectoryResultLimit = function(){
          $scope.directoryResultLimit = 3;
      };

      var init = function(){
        $scope.sortParameter = ['-rating','-userRated'];
        initDirectoryResultLimit();
        $scope.portalResults = [];
        $scope.googleResults = [];
        $scope.directoryEnabled = false;
        $scope.directoryResults = [];
        $scope.directoryResultCount = 0;
        $scope.directoryTooManyResults = false;
        $scope.googleSearchEnabled = false;
        $scope.googleResultsEstimatedCount = 0;
        $scope.googleEmptyResults = false;
        $scope.totalCount = 0;
        $scope.searchResultLimit = 20;
        $scope.showAll = $rootScope.GuestMode || false;
        base.setupSearchTerm();
        PortalSearchService.setQuery($scope.searchTerm); //in case the search field is not set for whatever reason, reset it
        base.initializeConstants();
        //get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            $scope.portalResults = data.portlets;
        });
        $scope.$watchGroup(['googleResultsEstimatedCount','portalFilteredResults.length', 'directoryResultCount'], function(){
          $scope.totalCount = 0;
          if($scope.googleResultsEstimatedCount) {
            $scope.totalCount+= parseInt($scope.googleResultsEstimatedCount);
          }
          if($scope.portalFilteredResults){
            $scope.totalCount+= parseInt($scope.portalFilteredResults.length);
          }
          if($scope.directoryResultCount){
            $scope.totalCount+= parseInt($scope.directoryResultCount);
          }
        });
      };
      init();

      googleCustomSearchService.googleSearchEnabled().then(function(googleSearchEnabled){
          $scope.googleSearchEnabled = googleSearchEnabled;
          if(googleSearchEnabled){
            initCampusDomainSearch();
          }
      });
      directorySearchService.directorySearchEnabled().then(function(directoryEnabled){
          $scope.directoryEnabled = directoryEnabled;
          if(directoryEnabled){
              initDirectorySearch();
          }
      });

    }]);

    return app;

});

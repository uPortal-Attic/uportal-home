'use strict';

define(['angular', 'portal/search/controllers', 'my-app/marketplace/controllers'], function(angular) {
    let app = angular.module('my-app.search.controllers', ['portal.search.controllers', 'my-app.marketplace.controllers']);
    app.controller('SearchController', ['marketplaceService', '$location', '$scope', '$localStorage', function(marketplaceService, $location, $scope, $localStorage) {
        $scope.initialFilter = '';
        $scope.filterMatches = [];
        $scope.portletListLoading = true;
        if($localStorage && $localStorage.typeaheadSearch) {
            marketplaceService.getPortlets().then(function(data) {
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
            $location.path('apps/details/'+ portlet.fname);
            $scope.initialFilter = '';
            $scope.showSearch = false;
            $scope.showSearchFocus = false;
        };

        $scope.submit = function() {
            if($scope.initialFilter != '') {
                $location.path('apps/search/'+ $scope.initialFilter);
                $scope.initialFilter = '';
                $scope.showSearch = false;
                $scope.showSearchFocus = false;
            }
        };
    }]);

    app.controller('SearchResultController',
     ['$location', '$rootScope', '$scope', '$controller', 'marketplaceService', 'googleCustomSearchService', 'directorySearchService', 'PortalSearchService',
     function($location, $rootScope, $scope, $controller, marketplaceService, googleCustomSearchService, directorySearchService, PortalSearchService) {
      let base = $controller('marketplaceCommonFunctions', {$scope: $scope});

      let initWiscEduSearch = function() {
        googleCustomSearchService.googleSearch($scope.searchTerm).then(
          function(data) {
            if(data && data.results) {
              $scope.googleResults = data.results;
              if(data.estimatedResultCount) {
                $scope.googleResultsEstimatedCount = data.estimatedResultCount;
              }
              if(!data.estimatedResultCount || data.estimatedResultCount == 0) {
                  $scope.googleEmptyResults = true;
              }
            }
          }
        );
      };

      let initDirectorySearch = function() {
        $scope.wiscDirectoryLoading = true;
        directorySearchService.directorySearch($scope.searchTerm).then(
          function(results) {
            $scope.wiscDirectoryLoading = false;
            if(results) {
              if(results.records && results.count) {
                $scope.wiscDirectoryResults = results.records;
                $scope.wiscDirectoryResultCount = results.count;
              } else {
                $scope.wiscDirectoryResultsEmpty = true;
              }
              if(results.errors && results.errors[0] && results.errors[0].code && results.errors[1] && results.errors[1].error_msg) {
                if(results.errors[0].code == 4) {
                  $scope.wiscDirectoryTooManyResults = true;
                }
                $scope.wiscDirectoryErrorMessage= results.errors[1].error_msg;
              }
            }
          }, function() {
            $scope.wiscDirectoryLoading = false;
            $scope.wiscDirectoryError = true;
          }
        );
      };

      let initwiscDirectoryResultLimit = function() {
          $scope.wiscDirectoryResultLimit = 3;
      };

      let init = function() {
        $scope.sortParameter = ['-rating', '-userRated'];
        initwiscDirectoryResultLimit();
        $scope.myuwResults = [];
        $scope.googleResults = [];
        $scope.directoryEnabled = false;
        $scope.wiscDirectoryResults = [];
        $scope.wiscDirectoryResultCount = 0;
        $scope.wiscDirectoryTooManyResults = false;
        $scope.googleSearchEnabled = false;
        $scope.googleResultsEstimatedCount = 0;
        $scope.googleEmptyResults = false;
        $scope.totalCount = 0;
        $scope.searchResultLimit = 20;
        $scope.showAll = $rootScope.GuestMode || false;
        base.setupSearchTerm();
        PortalSearchService.setQuery($scope.searchTerm); // in case the search field is not set for whatever reason, reset it
        base.initializeConstants();
        // get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            $scope.myuwResults = data.portlets;
        });
        $scope.$watchGroup(['googleResultsEstimatedCount', 'myuwFilteredResults.length', 'wiscDirectoryResultCount'], function() {
          $scope.totalCount = 0;
          if($scope.googleResultsEstimatedCount) {
            $scope.totalCount+= parseInt($scope.googleResultsEstimatedCount);
          }
          if($scope.myuwFilteredResults) {
            $scope.totalCount+= parseInt($scope.myuwFilteredResults.length);
          }
          if($scope.wiscDirectoryResultCount) {
            $scope.totalCount+= parseInt($scope.wiscDirectoryResultCount);
          }
        });
      };
      init();

      googleCustomSearchService.googleSearchEnabled().then(function(googleSearchEnabled) {
          $scope.googleSearchEnabled = googleSearchEnabled;
          if(googleSearchEnabled) {
              initWiscEduSearch();
          }
      });
      directorySearchService.directorySearchEnabled().then(function(directoryEnabled) {
          $scope.directoryEnabled = directoryEnabled;
          if(directoryEnabled) {
              initDirectorySearch();
          }
      });
    }]);

    return app;
});

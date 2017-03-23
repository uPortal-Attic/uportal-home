'use strict';

define(['angular', 'portal/search/controllers', 'my-app/marketplace/controllers'], function(angular) {
    var app = angular.module('my-app.search.controllers',
      ['my-app.marketplace.controllers', 'portal.search.controllers']);
    app.controller('SearchController',
      ['marketplaceService', '$log', '$location', '$scope', '$localStorage',
      function(marketplaceService, $log, $location, $scope, $localStorage) {
        $scope.initialFilter = '';
        $scope.filterMatches = [];
        $scope.portletListLoading = true;
        if($localStorage && $localStorage.typeaheadSearch) {
            marketplaceService.getPortlets().then(function(data) {
              $scope.portlets = data.portlets;
              $scope.portletListLoading = false;
              return data;
            }).catch(function() {
              $log.warn('Could not getPortlets');
            });
        }

        $scope.$watch('initialFilter', function(newVal, oldVal) {
          if (!newVal || !$scope.portlets) {
            $scope.filterMatches = [];
          } else {
            $scope.filterMatches = marketplaceService.filterPortletsBySearchTerm($scope.portlets, newVal);
          }
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
      ['$log', '$rootScope', '$scope', '$controller', 'marketplaceService',
      'googleCustomSearchService', 'directorySearchService', 'PortalSearchService',
      function($log, $rootScope, $scope, $controller, marketplaceService,
        googleCustomSearchService, directorySearchService, PortalSearchService) {
      var base = $controller('marketplaceCommonFunctions', {$scope: $scope});

      var initWiscEduSearch = function() {
        googleCustomSearchService.googleSearch($scope.searchTerm).then(
          function(data) {
            if (data && data.results) {
              $scope.googleResults = data.results;
              if(data.estimatedResultCount) {
                $scope.googleResultsEstimatedCount = data.estimatedResultCount;
              }
              if(!data.estimatedResultCount || data.estimatedResultCount == 0) {
                  $scope.googleEmptyResults = true;
              }
            }
            return data;
          }
        ).catch(function() {
          $log.warn('Could not googleSearch');
        });
      };

      var initDirectorySearch = function() {
        $scope.wiscDirectoryLoading = true;
        directorySearchService.directorySearch($scope.searchTerm).then(
          function(results) {
            $scope.wiscDirectoryLoading = false;
            if (results) {
              if (results.records && results.count) {
                $scope.wiscDirectoryResults = results.records;
                $scope.wiscDirectoryResultCount = results.count;
              } else {
                $scope.wiscDirectoryResultsEmpty = true;
              }
              if (results.errors && results.errors[0] && results.errors[0].code &&
                  results.errors[1] && results.errors[1].error_msg) {
                if(results.errors[0].code == 4) {
                  $scope.wiscDirectoryTooManyResults = true;
                }
                $scope.wiscDirectoryErrorMessage= results.errors[1].error_msg;
              }
            }
            return results;
          }).catch(function() {
            $scope.wiscDirectoryLoading = false;
            $scope.wiscDirectoryError = true;
          }
        );
      };

      var initwiscDirectoryResultLimit = function() {
        $scope.wiscDirectoryResultLimit = 3;
      };

      var init = function() {
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
        // in case the search field is not set for whatever reason, reset it
        PortalSearchService.setQuery($scope.searchTerm);
        base.initializeConstants();
        // get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            $scope.myuwResults = data.portlets;
            return data;
        }).catch(function() {
          $log.warn('Could not getPortlets');
        });
        $scope.$watchGroup(['googleResultsEstimatedCount', 'myuwFilteredResults.length', 'wiscDirectoryResultCount'],
          function() {
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
          if (googleSearchEnabled) {
            initWiscEduSearch();
          }
          return googleSearchEnabled;
      }).catch(function() {
        $log.warn('Could not googleSearchEnabled');
      });
      directorySearchService.directorySearchEnabled().then(function(directoryEnabled) {
          $scope.directoryEnabled = directoryEnabled;
          if (directoryEnabled) {
            initDirectorySearch();
          }
          return directoryEnabled;
      }).catch(function() {
        $log.warn('Could not directorySearchEnabled');
      });
    }]);

    return app;
});

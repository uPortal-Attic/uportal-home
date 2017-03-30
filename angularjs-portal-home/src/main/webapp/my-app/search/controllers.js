'use strict';

define([
    'angular',
    'portal/search/controllers',
    'my-app/marketplace/controllers'],
  function(angular) {
    return angular.module('my-app.search.controllers',
      ['my-app.marketplace.controllers', 'portal.search.controllers'])
    .controller('SearchController',
      ['marketplaceService', '$log', '$location', '$localStorage',
      function(marketplaceService, $log, $location, $localStorage) {
        var vm = this;
        vm.initialFilter = '';
        vm.filterMatches = [];
        vm.portletListLoading = true;
        if($localStorage && $localStorage.typeaheadSearch) {
            marketplaceService.getPortlets().then(function(data) {
              vm.portlets = data.portlets;
              vm.portletListLoading = false;
              return data;
            }).catch(function() {
              $log.warn('Could not getPortlets');
            });
        }

        vm.$watch('initialFilter', function(newVal, oldVal) {
          if (!newVal || !vm.portlets) {
            vm.filterMatches = [];
          } else {
            vm.filterMatches =
              marketplaceService.filterPortletsBySearchTerm(
                vm.portlets,
                newVal
              );
          }
        });

        vm.onSelect = function(portlet) {
          $location.path('apps/details/'+ portlet.fname);
          vm.initialFilter = '';
          vm.showSearch = false;
          vm.showSearchFocus = false;
        };

        vm.submit = function() {
          if(vm.initialFilter != '') {
            $location.path('apps/search/'+ vm.initialFilter);
            vm.initialFilter = '';
            vm.showSearch = false;
            vm.showSearchFocus = false;
          }
        };
    }])

    .controller('SearchResultController',
      ['$log', '$rootScope', '$controller',
      'marketplaceService', 'googleCustomSearchService',
      'directorySearchService', 'PortalSearchService',
      function($log, $rootScope, $controller,
        marketplaceService, googleCustomSearchService,
        directorySearchService, PortalSearchService) {
      var vm = this;
      var base = $controller('marketplaceCommonFunctions', {$scope: vm});

      var initWiscEduSearch = function() {
        googleCustomSearchService.googleSearch(vm.searchTerm).then(
          function(data) {
            if (data && data.results) {
              vm.googleResults = data.results;
              if(data.estimatedResultCount) {
                vm.googleResultsEstimatedCount = data.estimatedResultCount;
              }
              if(!data.estimatedResultCount || data.estimatedResultCount == 0) {
                vm.googleEmptyResults = true;
              }
            }
            return data;
          }
        ).catch(function() {
          $log.warn('Could not googleSearch');
        });
      };

      var initDirectorySearch = function() {
        vm.wiscDirectoryLoading = true;
        directorySearchService.directorySearch(vm.searchTerm).then(
          function(results) {
            vm.wiscDirectoryLoading = false;
            if (results) {
              if (results.records && results.count) {
                vm.wiscDirectoryResults = results.records;
                vm.wiscDirectoryResultCount = results.count;
              } else {
                vm.wiscDirectoryResultsEmpty = true;
              }
              if (results.errors &&
                  results.errors[0] &&
                  results.errors[0].code &&
                  results.errors[1] &&
                  results.errors[1].error_msg) {
                if (results.errors[0].code == 4) {
                  vm.wiscDirectoryTooManyResults = true;
                }
                vm.wiscDirectoryErrorMessage= results.errors[1].error_msg;
              }
            }
            return results;
          }).catch(function() {
            vm.wiscDirectoryLoading = false;
            vm.wiscDirectoryError = true;
          }
        );
      };

      var initwiscDirectoryResultLimit = function() {
        vm.wiscDirectoryResultLimit = 3;
      };

      var init = function() {
        vm.sortParameter = ['-rating', '-userRated'];
        initwiscDirectoryResultLimit();
        vm.myuwResults = [];
        vm.googleResults = [];
        vm.directoryEnabled = false;
        vm.wiscDirectoryResults = [];
        vm.wiscDirectoryResultCount = 0;
        vm.wiscDirectoryTooManyResults = false;
        vm.googleSearchEnabled = false;
        vm.googleResultsEstimatedCount = 0;
        vm.googleEmptyResults = false;
        vm.totalCount = 0;
        vm.searchResultLimit = 20;
        vm.showAll = $rootScope.GuestMode || false;
        base.setupSearchTerm();
        // in case the search field is not set for whatever reason, reset it
        PortalSearchService.setQuery(vm.searchTerm);
        base.initializeConstants();
        // get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            vm.myuwResults = data.portlets;
            return data;
        }).catch(function() {
          $log.warn('Could not getPortlets');
        });
        vm.$watchGroup([
            'googleResultsEstimatedCount',
            'myuwFilteredResults.length',
            'wiscDirectoryResultCount'],
          function() {
            vm.totalCount = 0;
            if(vm.googleResultsEstimatedCount) {
              vm.totalCount+= parseInt(vm.googleResultsEstimatedCount);
            }
            if(vm.myuwFilteredResults) {
              vm.totalCount+= parseInt(vm.myuwFilteredResults.length);
            }
            if(vm.wiscDirectoryResultCount) {
              vm.totalCount+= parseInt(vm.wiscDirectoryResultCount);
            }
          });
      };
      init();

      googleCustomSearchService.googleSearchEnabled()
      .then(function(googleSearchEnabled) {
        vm.googleSearchEnabled = googleSearchEnabled;
        if (googleSearchEnabled) {
          initWiscEduSearch();
        }
        return googleSearchEnabled;
      }).catch(function() {
        $log.warn('Could not googleSearchEnabled');
      });
      directorySearchService.directorySearchEnabled()
      .then(function(directoryEnabled) {
        vm.directoryEnabled = directoryEnabled;
        if (directoryEnabled) {
          initDirectorySearch();
        }
        return directoryEnabled;
      }).catch(function() {
        $log.warn('Could not directorySearchEnabled');
      });
    }]);
});

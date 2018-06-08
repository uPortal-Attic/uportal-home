/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';

define([
    'angular',
    'portal/search/controllers',
    'my-app/marketplace/controllers'],
  function(angular) {
    return angular.module('my-app.search.controllers',
      ['my-app.marketplace.controllers', 'portal.search.controllers'])
    .controller('SearchController',
      ['marketplaceService', '$log', '$location', '$scope', '$localStorage',
      function(marketplaceService, $log, $location, $scope, $localStorage) {
        $scope.initialFilter = '';
        $scope.filterMatches = [];
        $scope.portletListLoading = true;
        if ($localStorage && $localStorage.typeaheadSearch) {
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
            $scope.filterMatches =
              marketplaceService.filterPortletsBySearchTerm(
                $scope.portlets,
                newVal
              );
          }
        });

        $scope.onSelect = function(portlet) {
          $location.path('apps/details/'+ portlet.fname);
          $scope.initialFilter = '';
          $scope.showSearch = false;
          $scope.showSearchFocus = false;
        };

        $scope.submit = function() {
          if ($scope.initialFilter != '') {
            $location.path('apps/search/'+ $scope.initialFilter);
            $scope.initialFilter = '';
            $scope.showSearch = false;
            $scope.showSearchFocus = false;
          }
        };
    }])

    .controller('SearchResultController',
      ['$log', '$rootScope', '$scope', '$controller',
      'marketplaceService', 'googleCustomSearchService',
      'directorySearchService', 'PortalSearchService',
      function($log, $rootScope, $scope, $controller,
        marketplaceService, googleCustomSearchService,
        directorySearchService, PortalSearchService) {
      var base = $controller('MarketplaceCommonFunctionsController',
        {$scope: $scope});

      var initWiscEduSearch = function() {
        googleCustomSearchService.googleSearch($scope.searchTerm).then(
          function(data) {
            if (data && data.results) {
              $scope.googleResults = data.results;
              if (data.estimatedResultCount) {
                $scope.googleResultsEstimatedCount = data.estimatedResultCount;
              }
              if (
                !data.estimatedResultCount || data.estimatedResultCount == 0
              ) {
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
        $scope.wiscDirectoryResultsBadge = '?';
        $scope.wiscDirectoryHopeForResults = true;
        directorySearchService.directorySearch($scope.searchTerm).then(
          function(results) {
            $scope.wiscDirectoryLoading = false;
            if (results) {
              if (results.records && results.count) {
                $scope.wiscDirectoryResults = results.records;
                $scope.wiscDirectoryResultCount = results.count;
                $scope.wiscDirectoryResultsBadge = results.count;
               // hope for results is well justified, leave it true
              } else {
                $scope.wiscDirectoryResultsEmpty = true;
                $scope.wiscDirectoryResultsBadge = '0';
                $scope.wiscDirectoryHopeForResults = false;
              }
              if (results.errors &&
                  results.errors[0] &&
                  results.errors[0].code &&
                  results.errors[1] &&
                  results.errors[1].error_msg) {
                if (results.errors[0].code == 4) {
                  $log.warn(
                    'Too many directory results for term ' + $scope.searchTerm);
                  $scope.wiscDirectoryTooManyResults = true;
                  $scope.wiscDirectoryResultsBadge = '25+';
                } else {
                  $log.warn(
                    'Directory search error [' + results.errors[1].error_msg +
                    '] on term ' + $scope.searchTerm);
                  $scope.wiscDirectoryResultsBadge = '!';
                  $scope.wiscDirectoryHopeForResults = false;
                }

                $scope.wiscDirectoryErrorMessage= results.errors[1].error_msg;
              }
            }
            return results;
          }).catch(function() {
            $log.warn('Directory search error on term ' + $scope.searchTerm);
            $scope.wiscDirectoryLoading = false;
            $scope.wiscDirectoryErrorMessage =
              'Error. Unable to search the directory.';
            $scope.wiscDirectoryResultsBadge = '!';
            $scope.wiscDirectoryHopeForResults = false;
          }
        );
      };

      var initwiscDirectoryResultLimit = function() {
        $scope.wiscDirectoryResultLimit = 3;
      };

      /**
       * Filter first by title matches, then by other matches,
       * then merge the two arrays (maintaining order without
       * duplicates).
       * @param apps {Array} Array of all apps
       */
      var filterAppsBySearchTerm = function(apps) {
        // Filter by title matches first
        var appsWithMatchingTitle =
          marketplaceService.filterPortletsBySearchTerm(
            apps,
            $scope.searchTerm,
            {
              searchDescription: false,
              searchKeywords: false,
              defaultReturn: true,
            }
          );
        // Then filter matching the rest
        var appsWithMatchingDetails =
          marketplaceService.filterPortletsBySearchTerm(
            apps,
            $scope.searchTerm,
            {
              searchDescription: true,
              searchKeywords: true,
              defaultReturn: true,
            }
          );

        // Merge arrays without duplicates
        $scope.filteredApps = appsWithMatchingTitle
          .concat(appsWithMatchingDetails
            .filter(function(i) {
              return appsWithMatchingTitle.indexOf(i) === -1;
        }));

        if ($scope.filteredApps.length === 0) {
          $scope.appDirectoryHopeForResults = false;
        }
      };

      $scope.showAllDirectoryResults = function() {
        $scope.wiscDirectoryResultLimit = $scope.wiscDirectoryResultCount;
      };

      var init = function() {
        initwiscDirectoryResultLimit();
        $scope.myuwResults = [];
        $scope.filteredApps = [];
        $scope.appDirectoryLoading = true;
        $scope.appDirectoryResultsBadge = '?';
        $scope.appDirectoryErrorMessage = '';
        // there's hope when there are or might be nonzero results
        // hopeless when we know there will be no results to show
        $scope.appDirectoryHopeForResults = true;

        $scope.directoryEnabled = false;
        $scope.wiscDirectoryResults = [];
        $scope.wiscDirectoryResultCount = 0;
        $scope.wiscDirectoryResultsBadge = '?';
        $scope.wiscDirectoryTooManyResults = false;
        $scope.wiscDirectoryHopeForResults = false;

        $scope.googleSearchEnabled = false;
        $scope.googleResults = [];
        $scope.googleResultsEstimatedCount = 0;
        $scope.googleEmptyResults = false;
        $scope.googleHopeForResults = false;
        $scope.searchResultLimit = 20;
        $scope.showAll = $rootScope.GuestMode || false;
        base.setupSearchTerm();
        // in case the search field is not set for whatever reason, reset it
        PortalSearchService.setQuery($scope.searchTerm);
        base.initializeConstants();
        // get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            $scope.myuwResults = data.portlets;
            filterAppsBySearchTerm(data.portlets);
            $scope.appDirectoryLoading = false;
            $scope.appDirectoryResultsBadge = $scope.filteredApps.length;
            return data;
        }).catch(function() {
          $log.warn('Could not getPortlets');
          $scope.appDirectoryLoading = false;
          $scope.appDirectoryResultsBadge = '!';
          $scope.appDirectoryErrorMessage =
            'Error: Could not load app directory.';
          $scope.appDirectoryHopeForResults = false;
        });
      };
      init();

      googleCustomSearchService.googleSearchEnabled()
      .then(function(googleSearchEnabled) {
        $scope.googleSearchEnabled = googleSearchEnabled;
        if (googleSearchEnabled) {
          initWiscEduSearch();
        }
        return googleSearchEnabled;
      }).catch(function() {
        $log.warn('Could not googleSearchEnabled');
      });
      directorySearchService.directorySearchEnabled()
      .then(function(directoryEnabled) {
        $scope.directoryEnabled = directoryEnabled;
        if (directoryEnabled) {
          initDirectorySearch();
        }
        return directoryEnabled;
      }).catch(function() {
        $log.warn('Could not directorySearchEnabled');
      });
    }]);
});

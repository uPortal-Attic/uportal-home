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

define(['angular', 'jquery', 'require'], function(angular, $, require) {
  var currentPage = 'market';

  return angular.module('my-app.marketplace.controllers', [])

  .controller('MarketplaceCommonFunctionsController',
    ['googleCustomSearchService', 'miscSearchService', 'layoutService',
      '$log', 'marketplaceService', 'miscService', 'mainService',
      'MISC_URLS', '$sessionStorage', '$localStorage', '$rootScope', '$scope',
      '$routeParams', '$timeout', '$location', '$mdColors', 'APP_FLAGS',
    function(googleCustomSearchService, miscSearchService, layoutService,
      $log, marketplaceService, miscService, mainService,
        MISC_URLS, $sessionStorage, $localStorage, $rootScope, $scope,
        $routeParams, $timeout, $location, $mdColors, APP_FLAGS) {
      var vm = this;

      if ($sessionStorage.portal.theme) {
        // theme already in session, use primary color from it
        $scope.primaryColorRgb =
          $mdColors.getThemeColor($sessionStorage.portal.theme.name
          + '-primary');
      } else {
        // theme not yet in session, use primary color from zeroth theme
        $scope.primaryColorRgb =
          $mdColors.getThemeColor($rootScope.THEMES[0].name
            + '-primary');
        }

       $scope.navToDetails = function(marketplaceEntry, location) {
        marketplaceService.setFromInfo(location, $scope.searchTerm);
        $location.path('apps/details/'+ marketplaceEntry.fname);
       };

      $scope.isStatic = function(portlet) {
        return portlet.maxUrl.indexOf('portal') !== -1 // a portal hit
          && portlet.portletName // there is a portletName
          && portlet.portletName.indexOf('cms') != -1; // static content portlet
      };

      mainService.isGuest()
        .then(function(result) {
          $scope.guestMode = result;
          return result;
        }).catch(function() {
          $log.warn('Cannot get isGuest');
          return true;
        });

      $scope.getLaunchURL = function(marketplaceEntry, guestMode) {
        var layoutObj = marketplaceEntry.layoutObject;
        if (guestMode && !marketplaceEntry.hasInLayout) {
          return $scope.loginToAuthPage +
              '/web/apps/details/'+ marketplaceEntry.fname;
        } else if (layoutObj.altMaxUrl == false &&
            (layoutObj.renderOnWeb || $localStorage.webPortletRender)) {
          return 'exclusive/' + layoutObj.fname;
        } else if (layoutObj.altMaxUrl == false &&
            $scope.isStatic(marketplaceEntry)) {
          return 'static/' + layoutObj.fname;
        } else {
          return marketplaceEntry.maxUrl;
        }
      };

      if (APP_FLAGS.useNewLayout) {
        $scope.addToHome = function addToHome(portlet) {
          var fname = portlet.fname;
          var ret = layoutService.addToHome(portlet, $sessionStorage.layout);
          ret.then(
            function successCallback(response) {
              $log.log('Added ' + portlet.fname + ' successfully');
              angular.element('.fname-'+fname)
              .html('<i class="fa fa-check"></i> Added Successfully')
              .prop('disabled', true)
              .removeClass('btn-add')
              .addClass('btn-added');

                var marketplaceEntries = $.grep(
                  $sessionStorage.marketplace,
                  function(e) {
                    return e.fname === portlet.fname;
                  }
                );
                if (marketplaceEntries.length > 0) {
                  marketplaceEntries[0].hasInLayout = true;
                }
                $rootScope.layout = null; // reset layout due to modifications
                $sessionStorage.layout = null;
                miscService.pushGAEvent('Layout Modification', 'Add', portlet.name);
            },

            function errorCallback(response) {
              $log.warn('failed to add app to home.');
              angular.element('.fname-'+fname)
                .parent()
                .append(
                  '<span>Issue adding to home, please try again later</span>'
                );
            }).catch(function() {
              console.log("more errors occurred");
          });
        };
      }

      if (APP_FLAGS.useOldLayout) {
       $scope.addToHome = function(portlet) {
         var ret = layoutService.addToHome(portlet);
         ret.success(function(request, text) {
           angular.element('.fname-' + portlet.fname)
             .html('<span style="color : green;">' +
               '<i class="fa fa-check"></i> Added Successfully</span>')
             .prop('disabled', true);
           $scope.$apply(function() {
             if (angular.isDefined($sessionStorage.marketplace)) {
               var marketplaceEntries = $.grep(
                 $sessionStorage.marketplace,
                 function(e) {
                   return e.fname === portlet.fname;
                 }
               );
               if (marketplaceEntries.length > 0) {
                 marketplaceEntries[0].hasInLayout = true;
               }
             }

             // reset layout due to modifications
             $rootScope.layout = null;
             $sessionStorage.layout = null;
             miscService.pushGAEvent('Layout Modification', 'Add', portlet.name);
           });
         })
         .error(function(request, text, error) {
           angular.element('.fname-' + portlet.fname)
             .html(
               '<span style="color : red;">' +
               'Issue adding to home, please try again later' +
               '</span>'
             );
         });
       };
      }

      $scope.searchTermFilter = function(portlet) {
        return marketplaceService.portletMatchesSearchTerm(
          portlet,
          $scope.searchTerm,
          {
            searchDescription: true,
            searchKeywords: true,
            defaultReturn: true,
          }
        );
      };

      $scope.toggleShowAll = function() {
        $scope.showAll = !$scope.showAll;
      };

      vm.setupSearchTerm = function() {
        var tempFilterText = '';
        var filterTextTimeout;
        $scope.searchTerm = marketplaceService.getInitialFilter();
        if ($routeParams.initFilter !== null &&
            ($scope.searchTerm === null || $scope.searchTerm === '')) {
          $scope.searchTerm = $routeParams.initFilter;
        } else {
          marketplaceService.initialFilter('');
        }
        $scope.searchText = $scope.searchTerm;
        var initFilter = false;
        // delay on the filter
        $scope.$watch('searchText', function(val) {
          if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

          tempFilterText = val;
          filterTextTimeout = $timeout(function() {
            $scope.searchTerm = tempFilterText;
            if (initFilter && $scope.searchTerm) {
              miscService.pushGAEvent('Search', 'Filter', $scope.searchTerm);
            } else {
              initFilter = true;
            }
          }, 250); // delay 250 ms
        });
      };

      vm.initializeConstants = function() {
        var errorFn = function(name) {
          return function() {
            $log.warn('Could not ' + name);
          };
        };
        // initialize constants
        googleCustomSearchService.getPublicWebSearchURL().then(
          function(webSearchURL) {
            $scope.webSearchUrl = webSearchURL;
            return webSearchURL;
          }
        ).catch(errorFn('getPublicWebSearchURL'));
        googleCustomSearchService.getDomainResultsLabel().then(
          function(domainResultsLabel) {
            $scope.domainResultsLabel = domainResultsLabel;
            return domainResultsLabel;
          }
        ).catch(errorFn('getDomainResultsLabel'));
        miscSearchService.getKBSearchURL().then(
          function(kbSearchURL) {
            $scope.kbSearchUrl = kbSearchURL;
            return kbSearchURL;
          }
        ).catch(errorFn('getKBSearchURL'));
        miscSearchService.getEventSearchURL().then(
          function(eventsSearchURL) {
            $scope.eventsSearchUrl = eventsSearchURL;
            return eventsSearchURL;
          }
        ).catch(errorFn('getEventSearchURL'));
        miscSearchService.getHelpDeskHelpURL().then(
          function(helpdeskURL) {
            $scope.helpdeskUrl = helpdeskURL;
            return helpdeskURL;
          }
        ).catch(errorFn('getHelpDeskHelpURL'));
        $scope.directorySearchUrl = MISC_URLS.directorySearchURL;
        $scope.feedbackUrl = MISC_URLS.feedbackURL;
        $scope.loginToAuthPage = MISC_URLS.myuwHome;
      };
    },
  ])

  .controller('MarketplaceController', [
    '$log', '$rootScope', '$scope', '$controller',
    'mainService', 'marketplaceService',
    function($log, $rootScope, $scope, $controller,
      mainService, marketplaceService) {
      var base = $controller('MarketplaceCommonFunctionsController',
        {$scope: $scope});

      var init = function() {
        // init variables
        $scope.portlets = [];
        marketplaceService.getPortlets().then(function(data) {
          $scope.portlets = data.portlets;
          $scope.categories = data.categories;
          return data;
        }).catch(function() {
          $log.warn('Could not getPortlets');
        });

        base.setupSearchTerm();

        // initialize variables

        $scope.searchResultLimit = 20;
        $scope.showAll = false;

        mainService.isGuest()
        .then(function(isGuest) {
          if (isGuest) {
            $scope.showAll = true;
          }
          return isGuest;
        }).catch(function() {
          $log.warn('Cannot get isGuest');
          return true;
        });

          // Empty string indicates no categories, show all portlets
          $scope.categoryToShow = '';

          // Default to alphabetical sort by title on return to app dir browse
          $scope.selectedFilter = 'az';
          $scope.sortParameter = 'title';

        if (currentPage === 'details') {
          currentPage = 'market';
        }

        base.initializeConstants();
      };

      // run functions
      init();
    }])

  .controller('MarketplaceDetailsController', [
      '$controller', '$document', '$scope', '$routeParams',
      '$mdDialog', 'marketplaceService', 'SERVICE_LOC',
      function($controller, $document, $scope, $routeParams,
          $mdDialog, marketplaceService, SERVICE_LOC) {
        $controller('MarketplaceCommonFunctionsController',
          {$scope: $scope});

        var figureOutBackStuff = function() {
          var fromInfo = marketplaceService.getFromInfo();
          if (fromInfo.term) {
            // from somewhere
            if ('Search' === fromInfo.searchOrBrowse && fromInfo.term) {
              // if from search and term is populated, return to search
              $scope.backText = 'Search Results for ' + fromInfo.term;
              $scope.backURL = 'apps/search/' + fromInfo.term;
            } else {
              // assuming from browse
              $scope.backText = 'Browse';
              $scope.backURL = 'apps/browse/' + fromInfo.term;
            }

            // reset services
            marketplaceService.setFromInfo(undefined, undefined);
          } else {
            // direct hit, will go back to browse
            $scope.backURL='apps';
            $scope.backText='Browse';
          }
        };

        $scope.clickRatingReviewAdmin = function() {
          $mdDialog.show({
            controller: 'MarketplaceRatingReviewAdminController',
            templateUrl: require.toUrl('./partials/rating-review-admin.html'),
            parent: angular.element($document.body),
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: false,
          });
        };

        // init
        var init = function() {
          $scope.loading = true;
          figureOutBackStuff();
          $scope.obj = [];
          $scope.ratingPrefix = SERVICE_LOC.base +
            SERVICE_LOC.marketplace.base;
          $scope.errorMessage =
              'There was an issue loading details, please click back to apps.';
          marketplaceService.getPortlet($routeParams.fname).then(
            function(result) {
              $scope.loading = false;
              if (!result) {
                $scope.error = true;
                $scope.portlet = null;
              } else {
                $scope.portlet = result;
                $scope.error = false;
              }
              return result;
            }
          ).catch(function(reason) {
            $scope.loading = false;
            $scope.error = true;
          });
        };
        init();
      }]
  )

  .controller('MarketplaceRatingReviewAdminController', [
    '$log', '$scope', 'marketplaceService',
    function($log, $scope, marketplaceService) {
      var init = function() {
        $scope.ratings = [];
        marketplaceService.getAllRatings($scope.portlet.fname).then(
          function(ratings) {
            if (ratings) {
              $scope.ratings = ratings;
              $scope.average =0;
              $scope.totalReviews = 0;
              angular.forEach(ratings, function(value, key) {
                $scope.average+= value.rating;
                if (value.review) {
                  $scope.totalReviews += 1;
                }
              });
              $scope.average = Math.round($scope.average / ratings.length);
            }
            return ratings;
          }
        ).catch(function() {
          $log.warn('Could not getAllRatings');
        });
      };

      init();
    }]);
});

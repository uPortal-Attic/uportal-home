'use strict';

define(['angular', 'jquery', 'require'], function(angular, $, require) {
  var currentPage = 'market';
  var currentCategory = '';

  return angular.module('my-app.marketplace.controllers', [])
  .controller('MarketplaceCommonFunctionsController',
    ['googleCustomSearchService', 'miscSearchService', 'layoutService',
      '$log', 'marketplaceService', 'miscService', 'MISC_URLS',
      '$sessionStorage', '$localStorage', '$rootScope',
      '$routeParams', '$timeout', '$location',
    function(googleCustomSearchService, miscSearchService, layoutService,
      $log, marketplaceService, miscService, MISC_URLS,
        $sessionStorage, $localStorage, $rootScope,
        $routeParams, $timeout, $location) {
      var vm = this;
      var currentThemePrimary = ($sessionStorage.portal.theme &&
        $sessionStorage.portal.theme.materialTheme) ?
        $sessionStorage.portal.theme.materialTheme.primary['500'] :
        {value: ['0', '0', '0']};
      vm.primaryColorRgb = 'rgb('+
        currentThemePrimary.value[0] + ',' +
        currentThemePrimary.value[1] + ',' +
        currentThemePrimary.value[2] + ')';

      vm.navToDetails = function(marketplaceEntry, location) {
        marketplaceService.setFromInfo(location, vm.searchTerm);
        $location.path('apps/details/'+ marketplaceEntry.fname);
      };

      vm.isStatic = function(portlet) {
        return portlet.maxUrl.indexOf('portal') !== -1 // a portal hit
          && portlet.portletName // there is a portletName
          && portlet.portletName.indexOf('cms') != -1; // static content portlet
      };

      vm.getLaunchURL = function(marketplaceEntry) {
        var layoutObj = marketplaceEntry.layoutObject;
        if ($rootScope.GuestMode && !marketplaceEntry.hasInLayout) {
          return vm.loginToAuthPage +
              '/web/apps/details/'+ marketplaceEntry.fname;
        } else if (layoutObj.altMaxUrl == false &&
            (layoutObj.renderOnWeb || $localStorage.webPortletRender)) {
          return 'exclusive/' + layoutObj.fname;
        } else if (layoutObj.altMaxUrl == false &&
            vm.isStatic(marketplaceEntry)) {
          return 'static/' + layoutObj.fname;
        } else {
          return marketplaceEntry.maxUrl;
        }
      };

      vm.addToHome = function addToHome(portlet) {
        var fname = portlet.fname;
        var ret = layoutService.addToHome(portlet);
        ret.success(function(request, text) {
          angular.element('.fname-'+fname)
            .html('<i class="fa fa-check"></i> Added Successfully')
            .prop('disabled', true)
            .removeClass('btn-add')
            .addClass('btn-added');
          vm.$apply(function() {
            var marketplaceEntries = $.grep(
              $sessionStorage.marketplace,
              function(e) {
                return e.fname === portlet.fname;
              }
            );
            if(marketplaceEntries.length > 0) {
              marketplaceEntries[0].hasInLayout = true;
            }
            $rootScope.layout = null; // reset layout due to modifications
            $sessionStorage.layout = null;
          });
        })
          .error(function(request, text, error) {
            angular.element('.fname-'+fname)
              .parent()
              .append(
                '<span>Issue adding to home, please try again later</span>'
              );
          });
      };

      vm.searchTermFilter = function(portlet) {
        return marketplaceService.portletMatchesSearchTerm(
          portlet,
          vm.searchTerm,
          {
            searchDescription: true,
            searchKeywords: true,
            defaultReturn: true,
          }
        );
      };

      vm.selectFilter = function(filter, category) {
        vm.sortParameter = filter;
        vm.categoryToShow = category;
        vm.showCategories = false;
        if (filter === 'popular') {
          vm.selectedFilter = 'popular';
          vm.sortParameter = ['-rating', '-userRated'];
        }
        if (filter === 'az') {
          vm.selectedFilter = 'az';
          vm.sortParameter = 'name';
        }
        if (filter === 'category') {
          vm.selectedFilter = 'category';
          vm.sortParameter = 'name';
          vm.showCategories = true;
        }

        miscService.pushGAEvent('Marketplace', 'Tab Select', filter);
      };

      vm.slideTabs = function(direction) {
        vm.tabsPosition = 'start';
        if (direction === 'right') {
          vm.tabsPosition = 'end';
        }
      };

      vm.toggleShowAll = function() {
        vm.showAll = !vm.showAll;
      };

      vm.setupSearchTerm = function() {
        var tempFilterText = '';
        var filterTextTimeout;
        vm.searchTerm = marketplaceService.getInitialFilter();
        if($routeParams.initFilter !== null &&
            (vm.searchTerm === null || vm.searchTerm === '')) {
          vm.searchTerm = $routeParams.initFilter;
        } else {
          marketplaceService.initialFilter('');
        }
        vm.searchText = vm.searchTerm;
        var initFilter = false;
        // delay on the filter
        vm.$watch('searchText', function(val) {
          if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

          tempFilterText = val;
          filterTextTimeout = $timeout(function() {
            vm.searchTerm = tempFilterText;
            if(initFilter && vm.searchTerm) {
              miscService.pushGAEvent('Search', 'Filter', vm.searchTerm);
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
            vm.webSearchUrl = webSearchURL;
            return webSearchURL;
          }
        ).catch(errorFn('getPublicWebSearchURL'));
        googleCustomSearchService.getDomainResultsLabel().then(
          function(domainResultsLabel) {
            vm.domainResultsLabel = domainResultsLabel;
            return domainResultsLabel;
          }
        ).catch(errorFn('getDomainResultsLabel'));
        miscSearchService.getKBSearchURL().then(
          function(kbSearchURL) {
            vm.kbSearchUrl = kbSearchURL;
            return kbSearchURL;
          }
        ).catch(errorFn('getKBSearchURL'));
        miscSearchService.getEventSearchURL().then(
          function(eventsSearchURL) {
            vm.eventsSearchUrl = eventsSearchURL;
            return eventsSearchURL;
          }
        ).catch(errorFn('getEventSearchURL'));
        miscSearchService.getHelpDeskHelpURL().then(
          function(helpdeskURL) {
            vm.helpdeskUrl = helpdeskURL;
            return helpdeskURL;
          }
        ).catch(errorFn('getHelpDeskHelpURL'));
        vm.directorySearchUrl = MISC_URLS.directorySearchURL;
        vm.feedbackUrl = MISC_URLS.feedbackURL;
        vm.loginToAuthPage = MISC_URLS.myuwHome;
      };
    },
  ])

  .controller('MarketplaceController', [
    '$log', '$rootScope', '$controller', 'marketplaceService',
    function($log, $rootScope, $controller, marketplaceService) {
      var vm = this;
      var base = $controller('MarketplaceCommonFunctionsController',
                    {$scope: vm});

      var init = function() {
        // init variables
        vm.portlets = [];
        marketplaceService.getPortlets().then(function(data) {
          vm.portlets = data.portlets;
          vm.categories = data.categories;
          return data;
        }).catch(function() {
          $log.warn('Could not getPortlets');
        });

        base.setupSearchTerm();

        // initialize variables

        vm.searchResultLimit = 20;
        vm.showAll = $rootScope.GuestMode || false;
        if(currentPage === 'details') {
          // Empty string indicates no categories, show all portlets
          vm.categoryToShow = '';
          // Default filter is to sort by category for
          // marketplaceDetails back to marketplace
          vm.selectedFilter = 'category';
          // To sort by category, angular will use name to filter
          vm.sortParameter = 'name';
          // Show category selection div by default
          vm.showCategories = true;

          currentPage = 'market';
          if(currentCategory !== '')
            vm.categoryToShow = currentCategory;
          else
            vm.categoryToShow = '';
        } else {
          // Empty string indicates no categories, show all portlets
          vm.categoryToShow = '';
          // Default filter is to sort by popularity
          vm.selectedFilter = 'popular';
          // To sort by popularity, angular will use portlet.rating to filter
          vm.sortParameter = ['-rating', '-userRated'];
          // Hide category selection div by default
          vm.showCategories = false;
        }

        base.initializeConstants();
      };

      // run functions
      init();
    }])

  .controller('MarketplaceDetailsController', [
      '$controller', '$document', '$routeParams',
      '$mdDialog', 'marketplaceService', 'SERVICE_LOC',
      function($controller, $document, $scope, $routeParams,
          $mdDialog, marketplaceService, SERVICE_LOC) {
        var vm = this;
        $controller('MarketplaceCommonFunctionsController', {$scope: vm});

        vm.specifyCategory = function(category) {
          currentCategory=category;
          currentPage='details';
        };

        var figureOutBackStuff = function() {
          var fromInfo = marketplaceService.getFromInfo();
          if(fromInfo.term) {
            // from somewhere
            if('Search' === fromInfo.searchOrBrowse && fromInfo.term) {
              // if from search and term is populated, return to search
              vm.backText = 'Search Results for ' + fromInfo.term;
              vm.backURL = 'apps/search/' + fromInfo.term;
            } else {
              // assuming from browse
              vm.backText = 'Browse';
              vm.backURL = 'apps/browse/' + fromInfo.term;
            }

            // reset services
            marketplaceService.setFromInfo(undefined, undefined);
          } else {
            // direct hit, will go back to browse
            vm.backURL='apps';
            vm.backText='Browse';
          }
        };

        vm.clickRatingReviewAdmin = function() {
          $mdDialog.show({
            controller: 'MarketplaceRatingReviewAdminController',
            templateUrl: require.toUrl('./partials/rating-review-admin.html'),
            parent: angular.element($document.body),
            scope: vm,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: false,
          });
        };

        // init
        var init = function() {
          vm.loading = true;
          figureOutBackStuff();
          vm.obj = [];
          vm.ratingPrefix = SERVICE_LOC.base +
            SERVICE_LOC.marketplace.base;
          vm.errorMessage =
              'There was an issue loading details, please click back to apps.';
          marketplaceService.getPortlet($routeParams.fname).then(
            function(result) {
              vm.loading = false;
              if (!result) {
                vm.error = true;
                vm.portlet = null;
              } else {
                vm.portlet = result;
                vm.error = false;
              }
              return result;
            }
          ).catch(function(reason) {
            vm.loading = false;
            vm.error = true;
          });
        };
        init();
      }]
  )

  .controller('MarketplaceRatingReviewAdminController', [
    '$log', 'marketplaceService',
    function($log, marketplaceService) {
      var vm = this;
      var init = function() {
        vm.ratings = [];
        marketplaceService.getAllRatings(vm.portlet.fname).then(
          function(ratings) {
            if (ratings) {
              vm.ratings = ratings;
              vm.average =0;
              vm.totalReviews = 0;
              angular.forEach(ratings, function(value, key) {
                vm.average+= value.rating;
                if(value.review) {
                  vm.totalReviews += 1;
                }
              });
              vm.average = Math.round(vm.average / ratings.length);
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

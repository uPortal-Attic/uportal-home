'use strict';

define(['angular', 'jquery', 'require'], function(angular, $, require) {

    var app = angular.module('my-app.marketplace.controllers', []);

    app.controller('marketplaceCommonFunctions',
      ['googleCustomSearchService', 'miscSearchService', 'layoutService', 'marketplaceService', 'miscService', 'MISC_URLS', '$sessionStorage',
       '$localStorage','$rootScope', '$scope', '$routeParams', '$timeout', '$location',
       function(googleCustomSearchService, miscSearchService, layoutService, marketplaceService, miscService,MISC_URLS, $sessionStorage,
        $localStorage, $rootScope, $scope, $routeParams, $timeout, $location){

      $scope.navToDetails = function(marktetplaceEntry, location) {
        marketplaceService.setFromInfo(location, $scope.searchTerm);
        $location.path("apps/details/"+ marktetplaceEntry.fname);
      };

      $scope.isStatic = function(portlet) {
        return portlet.maxUrl.indexOf('portal') !== -1 //max url is a portal hit
                && portlet.portletName // there is a portletName
                && portlet.portletName.indexOf('cms') != -1; //the portlet is static content portlet
      };

      $scope.getLaunchURL = function(marketplaceEntry) {
        var layoutObj = marketplaceEntry.layoutObject;
        if($rootScope.GuestMode && !marketplaceEntry.hasInLayout) {
          return $scope.loginToAuthPage + '/web/apps/details/'+ marketplaceEntry.fname
        } else if(layoutObj.altMaxUrl == false && (layoutObj.renderOnWeb || $localStorage.webPortletRender)) {
          return 'exclusive/' + layoutObj.fname;
        } else if(layoutObj.altMaxUrl == false && $scope.isStatic(marketplaceEntry)) {
          return 'static/' + layoutObj.fname;
        } else {
          return marketplaceEntry.maxUrl;
        }
      };

      $scope.addToHome = function addToHome(portlet) {
          var fname = portlet.fname;
          var ret = layoutService.addToHome(portlet);
          ret.success(function (request, text){
              $('.fname-'+fname).html('<i class="fa fa-check"></i> Added Successfully').prop('disabled',true).removeClass('btn-add').addClass('btn-added');
              $scope.$apply(function(){
                  var marketplaceEntries = $.grep($sessionStorage.marketplace, function(e) { return e.fname === portlet.fname});
                  if(marketplaceEntries.length > 0) {
                      marketplaceEntries[0].hasInLayout = true;
                  }
                  $rootScope.layout = null; //reset layout due to modifications
                  $sessionStorage.layout = null;
              });
          })
              .error(function(request, text, error) {
                  $('.fname-'+fname).parent().append('<span>Issue adding to home, please try again later</span>');
              });
      };

      $scope.searchTermFilter = function(portlet) {
        return marketplaceService.portletMatchesSearchTerm(portlet, $scope.searchTerm, {
            searchDescription: true,
            searchKeywords: true,
            defaultReturn : true
        });
      };

      $scope.selectFilter = function (filter,category) {
          $scope.sortParameter = filter;
          $scope.categoryToShow = category;
          $scope.showCategories = false;
          if (filter === 'popular') {
              $scope.selectedFilter = 'popular';
              $scope.sortParameter = ['-rating','-userRated'];
          }
          if (filter === 'az') {
              $scope.selectedFilter = 'az';
              $scope.sortParameter = 'name';
          }
          if (filter === 'category') {
              $scope.selectedFilter = 'category';
              $scope.sortParameter = 'name';
              $scope.showCategories = true;
          }

          miscService.pushGAEvent('Marketplace','Tab Select',filter);

      };

	  $scope.slideTabs = function(direction) {
		  $scope.tabsPosition = 'start';
		  if (direction === 'right') {
			  $scope.tabsPosition = 'end';
		  }
	  };

      $scope.toggleShowAll = function() {
          $scope.showAll = !$scope.showAll;
      };

      this.setupSearchTerm = function() {
        var tempFilterText = '', filterTextTimeout;
        $scope.searchTerm = marketplaceService.getInitialFilter();
        if($routeParams.initFilter !== null && ($scope.searchTerm === null || $scope.searchTerm === "")) {
            $scope.searchTerm = $routeParams.initFilter;
        } else {
            marketplaceService.initialFilter("");
        }
        $scope.searchText = $scope.searchTerm;
        var initFilter = false;
        //delay on the filter
        $scope.$watch('searchText', function (val) {
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

            tempFilterText = val;
            filterTextTimeout = $timeout(function() {
                $scope.searchTerm = tempFilterText;
                if(initFilter && $scope.searchTerm) {
                    miscService.pushGAEvent('Search','Filter',$scope.searchTerm);
                } else {
                    initFilter = true;
                }
            }, 250); // delay 250 ms
        });
      };

      this.initializeConstants = function(){
        //initialize constants
        googleCustomSearchService.getPublicWebSearchURL().then(function(webSearchURL){
            $scope.webSearchUrl = webSearchURL;
        });
        googleCustomSearchService.getDomainResultsLabel().then(function(domainResultsLabel){
            $scope.domainResultsLabel = domainResultsLabel;
        });
        miscSearchService.getKBSearchURL().then(function(kbSearchURL){
            $scope.kbSearchUrl = kbSearchURL;
        });
        miscSearchService.getEventSearchURL().then(function(eventsSearchURL){
            $scope.eventsSearchUrl = eventsSearchURL;
        });
        miscSearchService.getHelpDeskHelpURL().then(function(helpdeskURL){
            $scope.helpdeskUrl = helpdeskURL;
        });
        $scope.directorySearchUrl = MISC_URLS.directorySearchURL;
        $scope.feedbackUrl = MISC_URLS.feedbackURL;
        $scope.loginToAuthPage = MISC_URLS.myuwHome;
      }

    }]);

    var currentPage = 'market';
    var currentCategory = '';

    app.controller('MarketplaceController', [
        '$rootScope','$scope', '$controller', 'marketplaceService',
        function($rootScope, $scope, $controller, marketplaceService) {

            var base = $controller('marketplaceCommonFunctions', { $scope : $scope });

            var init = function(){
              //init variables
              $scope.portlets = [];
              marketplaceService.getPortlets().then(function(data) {
                  $scope.portlets = data.portlets;
                  $scope.categories = data.categories;
              });

              base.setupSearchTerm();

              //initialize variables

              $scope.searchResultLimit = 20;
              $scope.showAll = $rootScope.GuestMode || false;
              if(currentPage === 'details') {
                  // Empty string indicates no categories, show all portlets
                  $scope.categoryToShow = "";
                  // Default filter is to sort by category for marketplaceDetails back to marketplace
                  $scope.selectedFilter = 'category';
                  // To sort by category, angular will use name to filter
                  $scope.sortParameter = 'name';
                  // Show category selection div by default
                  $scope.showCategories = true;

                  currentPage = 'market';
                  if(currentCategory !== '')
                      $scope.categoryToShow = currentCategory;
                  else
                      $scope.categoryToShow = '';
              } else {
                  // Empty string indicates no categories, show all portlets
                  $scope.categoryToShow = "";
                  // Default filter is to sort by popularity
                  $scope.selectedFilter = 'popular';
                  // To sort by popularity, angular will use portlet.rating to filter
                  $scope.sortParameter = ['-rating','-userRated'];
                  // Hide category selection div by default
                  $scope.showCategories = false;
              }

              base.initializeConstants();
            };

            //run functions
            init();
        } ]);

    app.controller('MarketplaceDetailsController', [
        '$controller', '$scope', '$routeParams', '$mdDialog', 'marketplaceService',
        'SERVICE_LOC',
        function($controller, $scope, $routeParams, $mdDialog, marketplaceService,
                 SERVICE_LOC) {

          $controller('marketplaceCommonFunctions', { $scope : $scope });

          $scope.specifyCategory = function(category) {
              currentCategory=category;
              currentPage='details';
          };

          var figureOutBackStuff = function() {
            var fromInfo = marketplaceService.getFromInfo();
            if(fromInfo.term) {
              //from somewhere
              if("Search" === fromInfo.searchOrBrowse && fromInfo.term) {
                //if from search and term is populated, return to search
                $scope.backText = "Search Results for " + fromInfo.term;
                $scope.backURL = "apps/search/" + fromInfo.term;
              } else {
                //assuming from browse
                $scope.backText = "Browse";
                $scope.backURL = "apps/browse/" + fromInfo.term;
              }

              //reset services
              marketplaceService.setFromInfo(undefined,undefined);
            } else {
              //direct hit, will go back to browse
              $scope.backURL="apps";
              $scope.backText="Browse";
            }
          };


          $scope.clickRatingReviewDetails = function() {
            $mdDialog.show({
      	        controller: 'MarketplaceRatingsModalController',
                templateUrl: require.toUrl('./partials/rating-review.html'),
                parent: angular.element(document.body),
                scope: $scope,
                preserveScope : true,
                clickOutsideToClose:true,
                fullscreen: false
            });
          }

          $scope.clickRatingReviewAdmin = function() {
            $mdDialog.show({
              controller: 'MarketplaceRatingReviewAdminController',
              templateUrl: require.toUrl('./partials/rating-review-admin.html'),
              parent: angular.element(document.body),
              scope: $scope,
              preserveScope : true,
              clickOutsideToClose:true,
              fullscreen: false
            });
          }

          // init
          var init = function() {
            $scope.loading = true;
            figureOutBackStuff();
            $scope.obj = [];
            $scope.ratingPrefix = SERVICE_LOC.base +
              SERVICE_LOC.marketplace.base;
            $scope.errorMessage = 'There was an issue loading details, please click back to apps.';
            marketplaceService.getPortlet($routeParams.fname).then(function(result) {
                $scope.loading = false;
                if(!result) {
                  $scope.error = true;
                  $scope.portlet = null;
                } else {
                  $scope.portlet = result;
                  $scope.error = false;
                }
            }, function(reason){
              $scope.loading = false;
              $scope.error = true;
            });
          };
          init();
        }]
    );

    app.controller('MarketplaceRatingsModalController', [
        '$scope', 'marketplaceService', '$mdDialog',
        function($scope, marketplaceService, $mdDialog){

            var init = function(){
        	    marketplaceService.getUserRating($scope.portlet.fname)
                .then(function(data) {
                  var rating = data;
                  if (rating !== null) {
                      $scope.rating = rating;
                      $scope.rating.previouslyRated=true;
                  } else {
                      $scope.rating = {
                                       "rating" : 0,
                                       "review" : "",
                                       "previouslyRated": false
                                      };
                  }
                });
            };

            init();

            $scope.ok = function () {
              $scope.thanks = true;
              marketplaceService.saveRating($scope.fname, $scope.rating);
              $mdDialog.hide();
            };

            $scope.cancel = function () {
              $mdDialog.cancel();
            };

        }]);

    app.controller('MarketplaceRatingReviewAdminController', [
        '$scope', 'marketplaceService',
        function($scope, marketplaceService) {
          var init = function(){
            $scope.ratings = [];
            marketplaceService.getAllRatings($scope.portlet.fname).then(function(ratings){
              if(!ratings){
                return;
              }
              $scope.ratings = ratings;
              $scope.average =0;
              $scope.totalReviews = 0;
              angular.forEach(ratings, function(value, key){
                $scope.average+= value.rating;
                if(value.review) {
                  $scope.totalReviews += 1;
                }
              });
              $scope.average = Math.round($scope.average / ratings.length);
            })
          };

          init();
         }]);

    return app;

});

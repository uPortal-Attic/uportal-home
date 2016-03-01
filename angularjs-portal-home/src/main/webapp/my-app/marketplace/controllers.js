'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.marketplace.controllers', []);

    app.controller('marketplaceCommonFunctions',
      ['googleCustomSearchService', 'layoutService', 'marketplaceService', 'miscService', 'MISC_URLS', '$sessionStorage',
       '$localStorage','$rootScope', '$scope', '$modal', '$routeParams', '$timeout', '$location',
       function(googleCustomSearchService, layoutService, marketplaceService, miscService,MISC_URLS, $sessionStorage,
        $localStorage, $rootScope, $scope, $modal, $routeParams, $timeout, $location){

      $scope.navToDetails = function(marktetplaceEntry, location) {
        marketplaceService.setFromInfo(location, $scope.searchTerm);
        $location.path("apps/details/"+ marktetplaceEntry.fname);
      };

      $scope.isStatic = function(portlet) {
        return portlet.maxUrl.indexOf('portal') !== -1 //max url is a portal hit
                && portlet.portletName // there is a portletName
                && portlet.portletName.indexOf('cms') != -1; //the portlet is static content portlet
      }

      $scope.getLaunchURL = function(marketplaceEntry) {
        var layoutObj = marketplaceEntry.layoutObject;
        if($rootScope.GuestMode && !marketplaceEntry.hasInLayout) {
          return $scope.loginToAuthPage + '/web/apps/details/'+ marketplaceEntry.fname
        } else if(layoutObj.altMaxUrl == false && (layoutObj.renderOnWeb || $localStorage.webPortletRender)) {
          return 'exclusive/' + layoutObj.fname;
        } else if($scope.isStatic(marketplaceEntry)) {
          return 'static/' + layoutObj.fname;
        } else {
          return marketplaceEntry.maxUrl;
        }
      }

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

      $scope.openRating = function (size, fname, name) {
          var modalInstance = $modal.open({
              templateUrl: 'ratingModal.html',
              controller: 'RatingModalController',
              size: size,
              resolve: {
                  fname: function(){return fname;},
                  name: function(){return name;}
              }
          });
          modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
          }, function () {
              console.log('Modal dismissed at: ' + new Date());
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
        $scope.webSearchDomain = MISC_URLS.webSearchDomain;
        $scope.directorySearchUrl = MISC_URLS.directorySearchURL;
        $scope.kbSearchUrl = MISC_URLS.kbSearchURL;
        $scope.eventsSearchUrl = MISC_URLS.eventsSearchURL;
        $scope.feedbackUrl = MISC_URLS.feedbackURL;
        $scope.helpdeskUrl = MISC_URLS.helpdeskURL;
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

    app.controller('RatingModalController', function ($scope, $modalInstance, marketplaceService, fname, name) {

        $scope.fname = fname;
        $scope.name = name;
        $scope.rating = {};
        $scope.thanks = false;

        marketplaceService.getUserRating(fname).then(function(data) {
            var rating = data;
            if (rating !== null) {
                $scope.rating = rating;
                $scope.rating.previouslyRated=true;
            } else {
                $scope.rating = {"rating" : 0 , "review" : "", "previouslyRated": false};//init view
            }

        });

        $scope.ok = function () {
            $scope.thanks = true;
            marketplaceService.saveRating($scope.fname, $scope.rating);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

    app.controller('MarketplaceDetailsController', [
        '$controller', '$scope', '$routeParams', 'marketplaceService',
        function($controller, $scope, $routeParams, marketplaceService) {

          $controller('marketplaceCommonFunctions', { $scope : $scope });

          $scope.specifyCategory = function(category) {
              currentCategory=category;
              currentPage='details';
          }

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
          }
          // init
          var init = function() {
            $scope.loading = true;
            figureOutBackStuff();
            $scope.obj = [];
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

    return app;

});

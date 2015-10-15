'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.marketplace.controllers', []);

    var currentPage = 'market';
    var currentCategory = '';

    app.controller('MarketplaceController', [
        '$sessionStorage', '$modal', '$timeout', '$rootScope', '$window',
        '$http', '$scope', '$location', '$routeParams', 'marketplaceService',
        'layoutService','miscService', 'mainService', 'MISC_URLS',
        function($sessionStorage, $modal, $timeout, $rootScope, $window,
                 $http, $scope, $location, $routeParams, marketplaceService,
                 layoutService, miscService, mainService, MISC_URLS) {

            //init variables
            var store = this;
            $scope.portlets = [];
            store.count = 0;
            store.user = [];

            marketplaceService.getPortlets().then(function(data) {
                $scope.portlets = data.portlets;
                $scope.categories = data.categories;
            });

            //setup search term
            var tempFilterText = '', filterTextTimeout;
            $scope.searchTerm = marketplaceService.getInitialFilter();
            if($routeParams.initFilter !== null && ($scope.searchTerm === null || $scope.searchTerm === "")) {
                $scope.searchTerm = $routeParams.initFilter;
            } else {
                marketplaceService.initialFilter("");
            }
            $scope.searchText = $scope.searchTerm;
            $scope.searchResultLimit = 20;

            miscService.pushPageview($scope.searchTerm);

            //Functions

            this.goToDetails = function(){
                $location.path("apps/" + fname );
            };

            this.addToHome = function addToHomeFunction(index, portlet) {
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
            $scope.showAll = false;
            $scope.toggleShowAll = function() {
                $scope.showAll = !$scope.showAll;
            };
            
            $scope.webSearchUrl = MISC_URLS.webSearchURL;
            $scope.webSearchDomain = MISC_URLS.webSearchDomain;
            $scope.directorySearchUrl = MISC_URLS.directorySearchURL;
            $scope.kbSearchUrl = MISC_URLS.kbSearchURL;
            $scope.eventsSearchUrl = MISC_URLS.eventsSearchURL;

            $scope.feedbackUrl = MISC_URLS.feedbackURL;
            $scope.helpdeskUrl = MISC_URLS.helpdeskURL;

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
            })

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
        '$rootScope', '$scope', '$location', '$modal', '$routeParams', '$sessionStorage', 'marketplaceService', 'miscService', 'layoutService',
        function($rootScope, $scope, $location, $modal, $routeParams, $sessionStorage, marketplaceService, miscService, layoutService) {

          $scope.addToHome = function addToHomeFunction() {
              var ret = layoutService.addToHome($scope.portlet);
              var fname = $scope.portlet.fname;
              ret.success(function (request, text){
                  $('.fname-'+fname).html('<i class="fa fa-check"></i> Added Successfully').prop('disabled',true).removeClass('btn-add').addClass('btn-added');
                  $scope.$apply(function(){
                      if($sessionStorage.marketplace) {
                        var marketplaceEntries = $.grep($sessionStorage.marketplace, function(e) { return e.fname === portlet.fname});
                        if(marketplaceEntries.length > 0) {
                            marketplaceEntries[0].hasInLayout = true;
                        }
                      }
                      $rootScope.layout = null; //reset layout due to modifications
                      $sessionStorage.layout = null;
                  });
              })
                  .error(function(request, text, error) {
                      $scope.error = true;
                      $scope.errorMessage = 'There was an issue adding to home, please try again later';
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

            $scope.specifyCategory = function(category) {
                currentCategory=category;
                currentPage='details';
            }
            // init
            miscService.pushPageview();
            $scope.loading = true;
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
        }]
    );

    return app;

});

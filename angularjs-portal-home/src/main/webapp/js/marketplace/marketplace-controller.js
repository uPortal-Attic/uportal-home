'use strict';

(function() {
  var app = angular.module('portal.marketplace.controller', []);

  app.controller('MarketplaceController', 
    [ '$sessionStorage', '$modal', '$timeout', '$rootScope', '$window', 
    '$http', '$scope', '$location', '$routeParams', 'marketplaceService',
    'layoutService','miscService', 'mainService', 
    function($sessionStorage, $modal, $timeout, $rootScope, $window, 
      $http, $scope, $location, $routeParams, marketplaceService, 
      layoutService, miscService, mainService) {

    $scope.$storage = $sessionStorage;
    //init variables
    var store = this;
    store.portlets = [];
    store.count = 0;
    store.user = [];
    mainService.getUser().then(function(result){
      store.user = result.data.person;

      //get marketplace portlets
      if($sessionStorage.sessionKey == store.user.sessionKey
        && $sessionStorage.marketplace != null
        && $sessionStorage.categories != null) {

          store.portlets = $sessionStorage.marketplace;
          $scope.categories = $sessionStorage.categories;
          
      } else {
          marketplaceService.getPortlets().then(function(data) {
            store.portlets = data.portlets;
            $scope.categories = data.categories;
            $scope.layout = data.layout;
            
            $sessionStorage.marketplace = data.portlets;
            $sessionStorage.categories = data.categories;
            $sessionStorage.sessionKey = store.user.sessionKey;
          });
      }
      
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
    
    miscService.pushPageview($scope.searchTerm, 'Initial');

    
    //Functions

    this.goToDetails = function(){
      $location.path("/apps/" + fname );
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
        if($scope.searchTerm === undefined) {//nothing filled for search
            return true;
        }
        var searchTerm = $scope.searchTerm.toLowerCase(); //create local var for searchTerm
        
        if(portlet.title.toLowerCase().indexOf(searchTerm) !== -1) {//check title
            return true;
        }
        
        //check description match
        if(portlet.description !== null 
                && portlet.description.toLowerCase().indexOf(searchTerm) !== -1) {
            return true;
        }
        
        //last ditch effort, check keywords
        if(portlet.keywords !== null) {
            for(var i = 0; i < portlet.keywords.length; i++) {
                if(portlet.keywords[i].toLowerCase().indexOf(searchTerm) !== -1) {
                    return true;
                }
            }
        }
        return false;
    };


    // Empty string indicates no categories, show all portlets
    $scope.categoryToShow = "";
    // Default filter is to sort by popularity
    $scope.selectedFilter = 'popular';
    // To sort by popularity, angular will use portlet.rating to filter
    $scope.sortParameter = ['-rating','-userRated'];
    // Hide category selection div by default
    $scope.showCategories = false;

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

    };
    $scope.showAll = false;
    $scope.toggleShowAll = function() {
      $scope.showAll = !$scope.showAll;
    };

    
    //delay on the filter
    $scope.$watch('searchText', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.searchTerm = tempFilterText;
            miscService.pushPageview($scope.searchTerm, 'Filter');
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

  app.controller('MarketplaceDetailsController', [ '$scope', '$location', '$routeParams', 'marketplaceService', 'miscService', function($scope, $location, $routeParams, marketplaceService, miscService) {

    miscService.pushPageview();

    marketplaceService.getPortlets().then(function(data) {
      $scope.portlets = data.portlets;
      for(var p in $scope.portlets) {
        if ($scope.portlets[p].fname == $routeParams.fname) {
          $scope.portlet = $scope.portlets[p];
        };
      };
    });



    marketplaceService.getPortlets().then(function(data) {
      $scope.portlets = data.portlets;
    });

    if($routeParams.fname !== null) {
      $scope.showDetails = true;
    };



    } ]);
})();

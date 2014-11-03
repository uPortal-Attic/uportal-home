'use strict';

(function() {
  var app = angular.module('portal.marketplace.controller', []);

  app.controller('MarketplaceController', [  '$window', '$http', '$scope','$location','$routeParams','marketplaceService','miscService', function($window, $http, $scope, $location, $routeParams, marketplaceService, miscService) {

    miscService.pushPageview();

    var store = this;
    store.portlets = [];
    store.count = 0;
    $scope.searchTerm = marketplaceService.getInitialFilter();
    if($routeParams.initFilter !== null && ($scope.searchTerm === null || $scope.searchTerm === "")) {
      $scope.searchTerm = $routeParams.initFilter;
    } else {
      marketplaceService.initialFilter("");
    }

    marketplaceService.getPortlets().then(function(data) {
      store.portlets = data.portlets;
      $scope.categories = data.categories;
    });

    this.goToDetails = function(){
      $location.path("/marketplace/" + fname );
    };

    this.addToHome = function addToHomeFunction(index, portlet) {
      var fname = portlet.fname;
      var tabName = "UW Bucky Home";
      $.ajax({
              url: "/portal/api/layout?action=addPortlet&fname=" + fname +"&tabName=" + tabName,
              type: "POST",
              data: null,
              dataType: "json",
              async: true,
              success: function (request, text){
                $('.fname-'+fname).html('<i class="fa fa-check"></i> Added Successfully').prop('disabled',true).removeClass('btn-add').addClass('btn-added');
                miscService.pushGAEvent('Layout Modification', 'Add', portlet.name);
              },
              error: function(request, text, error) {
                $('.fname-'+fname).parent().append('<span>Issue adding to home, please try again later</span>');
              }
          });
    };

    $scope.searchTermFilter = function(portlet) {
      return ($scope.searchTerm === undefined
        || portlet.name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1
        || (portlet.description !== null && portlet.description.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1)
      );
    };


    // Empty string indicates no categories, show all portlets
    $scope.categoryToShow = "";
    // Default filter is to sort by popularity
    $scope.selectedFilter = 'popular';
    // To sort by popularity, angular will use portlet.rating to filter
    $scope.sortParameter = '-rating';
    // Hide category selection div by default
    $scope.showCategories = false;

    $scope.selectFilter = function (filter,category) {
      $scope.sortParameter = filter;
      $scope.categoryToShow = category;
      $scope.showCategories = false;
      if (filter === 'popular') {
        $scope.selectedFilter = 'popular';
        $scope.sortParameter = '-rating';
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



  } ]);

  app.controller('MarketplaceDetailsController', [ '$scope', '$location', '$routeParams', 'marketplaceService', 'miscService', function($scope, $location, $routeParams, marketplaceService, miscService) {

    miscService.pushPageview();

    marketplaceService.getPortlet().then(function(data) {
      $scope.portlets = data.portlets;
      for(var p in $scope.portlets) {
        if ($scope.portlets[p].fname == $routeParams.fname) {
          $scope.portlet = $scope.portlets[p];
        }
      }
    });



    marketplaceService.getPortlets().then(function(data) {
      $scope.portlets = data.portlets;
    });

    if($routeParams.fname !== null) {
      $scope.showDetails = true;
    } 



    } ]);
})();

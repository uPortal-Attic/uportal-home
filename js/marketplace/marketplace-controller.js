'use strict';

(function() {
  var app = angular.module('portal.marketplace.controller', []);

  app.controller('MarketplaceController', [ '$http', '$scope','$location','$routeParams','marketplaceService', function($http, $scope, $location, $routeParams, marketplaceService) {
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
    })

    this.goToDetails = function(){
      $location.path("/marketplace/" + fname );
    }

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

    $scope.showCategories = function() {

    }
    $scope.categories = [
      'Academics',
      'Administration',
      'Demonstration',
      'Entertainment',
      'Featured',
      'Help',
      'Information',
      'Instructors',
      'News',
      'Uportal'
    ];


  } ]);

  app.controller('MarketplaceDetailsController', [ '$scope', '$location', '$routeParams', 'marketplaceService', function($scope, $location, $routeParams, marketplaceService) {
    marketplaceService.getPortlet().then(function(data) {
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

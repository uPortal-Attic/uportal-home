'use strict';

define(['angular', 'portal/search/controllers', 'my-app/marketplace/controllers'], function(angular) {

    var app = angular.module('my-app.search.controllers', ['portal.search.controllers', 'my-app.marketplace.controllers']);
    app.controller('SearchController', [ 'marketplaceService', '$location', '$scope', '$localStorage', function(marketplaceService, $location, $scope, $localStorage) {
        $scope.initialFilter = '';
        $scope.filterMatches = [];
        $scope.portletListLoading = true;
        if($localStorage && $localStorage.typeaheadSearch) {
            marketplaceService.getPortlets().then(function(data){
                $scope.portlets = data.portlets;
                $scope.portletListLoading = false;
            });
        }

        $scope.$watch('initialFilter', function(newVal, oldVal) {
            if (!newVal || !$scope.portlets) {
                $scope.filterMatches = [];
                return;
            }

            $scope.filterMatches = marketplaceService.filterPortletsBySearchTerm($scope.portlets, newVal);
        });

        $scope.onSelect = function(portlet) {
            $location.path("apps/details/"+ portlet.fname);
            $scope.initialFilter = "";
            $scope.showSearch = false;
            $scope.showSearchFocus = false;
        };

        $scope.submit = function(){
            if($scope.initialFilter != "") {
                $location.path("apps/search/"+ $scope.initialFilter);
                $scope.initialFilter = "";
                $scope.showSearch = false;
                $scope.showSearchFocus = false;
            }
        };
    }]);

    app.controller('SearchResultController',
     ['$location', '$rootScope', '$scope', '$controller','marketplaceService', 'googleCustomSearchService', 'directorySearchService','PortalSearchService',
     function($location, $rootScope, $scope, $controller,marketplaceService, googleCustomSearchService, directorySearchService, PortalSearchService) {
      var base = $controller('marketplaceCommonFunctions', {$scope : $scope});

      var initWiscEduSearch = function(){
        googleCustomSearchService.googleSearch($scope.searchTerm).then(
          function(results){
            if(results && results.responseData && results.responseData.results) {
              $scope.googleResults = results.responseData.results;
              if(results.responseData.cursor.estimatedResultCount){
                $scope.googleResultsEstimatedCount = results.responseData.cursor.estimatedResultCount;
              }else{
                $scope.googleEmptyResults = true;
              }
            }
          }
        );
      };

      var initDirectorySearch = function(){
        $scope.wiscDirectoryLoading = true;
        directorySearchService.directorySearch($scope.searchTerm).then(
          function(results){
            $scope.wiscDirectoryLoading = false;
            if(results){
              if(results.records && results.count) {
                $scope.wiscDirectoryResults = results.records;
                $scope.wiscDirectoryResultCount = results.count;
              } else {
                $scope.wiscDirectoryResultsEmpty = true;
              }
              if(results.errors && results.errors[0] && results.errors[0].code && results.errors[1] && results.errors[1].error_msg){
                if(results.errors[0].code == 4){
                  $scope.wiscDirectoryTooManyResults = true;
                }
                $scope.wiscDirectoryErrorMessage= results.errors[1].error_msg;
              }
            }
          }, function(){
            $scope.wiscDirectoryLoading = false;
            $scope.wiscDirectoryError = true;
          }
        );
      };

      $scope.filterTo = function(filterName) {
        $('.search-results .inner-nav li').removeClass('active');
        if (filterName == 'all') {
          $('#all-selector').addClass('active');
          $('#myuw-results').show();
          $('#myuw-results-header').show();
          $('#wisc-directory-results').show();
          $('#wisc-directory-results-header').show();
          $('#wisc-edu-results').show();
          $('#wisc-edu-results-header').show();
          $('#wiscDirectorySeeMoreResults').show();
          initwiscDirectoryResultLimit();
        } else if (filterName == 'myuw') {
          $('#myuw-selector').addClass('active');
          $('#myuw-results').show();
          $('#myuw-results-header').hide();
          $('#wisc-directory-results').hide();
          $('#wisc-edu-results').hide();
          $('#wiscDirectorySeeMoreResults').hide();
        } else if (filterName == 'directory') {
          $('#directory-selector').addClass('active');
          $('#wisc-directory-results').show();
          $('#wisc-directory-results-header').hide();
          $('#myuw-results').hide();
          $('#wisc-edu-results').hide();
          $('#wiscDirectorySeeMoreResults').hide();
          $scope.wiscDirectoryResultLimit = 25;
        } else if (filterName == 'google') {
          $('#google-selector').addClass('active');
          $('#wisc-edu-results').show();
          $('#wisc-edu-results-header').hide();
          $('#myuw-results').hide();
          $('#wisc-directory-results').hide();
          $('#wiscDirectorySeeMoreResults').hide();
        }
      };

      var initwiscDirectoryResultLimit = function(){
          $scope.wiscDirectoryResultLimit = 3;
      }

      var init = function(){
        $scope.sortParameter = ['-rating','-userRated'];
        initwiscDirectoryResultLimit();
        $scope.myuwResults = [];
        $scope.googleResults = [];
        $scope.directoryEnabled = false;
        $scope.wiscDirectoryResults = [];
        $scope.wiscDirectoryResultCount = 0;
        $scope.wiscDirectoryTooManyResults = false;
        $scope.googleSearchEnabled = false;
        $scope.googleResultsEstimatedCount = 0;
        $scope.googleEmptyResults = false;
        $scope.totalCount = 0;
        $scope.searchResultLimit = 20;
        $scope.showAll = $rootScope.GuestMode || false;
        base.setupSearchTerm();
        PortalSearchService.setQuery($scope.searchTerm); //in case the search field is not set for whatever reason, reset it
        base.initializeConstants();
        //get marketplace entries
        marketplaceService.getPortlets().then(function(data) {
            $scope.myuwResults = data.portlets;
        });
        $scope.$watchGroup(['googleResultsEstimatedCount','myuwFilteredResults.length', 'wiscDirectoryResultCount'], function(){
          $scope.totalCount = 0;
          if($scope.googleResultsEstimatedCount) {
            $scope.totalCount+= parseInt($scope.googleResultsEstimatedCount);
          }
          if($scope.myuwFilteredResults){
            $scope.totalCount+= parseInt($scope.myuwFilteredResults.length);
          }
          if($scope.wiscDirectoryResultCount){
            $scope.totalCount+= parseInt($scope.wiscDirectoryResultCount);
          }
        });
      };
      init();
      
      googleCustomSearchService.googleSearchEnabled().then(function(googleSearchEnabled){
          $scope.googleSearchEnabled = googleSearchEnabled;
          if(googleSearchEnabled){
              initWiscEduSearch();
          }
      });
      directorySearchService.directorySearchEnabled().then(function(directoryEnabled){
          $scope.directoryEnabled = directoryEnabled;
          if(directoryEnabled){
              initDirectorySearch();
          }
      });
      
    }]);

    return app;

});

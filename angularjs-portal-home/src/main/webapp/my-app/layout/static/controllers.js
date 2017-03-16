'use strict';

define(['angular', 'jquery', 'require'], function (angular, $, require) {

  var app = angular.module('my-app.layout.static.controllers', []);

  app.controller('ExclusiveContentController', ['$location', '$sessionStorage', '$routeParams', '$rootScope', '$scope', 'layoutService',
    function ($location, $sessionStorage, $routeParams, $rootScope, $scope, layoutService) {

      // BINDABLE MEMBERS
      $scope.portlet = {};
      $scope.loaded = false;

      // Resolve promises
      var endFn = function () {
        $scope.loaded = true;
        $scope.empty = $scope.portlet.exclusiveContent && $scope.portlet.exclusiveContent.length > 0 ? false : true;
      };

      // Get the requested app from layoutService
      layoutService.getApp($routeParams.fname).then(function (result) {
        var data = result.data;
        $scope.portlet = data.portlet;
        if (typeof $scope.portlet === 'undefined' ||
          typeof $scope.portlet.fname === 'undefined') {
          if (result.status === 403) {
            $scope.loaded = true;
            $scope.empty = false;
            $scope.portlet = {};
            $scope.portlet.title = 'Access Denied';
            $scope.portlet.faIcon = 'fa-exclamation-triangle';
            $scope.portlet.exclusiveContent = result.deniedTemplate;
          } else {
            $location.path('/');
          }
        } else {
          $scope.loaded = true;
          layoutService.getExclusiveMarkup($scope.portlet).then(endFn, endFn);
        }
      });

    }]);

  app.controller('StaticContentController', ['$location', '$sessionStorage', '$routeParams', '$rootScope', '$scope', 'layoutService',
    function ($location, $sessionStorage, $routeParams, $rootScope, $scope, layoutService) {

      // BINDABLE MEMBERS
      $scope.portlet = {};
      $scope.loaded = false;

      // Get requested app from layoutService
      layoutService.getApp($routeParams.fname).then(function (result) {
        var data = result.data;
        $scope.portlet = data.portlet;
        if (typeof $scope.portlet === 'undefined' ||
          typeof $scope.portlet.fname === 'undefined') {
          if (result.status === 403) {
            $scope.loaded = true;
            $scope.empty = false;
            $scope.portlet = {};
            $scope.portlet.title = 'Access Denied';
            $scope.portlet.faIcon = 'fa-exclamation-triangle';
            $scope.portlet.exclusiveContent = result.deniedTemplate;
          } else {
            $location.path('/');
          }

        } else {
          $scope.loaded = true;
        }
      });

      this.addToHome = function (portlet) {
        var ret = layoutService.addToHome(portlet);
        ret.success(function (request, text) {
          $('.fname-' + portlet.fname).html('<span style="color : green;"><i class="fa fa-check"></i> Added Successfully</span>').prop('disabled', true);
          $scope.$apply(function () {
            if (typeof $sessionStorage.marketplace !== 'undefined') {
              var marketplaceEntries = $.grep($sessionStorage.marketplace, function (e) {
                return e.fname === portlet.fname
              });
              if (marketplaceEntries.length > 0) {
                marketplaceEntries[0].hasInLayout = true;
              }
            }

            //reset layout due to modifications
            $rootScope.layout = null;
            $sessionStorage.layout = null;

          });
        })
          .error(function (request, text, error) {
            $('.fname-' + portlet.fname).html('<span style="color : red;">Issue adding to home, please try again later</span>');
          });
      };

      this.inLayout = function () {
        var layout = $rootScope.layout;
        var ret = false;
        if (!layout) {
          //get layout
          layoutService.getLayout().then(function (data) {
            $rootScope.layout = data.layout;
            var portlets = $.grep($rootScope.layout, function (e) {
              return e.fname === $routeParams.fname
            });
            $scope.inFavorites = portlets.length > 0; //change scope variable to trigger apply
          });
        } else {
          var portlets = $.grep($rootScope.layout, function (e) {
            return e.fname === $routeParams.fname
          });
          ret = portlets.length > 0;
        }

        return ret;
      };

      $scope.inFavorites = this.inLayout();
    }]);

  return app;

});

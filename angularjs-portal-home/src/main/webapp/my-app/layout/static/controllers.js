'use strict';

define(['angular', 'jquery', 'require'], function(angular, $, require) {
  return angular.module('my-app.layout.static.controllers', [])

  .controller('ExclusiveContentController',
    ['$location', '$log', '$routeParams', '$scope', 'layoutService',
    function($location, $log, $routeParams, $scope, layoutService) {
      // BINDABLE MEMBERS
      $scope.portlet = {};
      $scope.loaded = false;

      // Resolve promises
      var endFn = function() {
        $scope.loaded = true;
        $scope.empty = $scope.portlet.exclusiveContent &&
          $scope.portlet.exclusiveContent.length > 0 ? false : true;
      };

      // Get the requested app from layoutService
      layoutService.getApp($routeParams.fname).then(function(result) {
        var data = result.data;
        $scope.portlet = data.portlet;
        if (angular.isUndefined($scope.portlet) ||
          angular.isUndefined($scope.portlet.fname)) {
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
          layoutService.getExclusiveMarkup($scope.portlet)
            .then(endFn).catch(endFn);
        }
        return result;
      }).catch(function() {
        $log.warn('Could not getApp ' + $routeParams.fname);
      });
    }])

  .controller('StaticContentController',
    ['$location', '$log', '$sessionStorage', '$routeParams',
      '$rootScope', '$scope', 'layoutService',
    function($location, $log, $sessionStorage, $routeParams,
        $rootScope, $scope, layoutService) {
      // BINDABLE MEMBERS
      $scope.portlet = {};
      $scope.loaded = false;

      // Get requested app from layoutService
      layoutService.getApp($routeParams.fname).then(function(result) {
        var data = result.data;
        $scope.portlet = data.portlet;
        if (angular.isUndefined($scope.portlet) ||
          angular.isUndefined($scope.portlet.fname)) {
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
        return result;
      }).catch(function() {
        $log.warn('Could not getApp ' + $routeParams.fname);
      });

      this.addToHome = function(portlet) {
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

      this.inLayout = function() {
        var layout = $rootScope.layout;
        var ret = false;
        if (!layout) {
          // get layout
          layoutService.getLayout().then(function(data) {
            $rootScope.layout = data.layout;
            var portlets = $.grep($rootScope.layout, function(e) {
              return e.fname === $routeParams.fname;
            });
            // change scope variable to trigger apply
            $scope.inFavorites = portlets.length > 0;
            return data;
          }).catch(function() {
            $log.warn('Could not getLayout');
          });
        } else {
          var portlets = $.grep($rootScope.layout, function(e) {
            return e.fname === $routeParams.fname;
          });
          ret = portlets.length > 0;
        }

        return ret;
      };

      $scope.inFavorites = this.inLayout();
    }]);
});

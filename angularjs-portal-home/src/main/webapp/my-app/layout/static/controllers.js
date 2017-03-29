'use strict';

define(['angular', 'jquery', 'require'], function(angular, $, require) {
  return angular.module('my-app.layout.static.controllers', [])

  .controller('ExclusiveContentController',
    ['$location', '$log', '$routeParams', 'layoutService',
    function($location, $log, $routeParams, layoutService) {
      var vm = this;
      // BINDABLE MEMBERS
      vm.portlet = {};
      vm.loaded = false;

      // Resolve promises
      var endFn = function() {
        vm.loaded = true;
        vm.empty = vm.portlet.exclusiveContent &&
          vm.portlet.exclusiveContent.length > 0 ? false : true;
      };

      // Get the requested app from layoutService
      layoutService.getApp($routeParams.fname).then(function(result) {
        var data = result.data;
        vm.portlet = data.portlet;
        if (angular.isUndefined(vm.portlet) ||
         angular.isUndefined(vm.portlet.fname)) {
          if (result.status === 403) {
            vm.loaded = true;
            vm.empty = false;
            vm.portlet = {};
            vm.portlet.title = 'Access Denied';
            vm.portlet.faIcon = 'fa-exclamation-triangle';
            vm.portlet.exclusiveContent = result.deniedTemplate;
          } else {
            $location.path('/');
          }
        } else {
          vm.loaded = true;
          layoutService.getExclusiveMarkup(vm.portlet)
            .then(endFn).catch(endFn);
        }
        return result;
      }).catch(function() {
        $log.warn('Could not getApp ' + $routeParams.fname);
      });
    }])

  .controller('StaticContentController',
    ['$location', '$log', '$sessionStorage', '$routeParams',
      '$rootScope', 'layoutService',
    function($location, $log, $sessionStorage, $routeParams,
        $rootScope, layoutService) {
      var vm = this;
      // BINDABLE MEMBERS
      vm.portlet = {};
      vm.loaded = false;

      // Get requested app from layoutService
      layoutService.getApp($routeParams.fname).then(function(result) {
        var data = result.data;
        vm.portlet = data.portlet;
        if (angular.isUndefined(vm.portlet) ||
          angular.isUndefined(vm.portlet.fname)) {
          if (result.status === 403) {
            vm.loaded = true;
            vm.empty = false;
            vm.portlet = {};
            vm.portlet.title = 'Access Denied';
            vm.portlet.faIcon = 'fa-exclamation-triangle';
            vm.portlet.exclusiveContent = result.deniedTemplate;
          } else {
            $location.path('/');
          }
        } else {
          vm.loaded = true;
        }
        return result;
      }).catch(function() {
        $log.warn('Could not getApp ' + $routeParams.fname);
      });

      vm.addToHome = function(portlet) {
        var ret = layoutService.addToHome(portlet);
        ret.success(function(request, text) {
          angular.element('.fname-' + portlet.fname)
            .html('<span style="color : green;">' +
              '<i class="fa fa-check"></i> Added Successfully</span>')
            .prop('disabled', true);
          vm.$apply(function() {
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

      vm.inLayout = function() {
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
            vm.inFavorites = portlets.length > 0;
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

      vm.inFavorites = vm.inLayout();
    }]);
});

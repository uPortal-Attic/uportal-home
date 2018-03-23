/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';

define(['angular', 'jquery'], function(angular, $) {
  return angular.module('my-app.layout.controllers', [])

  /**
   * Controller for default view (my-app/layout/partials/default-view.html)
   */
  .controller('DefaultViewController',
    ['$scope', '$location', '$mdMedia', '$localStorage', 'APP_FLAGS',
    function($scope, $location, $mdMedia, $localStorage, APP_FLAGS) {
      $scope.loading = [];
      if (!APP_FLAGS[$localStorage.layoutMode]) {
        // Layout mode set weird, reset to default
        $localStorage.layoutMode = ($mdMedia('xs') && APP_FLAGS.compact) ?
        'compact' : APP_FLAGS.defaultView;
      }
      $location.path('/' + $localStorage.layoutMode);
  }])

  .controller('RemoveWidgetController', ['$scope', '$filter', '$sessionStorage',
    '$mdToast', 'layoutService', function($scope, $filter, layoutService,
                                $mdToast, $sessionStorage) {
      var vm = this;
      /**
       * Remove widget from visible layout, then trigger confirmation toast
       * before persisting the layout change
       * @param fname
       */
      vm.removeWidget = function(title, fname) {
        // Filter for fname match in layout
        var result = $filter('filter')($scope.$parent.layout, fname);
        var index = $scope.$parent.layout.indexOf(result[0]);

        // Remove from layout
        $scope.$parent.layout.splice(index, 1);

        // Trigger confirmation toast
        confirmWidgetRemoval(title, fname);
      };


      var confirmWidgetRemoval = function(title, fname) {
        $mdToast.show({
          hideDelay: false,
          parent: angular.element('.layout-list'),
          position: 'top right',
          scope: $scope,
          templateUrl:
            require.toUrl('my-app/layout/partials/toast-widget-removal.html'),
          controller: function RemoveWidgetToastController(
            $scope,
            $sessionStorage,
            layoutService
          ) {
            console.log(angular.element('.layout-list').scope());
            console.log(angular.element('.toast__widget-removal').scope());
            // If user clicked OK, persist change
            // layoutService.removeFromHome(fname).success(function() {
            //   // Filter for fname match in layout
            //   var result = $filter('filter')($scope.$parent.layout, fname);
            //   var index = $scope.$parent.layout.indexOf(result[0]);
            //
            //   // Remove from layout
            //   $scope.$apply($scope.$parent.layout.splice(index, 1));
            //
            //   // Clear marketplace flag
            //   if ($sessionStorage.marketplace != null) {
            //     // Filter for fname match in marketplace
            //     var marketplaceEntries = $filter('filter')(
            //       $sessionStorage.marketplace, result[0].fname
            //     );
            //     if (marketplaceEntries.length > 0) {
            //       // Remove the entry flag
            //       marketplaceEntries[0].hasInLayout = false;
            //     }
            //   }
            // }).error(
            //   function(request, text, error) {
            //     alert('Issue deleting ' + fname +
            //       ' from your list of favorites, try again later.');
            //   });
          }
        });
      };
    }])

  /**
   * Widget initialization and sorting for expanded mode widget layout
   * (/widget/partials/home-widget-view.html and
   * /widget/partials/widget-card.html)
   */
  .controller('WidgetController',
  ['$controller', '$log', '$scope', '$rootScope', 'layoutService',
    function($controller, $log, $scope, $rootScope, layoutService) {
      var vm = this;
      $scope.selectedNodeId = '';

      /**
       * Set the selected widget in scope to track focus
       * @param nodeId {string} The id of the selected widget
       */
      $scope.selectNode = function(nodeId) {
        $scope.selectedNodeId = nodeId;
      };

      /**
       * Log whenever a widget is moved
       * @param eventType {String} Kind of interaction that moved the widget
       * @param fname {String} The moved widget's fname
       * @param dropIndex {Number} Index where the widget landed
       * @param startIndex {Number} (optional) Index before moving the widget
       * @return
       */
      $scope.logEvent = function(eventType, fname, dropIndex, startIndex) {
        switch (eventType) {
          case 'dragEnd':
            $log.info('Dragged ' + fname + ' to index ' + dropIndex);
            break;
          case 'keyboardMove':
            $log.info('Moved ' + fname + 'from index ' + startIndex +
              ' to index ' + dropIndex);
            break;
          default:
            return;
        }
      };

      /**
       * Respond to arrow key-presses when focusing a movable list element
       * @param widget {Object} The widget trying to move
       * @param event {Object} The event object
       */
      $scope.moveWithKeyboard = function(widget, event) {
        // get index independent of ng-repeat to avoid filter bugs
        var currentIndex =
          findLayoutIndex($scope.layout, 'nodeId', widget.nodeId);
        var previousIndex = currentIndex - 1;
        var nextIndex = currentIndex + 1;

        // left or up
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          // stop element from losing focus
          event.preventDefault();
          // if currentIndex is already 0, do nothing
          if (currentIndex !== 0) {
            // remove item from the list
            $scope.layout.splice(currentIndex, 1);
            // reinsert at new index
            $scope.layout.splice(previousIndex, 0, widget);
            // save new layout order
            saveLayoutOrder(previousIndex,
              $scope.layout.length,
              widget.nodeId);
            // log change
            $scope.logEvent( 'keyboardMove',
              widget.fname,
              previousIndex,
              currentIndex);
          }
        }
        // right or down
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          // stop screen from scrolling
          event.preventDefault();
          // if currentIndex is end of the list, do nothing
          if (currentIndex !== $scope.layout.length - 1) {
            // remove item from the list
            $scope.layout.splice(currentIndex, 1);
            // reinsert at desired index
            $scope.layout.splice(nextIndex, 0, widget);
            // save new layout order
            saveLayoutOrder(nextIndex, $scope.layout.length, widget.nodeId);
            // log change
            $scope.logEvent('keyboardMove',
              widget.fname,
              nextIndex,
              currentIndex);
          }
        }
      };

      /**
       * After a widget is moved, save the new layout using
       * the given information
       * @param dropIndex {Number} Where the widget ended up
       * @param length {Number} Length of the layout array
       * @param nodeId {String} ID of the moved widget
       */
      var saveLayoutOrder = function(dropIndex, length, nodeId) {
        // identify previous and next widgets
        var previousNodeId =
          dropIndex !== 0 ? $scope.layout[dropIndex - 1].nodeId : '';
        var nextNodeId =
          dropIndex !== length - 1 ? $scope.layout[dropIndex + 1].nodeId : '';
        // call layout service to save
        layoutService.moveStuff(dropIndex,
          length, nodeId, previousNodeId, nextNodeId);
      };

      /**
       * Find an array object with the given attribute/value pair
       * @param array {Array} The array to iterate on
       * @param attribute {String} The name of the attribute
       * @param value {String} The value to match on
       * @return {number} Index of the desired item or -1
       */
      var findLayoutIndex = function(array, attribute, value) {
        for (var i = 0; i < array.length; i+= 1) {
          if (array[i][attribute] === value) {
            return i;
          }
        }
        return -1;
      };

      /**
       *
       * @param fname
       */
      $rootScope.addPortletToHome = function(fname) {
        layoutService.addToLayoutByFname(fname).success(function() {
          layoutService.getUncachedLayout().then(function(data) {
            $scope.$apply($scope.layout.unshift(data.layout[0]));
            return true;
          }).catch(function() {
            $log.warn('Could not getLayout while adding to home');
            return false;
          });
        });
      };

      /**
       * Add widget to home layout
       */
      vm.addPortlet = function addPortletFunction(fname) {
        $rootScope.addToLayoutByFname(fname).success(function() {
          $scope.$apply(function() {
            $sessionStorage.layout = $scope.layout;
          });
        }).error(
          function() {
            $sessionStorage.layout = layoutService.getLayout();
          });
      };

      /**
       * Initialize expanded mode widget layout
       */
      function init() {
        if (angular.isUndefined($rootScope.layout) ||
        $rootScope.layout == null) {
          $rootScope.layout = [];
          $scope.layoutEmpty = false;
          // Get user's home layout
          layoutService.getLayout().then(function(data) {
            $rootScope.layout = data.layout;
            $scope.layout = data.layout;
            if (data.layout && data.layout.length == 0) {
              $scope.layoutEmpty = true;
            }
            return data;
          }).catch(function() {
            $log.warn('Could not getLayout');
          });
        }
      }

      init();
  }]);
});

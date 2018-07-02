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

  .controller('RemoveWidgetController', ['$scope', '$filter',
    function($scope, $filter) {
      var vm = this;
      /**
       * Capture information about removed widget, then
       * pass it up the chain to the layout scope in
       * WidgetController
       * @param widget {Object} The widget being removed
       */
      vm.removeWidget = function(widget) {
        // Match layout entry with fname
        var result = $filter('filter')($scope.$parent.layout, widget.fname);
        var index = $scope.$parent.layout.indexOf(result[0]);
        var data = {
          removedIndex: index,
          removedWidget: widget,
        };
        $scope.$emit('REMOVE_WIDGET', data);
      };
  }])

  /**
   * Widget initialization and sorting for expanded mode widget layout
   * (/widget/partials/home-widget-view.html and
   * /widget/partials/widget-card.html)
   */
  .controller('WidgetController',
  ['$controller', '$log', '$scope', '$rootScope', '$mdToast',
    '$sessionStorage', '$filter', '$mdColors', 'layoutService',
    function($controller, $log, $scope, $rootScope, $mdToast,
             $sessionStorage, $filter, $mdColors, layoutService) {
      var vm = this;
      $scope.selectedNodeId = '';
      $scope.widgetsToRemove = [];

      /**
       * Set the selected widget in scope to track focus
       * @param nodeId {string} The id of the selected widget
       */
      $scope.selectNode = function(nodeId) {
        $scope.selectedNodeId = nodeId;
      };

      $scope.guestMode = function() {
        return layoutService.isGuest();
      };

      /**
       * Log whenever a widget is moved
       * @param eventType {String} Kind of interaction that moved the widget
       * @param fname {String} The moved widget's fname
       * @param dropIndex {Number} Index where the widget landed
       * @param startIndex {Number} (optional) Index before moving the widget
       * @return
       */
      $scope.logMoveEvent = function(eventType, fname, dropIndex, startIndex) {
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
       * Move a widget with a drag and drop action
       * @param  {Object} widget    the widget being moved
       * @param  {Number} dropIndex index of the new location
       * @return {Boolean}           true if widget moved, false if otherwise
       */
      $scope.moveWithDrag = function(widget, dropIndex) {
        var sourceIndex =
          findLayoutIndex($scope.layout, 'nodeId', widget.nodeId);
        $log.info('index:'+sourceIndex+' dropIndex:'+dropIndex);
        if (sourceIndex != dropIndex) {
          $scope.layout.splice(sourceIndex, 1);
          if (dropIndex > sourceIndex) {
            dropIndex--;
          }
          $scope.layout.splice(dropIndex, 0, widget);
          saveLayoutOrder(dropIndex, $scope.layout.length, widget.nodeId);
          $scope.logMoveEvent('dragEnd', widget.fname, dropIndex);
          return true;
        } else {
          return false;
        }
      };

      /**
       * Respond to arrow key-presses when focusing a movable list element
       * @param widget {Object} The widget trying to move
       * @param event {Object} The event object
       */
      $scope.moveWithKeyboard = function(widget, event) {
        // Get index independent of ng-repeat to avoid filter bugs
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
            $scope.logMoveEvent( 'keyboardMove',
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
            $scope.logMoveEvent('keyboardMove',
              widget.fname,
              nextIndex,
              currentIndex);
          }
        }
      };

      // Listen for removal event
      $scope.$on('REMOVE_WIDGET',
        /**
         * Listen for widget removal event, then show undo toast
         * if one is not already showing.
         * @param event {Object} The angularjs event object
         * @param data {Object} Data about the widget being removed
         */
        function(event, data) {
          // Remove the widget from layout in scope
          $scope.layout.splice(data.removedIndex, 1);

          // Track the widget fname for removal upon
          // toast timeout
          $scope.widgetsToRemove.push(data.removedWidget.fname);

          // Dismiss any open toasts (success), then show new one
          // eslint-disable-next-line promise/always-return
          $mdToast.hide().then(function() {
            showConfirmationToast(data);
          }).catch(function(error) {
            $log.error(error);
          });
        });

      /**
       * Show toast message allowing user to confirm or undo
       * the removal of a widget from his/her layout.
       * @param data {Object} Information about the removed widget
       */
      var showConfirmationToast = function(data) {
        var accentColor = '';
        if ($sessionStorage.portal.theme) {
          // theme already in session, use accent color from it
          accentColor =
            $mdColors.getThemeColor($sessionStorage.portal.theme.name
              + '-accent');
        } else {
          // theme not yet in session, use accent color from first theme
          accentColor =
            $mdColors.getThemeColor($rootScope.THEMES[0].name
              + '-accent');
        }

        // Configure and show the toast message
        // Pass in widget title for toast text display
        $mdToast.show({
          hideDelay: 4000,
          parent: angular.element(document).find('.wrapper__frame-page')[0],
          position: 'bottom right',
          locals: {
            color: accentColor,
            removedTitle: data.removedWidget.title,
          },
          bindToController: true,
          templateUrl:
            require.toUrl('my-app/layout/partials/toast-widget-removal.html'),
          controller: function RemoveToastController($scope, $mdToast,
                                                     color, removedTitle) {
            $scope.accentColorRgb = color;
            $scope.removedTitle = removedTitle;
            /**
             * Resolve show() promise with 'undo'
             *   Note: a successful timeout or hide() without argument
             *   resolves with undefined)
             */
            $scope.undoRemoveWidget = function() {
              // Hide toast message
              $mdToast.hide('undo');
            };
          },
        })
        // If user clicked undo, do not proceed
        .then(function(response) {
          if (response === 'undo') {
            // Add the removed widget back to the layout
            $scope.layout.splice(data.removedIndex, 0, data.removedWidget);

            // Delete the last fname added to the removal array
            $scope.widgetsToRemove.pop();
          } else {
            // Save deletion of any widgets in the tracking array
            for (var i = 0; i < $scope.widgetsToRemove.length; i++) {
              var fname = $scope.widgetsToRemove[i];
              saveLayoutRemoval(fname);
              // Remove saved deletions from tracking array
              $scope.widgetsToRemove.splice(i, 1);
            }
          }
          return response;
        })
        .catch(function(error) {
          $log.error(error);
        });
      };

      /**
       * Call layout service to save the removal of the widget from the user's
       * home layout.
       * @param fname {String} The fname of the removed widget
       */
      var saveLayoutRemoval = function(fname) {
        // Call layout service to persist change
        layoutService.removeFromHome(fname)
          .success(function() {
            // Clear marketplace flag
            if ($sessionStorage.marketplace != null) {
              // Filter for fname match in marketplace
              var marketplaceEntries = $filter('filter')(
                $sessionStorage.marketplace, fname
              );
              if (marketplaceEntries.length > 0) {
                // Remove the flag
                marketplaceEntries[0].hasInLayout = false;
              }
            }
          })
          .error(function(error) {
            $log.debug('Problem deleting ' + fname
              + 'from home screen. Try again later.');
            $log.debug(error);
          });
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
      vm.init = function() {
        if (angular.isUndefined($rootScope.layout) ||
        $rootScope.layout == null) {
          $rootScope.layout = [];
          $scope.layoutEmpty = false;
        }

        $scope.guestMode = null;

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

        layoutService.getGuestMode().then(function(data) {
          if (angular.isDefined(data) && !data) {
            $scope.guestMode = false;
            return false;
          }
          if (data) {
            $scope.guestMode = true;
            return true;
          }
          return data;
          }).catch(function() {
            $log.warn('could not retrieve guest mode');
          });
      };

      vm.init();
  }]);
});

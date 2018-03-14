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

  /**
   * Controller for the compact mode widget layout
   * (layout/list/partials/home-list-view.html and
   * layout/partials/default-card.html)
   */
  .controller('LayoutController',
    ['$localStorage', '$log', '$sessionStorage',
    '$scope', '$rootScope', 'layoutService',
    function($localStorage, $log, $sessionStorage,
      $scope, $rootScope, layoutService) {
      var vm = this;
      /**
       * Set the href based on whether it's a static, exclusive,
       * or basic widget (based on attributes from entity file)
       * @param portlet
       * @returns {String}
       */
      vm.renderURL = function(portlet) {
        if (portlet.staticContent != null && portlet.altMaxUrl == false) {
          return 'static/' + portlet.fname;
        } else if (portlet.altMaxUrl == false &&
          (portlet.renderOnWeb || $localStorage.webPortletRender)) {
          return 'exclusive/' + portlet.fname;
        } else {
          return portlet.url;
        }
      };

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
       * Configure ui-sortable options
       * @type {{delay: number,
       * cursorAt: {top: number, left: number},
       * stop: $scope.sortableOptions.stop}}
       */
      $scope.sortableOptions = {
        delay: 250,
        cursorAt: {top: 30, left: 30},
        stop: function(e, ui) {
          if (ui.item.sortable.dropindex != ui.item.sortable.index) {
            var node = $scope.layout[ui.item.sortable.dropindex];
            $log.info('Change happened, logging move of ' + node.fname +
            ' from ' + ui.item.sortable.index +
            ' to ' + ui.item.sortable.dropindex);
            // index, length, movingNodeId, previousNodeId, nextNodeId
            var prevNodeId = ui.item.sortable.dropindex != 0 ?
              $scope.layout[ui.item.sortable.dropindex - 1].nodeId : '';
            var nextNodeId = ui.item.sortable.dropindex !=
            $scope.layout.length - 1 ?
              $scope.layout[ui.item.sortable.dropindex + 1].nodeId : '';
            layoutService.moveStuff(ui.item.sortable.dropindex,
              $scope.layout.length, node.nodeId, prevNodeId, nextNodeId);
          }
        },
      };

      /**
       * Initialize LayoutController
       */
      vm.init = function() {
        if (angular.isUndefined($rootScope.layout) ||
        $rootScope.layout == null) {
          $rootScope.layout = [];
          $scope.layoutEmpty = false;

          // Get user's home layout
          layoutService.getLayout().then(function(data) {
            $rootScope.layout = data.layout;
            if (data.layout && data.layout.length == 0) {
              $scope.layoutEmpty = true;
            }
            return data;
          }).catch(function() {
            $log.warn('Could not getLayout');
          });
        }
      };

      vm.init();
    }])

  .controller('RemoveWidgetController', ['$scope', '$filter', 'layoutService',
    '$sessionStorage', function($scope, $filter, layoutService,
                                $sessionStorage) {
      var vm = this;

      /**
       * Remove widget from home layout
       * @param fname
       */
      vm.removePortlet = function removePortletFunction(fname) {
        layoutService.removeFromHome(fname).success(function() {
          // Filter for fname match in layout
          var result = $filter('filter')($scope.$parent.layout, fname);
          var index = $scope.$parent.layout.indexOf(result[0]);

          // Remove from layout
          $scope.$apply($scope.$parent.layout.splice(index, 1));

          // Clear marketplace flag
          if ($sessionStorage.marketplace != null) {
            // Filter for fname match in marketplace
            var marketplaceEntries = $filter('filter')(
              $sessionStorage.marketplace, result[0].fname
            );
            if (marketplaceEntries.length > 0) {
              // Remove the entry flag
              marketplaceEntries[0].hasInLayout = false;
            }
          }
        }).error(
          function(request, text, error) {
            alert('Issue deleting ' + fname +
              ' from your list of favorites, try again later.');
          });
      };
    }])

    /**
   * Basic widget logic leveraged by WidgetController,
   * expanded mode widget layout
   * (/widget/partials/home-widget-view.html and
   * /widget/partials/widget-card.html),
   * and 'widget' component (/widget/directives.js)
   */
  .controller('BaseWidgetFunctionsController',
    ['$scope', '$sessionStorage', '$localStorage',
    'layoutService', 'childController',
    function($scope, $sessionStorage, $localStorage,
      layoutService, childController) {
      /**
       * Determine the type of widget to display
       * @param portlet
       * @returns {*}
       */
      childController.portletType = function portletType(portlet) {
        // If portlet has a defined widgetType,
        // check if it's one we have a defined template for
        if (portlet.widgetType) {
          if ('option-link' === portlet.widgetType) {
            return 'OPTION_LINK';
          } else if ('weather' === portlet.widgetType) {
            return 'WEATHER';
          } else if ('rss' === portlet.widgetType) {
            return 'RSS';
          } else if ('list-of-links' === portlet.widgetType) {
            if (portlet.widgetConfig.links.length === 1 &&
              portlet.altMaxUrl &&
              portlet.widgetConfig.links[0].href === portlet.url) {
              // If list of links has only one link and
              // if it is the same as the portlet URL,
              // display the default widget view
              return 'BASIC';
            } else {
              return 'LOL';
            }
          } else if ('search-with-links' === portlet.widgetType) {
            return 'SWL';
          } else if ('generic' === portlet.widgetType) {
            // DEPRECATED: Include 'generic' for the
            // sake of backwards compatibility,
            // but return what it really is: CUSTOM
            return 'CUSTOM';
          } else if ('custom' === portlet.widgetType) {
            return 'CUSTOM';
          } else {
            return 'WIDGET';
          }
        } else {
          // Return "BASIC" widget type for anything
          // else lacking an explicit widget
          // type definition (default experience)
          return 'BASIC';
        }
      };

      /**
       * Sets href attribute for 'BASIC' type widget
       * @param portlet
       * @returns {*}
       */
      childController.renderURL = function renderURL(portlet) {
        // Check if it's a static or exclusive portlet
        if (portlet.staticContent != null && portlet.altMaxUrl == false) {
          return 'static/' + portlet.fname;
        } else if (portlet.altMaxUrl == false && (portlet.renderOnWeb ||
          $localStorage.webPortletRender)) {
          return 'exclusive/' + portlet.fname;
        } else {
          return portlet.url;
        }
      };
    },
  ])

  /**
   * Widget initialization and sorting for expanded mode widget layout
   * (/widget/partials/home-widget-view.html and
   * /widget/partials/widget-card.html)
   */
  .controller('WidgetController',
  ['$controller', '$log', '$scope', '$rootScope', 'layoutService',
    function($controller, $log, $scope, $rootScope, layoutService) {
      var vm = this;
      // Inherit from BaseWidgetFunctionsController
      $controller('BaseWidgetFunctionsController',
      {$scope: $scope, childController: vm});
      /**
       *
       * @param eventType
       * @param fname
       * @param dropIndex
       * @param startIndex (optional)
       * @returns {boolean}
       */
      $scope.logEvent = function(eventType, fname, dropIndex, startIndex) {
        switch(eventType) {
          case 'dragEnd':
            $log.info('Dragged ' + fname + ' to index ' + dropIndex);
            break;
          case 'keyboardMove':
            $log.info('Moved ' + fname + 'from index ' + startIndex +
              ' to index ' + dropIndex);
            break;
          default:
            return true;
        }
      };

      /**
       *
       * @param widget
       * @param event
       * @returns {boolean}
       */
      $scope.moveWithKeyboard = function(widget, event) {
        // get index independent of ng-repeat to avoid filter bugs
        var currentIndex = findLayoutIndex($scope.layout, 'nodeId', widget.nodeId);
        var previousIndex = currentIndex - 1;
        var nextIndex = currentIndex + 1;

        // left or up
        if(event.which === 37 || event.which === 38) {
          console.log('trying to move ' + widget.title + ' left or up');
          // if currentIndex is already 0, do nothing
          if (currentIndex === 0) {
            return true;
          } else {
            // remove item from the list
            $scope.layout.splice(currentIndex, 1);
            // reinsert at new index
            $scope.layout.splice(previousIndex, 0, widget);
            // refocus moved widget
            document.getElementById('node-' + widget.nodeId).focus();
            // save new layout order
            saveLayoutOrder(previousIndex, $scope.layout.length, widget.nodeId);
            // log change
            $scope.logEvent( 'keyboardMove', widget.fname, previousIndex, currentIndex);
          }
        }
        // right or down
        if(event.which === 39 || event.which === 40) {
          console.log('trying to move ' + widget.title + ' right or down');
          // if currentIndex is end of the list, do nothing
          if (currentIndex !== $scope.layout.length - 1) {
            // remove item from the list
            $scope.layout.splice(currentIndex, 1);
            console.log($scope.layout);
            // reinsert at desired index
            $scope.layout.splice(nextIndex, 0, widget);
            console.log($scope.layout);
            // save new layout order
            saveLayoutOrder(nextIndex, $scope.layout.length, widget.nodeId);
            // log change
            $scope.logEvent('keyboardMove', widget.fname, nextIndex, currentIndex);
          }
        }
      };

      /**
       *
       * @param dropIndex
       * @param length
       * @param nodeId
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
       *
       * @param array
       * @param attribute
       * @param value
       * @returns {number}
       */
      var findLayoutIndex = function(array, attribute, value) {
        for(var i = 0; i < array.length; i+= 1) {
          if (array[i][attribute] === value) {
            return i
          }
        }
        return -1;
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
            console.log($scope.layout);
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

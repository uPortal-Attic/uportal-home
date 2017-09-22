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

      /**
       * Remove widget from home layout
       * @param fname
       */
      vm.removePortlet = function removePortletFunction(fname) {
        layoutService.removeFromHome(fname).success(function() {
          $scope.$apply(function(request, text) {
            var result = $.grep($scope.layout, function(e) {
              return e.fname === fname;
            });
            var index = $.inArray(result[0], $scope.layout);
            // remove
            $scope.layout.splice(index, 1);
            if ($sessionStorage.marketplace != null) {
              var marketplaceEntries = $.grep($sessionStorage.marketplace,
                function(e) {
                return e.fname === result[0].fname;
              });
              if (marketplaceEntries.length > 0) {
                marketplaceEntries[0].hasInLayout = false;
              }
            }
          });
        }).error(
          function(request, text, error) {
            alert('Issue deleting ' + fname +
            ' from your list of favorites, try again later.');
          });
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

  .controller('RemoveWidgetController', ['$scope', 'layoutService',
    '$sessionStorage', function($scope, layoutService,
      $sessionStorage) {
        var vm = this;
        /**
         * Remove widget from home layout
         * @param fname
         */
        vm.removePortlet = function removePortletFunction(fname) {
          layoutService.removeFromHome(fname).success(function() {
            $scope.$apply(function(request, text) {
              var result = $.grep($scope.$parent.layout, function(e) {
                return e.fname === fname;
              });
              var index = $.inArray(result[0], $scope.$parent.layout);
              // remove
              $scope.$parent.layout.splice(index, 1);
              if ($sessionStorage.marketplace != null) {
                var marketplaceEntries = $.grep($sessionStorage.marketplace,
                  function(e) {
                    return e.fname === result[0].fname;
                  });
                if (marketplaceEntries.length > 0) {
                  marketplaceEntries[0].hasInLayout = false;
                }
              }
            });
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

      /**
       * Remove widget from home layout
       * @param fname
       */
      childController.removePortlet =
      function removePortletFunction(fname) {
        layoutService.removeFromHome(fname).success(function() {
          $scope.$apply(function(request, text) {
            var result = $.grep($scope.layout, function(e) {
              return e.fname === fname;
            });
            var index = $.inArray(result[0], $scope.layout);
            // remove
            $scope.layout.splice(index, 1);
            if ($sessionStorage.marketplace != null) {
              var marketplaceEntries = $.grep($sessionStorage.marketplace,
                function(e) {
                return e.fname === result[0].fname;
              });
              if (marketplaceEntries.length > 0) {
                marketplaceEntries[0].hasInLayout = false;
              }
            }
          });
        }).error(function(request, text, error) {
          alert('Issue deleting ' + fname +
          ' from your list of favorites, try again later.');
        });
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
            if (data.layout && data.layout.length == 0) {
              $scope.layoutEmpty = true;
            }
            return data;
          }).catch(function() {
            $log.warn('Could not getLayout');
          });
        }
      }

      /**
       * Configure ui-sortable options
       * @type {{
       * delay: number,
       * cursorAt: {top: number, left: number},
       * stop: $scope.sortableOptions.stop
       * }}
       */
      $scope.sortableOptions = {
        delay: 250,
        cursorAt: {top: 30, left: 30},
        stop: function(e, ui) {
          if (ui.item.sortable.dropindex != ui.item.sortable.index) {
            var node = $scope.layout[ui.item.sortable.dropindex];
            $log.log('Change happened, logging move of ' + node.fname +
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
      init();
  }])

  /**
   * Controller for toggling between expanded
   * and compact mode via the app-header's toggle
   */
  .controller('ToggleController',
  ['$localStorage', '$scope', '$location', '$log', 'miscService', 'APP_FLAGS',
    function($localStorage, $scope, $location, $log, miscService, APP_FLAGS) {
      var vm = this;
      /**
       * Switch between compact and expanded mode
       * @param mode
       */
      $scope.switchMode = function(mode) {
        $localStorage.layoutMode = mode;
        $location.path('/' + mode);
        miscService.pushGAEvent('Widgets', 'View', mode);
      };

      /**
       * Respond to toggle click events
       * @param expandedMode
       */
      $scope.toggleMode = function(expandedMode) {
        $scope.expandedMode = expandedMode;
        var mode = expandedMode ? 'expanded' : 'compact';
        $scope.switchMode(mode);
      };

      /**
       * Get user's last-used layout mode and initialize view
       */
      vm.init = function() {
        $scope.toggle = APP_FLAGS.enableToggle;
        $scope.$storage = localStorage;

        if ($localStorage.layoutMode) {
          // Determine whether the layout is expanded or compact mode
          $scope.expandedMode = $localStorage.layoutMode === 'expanded';
          // Ensure we're at the correct mode & url
          if ($location.url().indexOf($localStorage.layoutMode) == -1) {
            // Oops, we are in the wrong mode, switch!
            // Check to make sure that mode is active
            if (APP_FLAGS[$localStorage.layoutMode]) {
              $location.path('/' + $localStorage.layoutMode);
            } else {
              $log.log('Something is weird, resetting to default layout view');
              $scope.switchMode(APP_FLAGS.defaultView);
            }
          }
        }
      };

      vm.init();
  }]);
});

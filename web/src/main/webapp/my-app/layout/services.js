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
  var accessDeniedTemplate=
    '<p><strong>Sorry, you\'re not authorized to access this.</p><br><br>' +
    '<div class="center">' +
    '<i class=\'fa fa-exclamation-triangle fa-5x\'></i></div>' +
    '<p>If you\'re here by accident, head back to your My-UW ' +
    '<a href=\'/web\'>homepage</a>.</p>' +
    '<p>For help with authorization, contact the ' +
    '<a href="https://kb.wisc.edu/helpdesk">DoIT Help Desk</a>.</p>';

  return angular.module('my-app.layout.services', [])
    .factory('layoutService',
      ['$sce', '$http', '$log', 'miscService',
      'mainService', '$sessionStorage', '$q', 'SERVICE_LOC', 'APP_FLAGS',
      function($sce, $http, $log, miscService,
        mainService, $sessionStorage, $q, SERVICE_LOC, APP_FLAGS) {

        /************************
        * NEW LAYOUT
        * To use new service layout set useNewLayout flag in override.js to true,
        * and useOldLayout to false
        ************************/

        if (APP_FLAGS.useNewLayout) {
          console.log("using new layout");

          var getLayout = function() {
            return checkLayoutCache().then(function(data) {
              var successFn;
              var errorFn;
              var defer;

              // first, check the local storage...
              if (data) {
                defer = $q.defer();
                defer.resolve(data);
                return defer.promise;
              }

              successFn = function(result) {
                var data = formatLayoutForCache(result.data);
                storeLayoutInCache(data);
                return data;
              };

              errorFn = function(reason) {
                miscService.redirectUser(reason.status, 'layout call');
              };
            return $http.get(
                SERVICE_LOC.newLayout)
                  .then(successFn, errorFn);
            });
          };

          var addToHome = function addToHomeFunction(portlet) {
            var fname = portlet.fname;
            return getLayout().then(function(data) {
              var newLayout = data.layout.concat(fname);
              return $http({
                method: 'POST',
                url: SERVICE_LOC.newLayout,
                data: {"layout" : newLayout, "new" : false},
                dataType: 'json'
              });
            })
          };

          var removeFromHome = function removeFromHomeFunction(fname) {
            return getLayout().then(function(data) {
              var newLayout = data.layout.filter(function(val){
                return val !== fname;
              });
              return $http({
                  method: 'POST',
                  url: SERVICE_LOC.newLayout,
                  data: {"layout" : newLayout, "new" : false},
                  dataType: 'json'
              });
            })
          };

          var moveStuff = function moveStuffFunction() {
            return getLayout().then(function(data) {
              var newLayout = data.layout;
              console.log("newLayout", newLayout);
                return $http({
                  method: 'POST',
                  url: SERVICE_LOC.newLayout,
                  data: {"layout" : newLayout, "new" : false},
                  dataType: 'json'
              });
            });

          };
        }

        /************************
        ** OLD LAYOUT
        ** To use old service layout set useOldLayout flag in override.js to true,
        ** and useNewLayout to false
        *************************/

        if (APP_FLAGS.useOldLayout) {
          console.log("using old layout");

          var getLayout = function() {
            return checkLayoutCache().then(function(data) {
                var successFn;
                var errorFn;
                var defer;

                // first, check the local storage...
                if (data) {
                    defer = $q.defer();
                    defer.resolve(data);
                    return defer.promise;
                }

                successFn = function(result) {
                    var data = formatLayoutForCache(result.data);
                    storeLayoutInCache(data);
                    return data;
                };

                errorFn = function(reason) {
                    miscService.redirectUser(reason.status, 'layout call');
                };

                // no caching...  request from the server
                return $http.get(
                  SERVICE_LOC.context + SERVICE_LOC.layout, {cache: true} )
                    .then(successFn, errorFn);
            });
          };

          var addToHome = function addToHomeFunction(portlet) {
              var fname = portlet.fname;
              var tabName = SERVICE_LOC.layoutTab;
              return $.ajax({
                  url: SERVICE_LOC.base + 'layout?action=addPortlet&fname=' +
                    fname + '&tabName=' + tabName,
                  type: 'POST',
                  data: null,
                  dataType: 'json',
                  async: true,
                  success: function(request, text) {
                      $log.log('Added ' + portlet.fname + ' successfully');
                      miscService.pushGAEvent(
                        'Layout Modification', 'Add', portlet.name);
                      return true;
                  },
                  error: function(request, text, error) {
                      $log.warn('failed to add app to home.');
                      return false;
                  },
              });
          };

          var removeFromHome = function removeFromHomeFunction(fname) {
              return $.ajax({
                  url: SERVICE_LOC.base +
                    'layout?action=removeByFName&fname=' + fname,
                  type: 'POST',
                  data: null,
                  dataType: 'json',
                  async: true,
                  success: function(request, text) {
                      $log.log('removed ' + fname + ' successfully.');
                      miscService.pushGAEvent(
                        'Layout Modification', 'Remove', fname);
                  },
                  error: function(request, text, error) {
                  },
              });
          };

          var moveStuff = function moveStuffFunction(
                index, length, sourceId, previousNodeId, nextNodeId) {
            var insertNode = function(sourceId, previousNodeId, nextNodeId) {
              var saveOrderURL = SERVICE_LOC.base +
                  'layout?action=movePortletAjax' +
                  '&sourceId=' + sourceId +
                  '&previousNodeId=' + previousNodeId +
                  '&nextNodeId=' + nextNodeId;
              $log.log(saveOrderURL);
              $.ajax({
                  url: saveOrderURL,
                  type: 'POST',
                  data: null,
                  dataType: 'json',
                  async: true,
                  success: function() {
                    $log.log('layout move successful.');
                  },
                  error: function(request, text, error) {
                    $log.error('Error persisting move ' + saveOrderURL);
                  },
              });
            };

            insertNode(sourceId, previousNodeId, nextNodeId);
          };
        }

        var getUncachedLayout = function() {
          console.log("in getUncachedLayout");
          var successFn = function(result) {
              var data = formatLayoutForCache(result.data);
              storeLayoutInCache(data);
              return data;
          };

          var errorFn = function(reason) {
              miscService.redirectUser(reason.status, 'layout call');
          };

          // no caching...  request from the server
          return $http.get(SERVICE_LOC.context + SERVICE_LOC.layout,
            {cache: true} )
              .then(successFn, errorFn);
        };

        var addToLayoutByFname = function addToLayoutByFname(fname) {
          var tabName = SERVICE_LOC.layoutTab;
          return $.ajax({
              url: SERVICE_LOC.base + 'layout?action=addPortlet&fname=' +
                fname + '&tabName=' + tabName,
              type: 'POST',
              data: null,
              dataType: 'json',
              async: true,
              success: function() {
                  $log.log('Added ' + fname + ' successfully');
                  miscService.pushGAEvent(
                    'Layout Modification', 'Add', fname);
                  },
              error: function() {
                  $log.warn('failed to add app to home.');
                  return false;
              },
          });
        };

        var checkLayoutCache = function() {
            var userPromise = mainService.getUser();
            return userPromise.then(function(user) {
                if ($sessionStorage.sessionKey === user.sessionKey &&
                    $sessionStorage.layout) {
                  return $sessionStorage.layout;
                }

                return null;
            });
        };

        var storeLayoutInCache = function(data) {
            var userPromise = mainService.getUser();
            userPromise.then(function(user) {
                $sessionStorage.sessionKey = user.sessionKey;
                $sessionStorage.layout = data;
                return user;
            }).catch(function() {
              $log.warn('Could not getUser');
            });
        };

        var formatLayoutForCache = function(data) {
          var result = {
            'layout': [],
          };
          // layout will map to an array of objects each with an fname field.
          // those fnames represent, in order,
          // the home page content for the user
          if ($.isPlainObject(data.layout) &&
              $.isArray(data.layout.folders)) { // layout.json v1
            var folders = data.layout.folders.filter(function(el) {
              var result = false;
              if (el && SERVICE_LOC.layoutTab === el.title) {
                result = true;
              }
              return result;
            });
            if (folders && 0 < folders.length) {
              result.layout = folders[0].portlets;
            }
          } else if ( data.layout.navigation &&
              $.isPlainObject(data.layout.navigation) &&
              $.isArray(data.layout.navigation.tabs)) { // v4-3
            // var tabs will be tabs matching the layoutTab name
            // expected to be an array with length 1
            var tabs = data.layout.navigation.tabs.filter(function(el) {
              var result = false;
              if (el && SERVICE_LOC.layoutTab === el.name) {
                result = true;
              }
              return result;
            });
            if (tabs && 0 < tabs.length) {
              var columns = tabs[0].content;
              var portlets = [];
              if ($.isArray(columns)) {
                columns.forEach( function(column) {
                  portlets = portlets.concat(column.content);
                });
              }
              result.layout = portlets;
            }
          } else if ($.isArray(data.layout)) { // layoutDoc
            result.layout = data.layout;
          }

          return result;
        };

        var getApp = function(fname) {
            return $http.get(SERVICE_LOC.base + 'portlet/' +fname + '.json',
              {cache: true})
              .then(
                function(result) {
                    return result;
                },
                function(reason) {
                    miscService.redirectUser(reason.status, 'getApp call');
                    if (reason.status === 403) {
                      reason.deniedTemplate =
                        $sce.trustAsHtml(accessDeniedTemplate);
                    }
                    return reason;
                }
            );
        };

        var getNewStuffFeed = function() {
          return $http.get(SERVICE_LOC.newstuffInfo, {cache: true})
              .then(function(result) {
                  return result.data.stuff;
                },
                function(reason) {
                  miscService.redirectUser(reason.status,
                    'new stuff json feed call');
                }
              );
        };

        var getWidgetJson = function(portlet) {
          return $http.get(portlet.widgetURL, {cache: true})
              .then(function(result) {
                  var data = result.data;
                  if (data) {
                    if (data.result) {
                      portlet.widgetData = data.result;
                    }
                    if (data.content) {
                      portlet.widgetContent = data.content;
                    }
                    $log.log(portlet.fname +
                      '\'s widget data came back with data');
                  }
                  return data;
                },
                function(reason) {
                    miscService.redirectUser(reason.status,
                      'widget json for ' + portlet.fname + ' failed.');
                }
              );
        };


        var getExclusiveMarkup = function(portlet) {
          return $http.get(SERVICE_LOC.context +
              '/p/' + portlet.fname + '/exclusive/render.uP', {cache: true})
              .then(function(result) {
                  var data = result.data;
                  if (data) {
                    portlet.exclusiveContent = $sce.trustAsHtml(data);
                    $log.log(portlet.fname +
                      '\'s exclusive data came back with data');
                  } else {
                    portlet.exclusiveContent =
                        '<div class="alert alert-danger" role="alert">' +
                        'This service is unavailable right now. ' +
                        'Please check back later.</div>';
                  }

                  return data;
                },
                function(reason) {
                  if (reason.status===403) {
                    portlet.exclusiveContent =
                      $sce.trustAsHtml(accessDeniedTemplate);
                  } else {
                    miscService.redirectUser(reason.status,
                      'exclusive markup for ' + portlet.fname + ' failed.');
                  }
                }
              );
        };

        var getGuestMode = function() {
          return mainService.isGuest();
        };

          var getRSSJsonified = function(feedURL) {
            // This is a hack.
            // It would be maybe healthier to enhance RSS widget to
            // support
            // 1. configure explicitly with URL that generates the JSON
            // 2. configure with pithy key to feed ( campus_news )
            // 3. configure explicitly with RSS URL and automatically
            //    run that through an RSS to JSON converter.
            // Whereas this hack repurposes existing configuration for (3)
            // to do (1).
          return $http.get(feedURL, {cache: true});
        };

        return {
            getLayout: getLayout,
            getUncachedLayout: getUncachedLayout,
            formatLayoutForCache: formatLayoutForCache,
            getApp: getApp,
            moveStuff: moveStuff,
            getNewStuffFeed: getNewStuffFeed,
            addToHome: addToHome,
            addToLayoutByFname: addToLayoutByFname,
            removeFromHome: removeFromHome,
            getWidgetJson: getWidgetJson,
            getExclusiveMarkup: getExclusiveMarkup,
            getGuestMode: getGuestMode,
            getRSSJsonified: getRSSJsonified,
        };
    }]);
});

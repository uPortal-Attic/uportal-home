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
      'mainService', '$sessionStorage', '$q', 'SERVICE_LOC',
      function($sce, $http, $log, miscService,
        mainService, $sessionStorage, $q, SERVICE_LOC) {
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

        var removeFromHome = function removeFromHomeFunction(nodeId, title) {
            return $.ajax({
                url: SERVICE_LOC.base +
                  'layout?action=removeElement&elementID=' + nodeId,
                type: 'POST',
                data: null,
                dataType: 'json',
                async: true,
                success: function(request, text) {
                    $log.log('removed ' + title + ' successfully.');
                    miscService.pushGAEvent(
                      'Layout Modification', 'Remove', title);
                },
                error: function(request, text, error) {
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
          if ($.isPlainObject(data.layout) &&
              $.isArray(data.layout.folders)) { // layout.json
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
          } else if ($.isArray(data.layout)) { // layoutDoc
            result.layout = data.layout;
          }
          return result;
        };

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
                return $http.get(SERVICE_LOC.context + SERVICE_LOC.layout)
                    .then(successFn, errorFn);
            });
        };

        var getApp = function(fname) {
            return $http.get(SERVICE_LOC.base + 'portlet/' +fname + '.json')
              .then(
                function(result) {
                    return result;
                },
                function(reason) {
                    miscService.redirectUser(reason.status, 'getApp call');
                    if(reason.status === 403) {
                      reason.deniedTemplate =
                        $sce.trustAsHtml(accessDeniedTemplate);
                    }
                    return reason;
                }
            );
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
                  if(data) {
                    if(data.result) {
                      portlet.widgetData = data.result;
                    }
                    if(data.content) {
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
                  if(data) {
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
          return $http.get(feedURL);
        };

        return {
            getLayout: getLayout,
            getApp: getApp,
            moveStuff: moveStuff,
            getNewStuffFeed: getNewStuffFeed,
            addToHome: addToHome,
            removeFromHome: removeFromHome,
            getWidgetJson: getWidgetJson,
            getExclusiveMarkup: getExclusiveMarkup,
            getRSSJsonified: getRSSJsonified,
        };
    }]);
});

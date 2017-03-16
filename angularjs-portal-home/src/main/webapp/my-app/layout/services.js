'use strict';

define(['angular', 'jquery'], function(angular, $) {
    let app = angular.module('my-app.layout.services', []);
    let accessDeniedTemplate='<p><strong>Sorry, you\'re not authorized to access this.</p>    <br><br>    <div class="center"><i class=\'fa fa-exclamation-triangle fa-5x\'></i></div>    <p>If you\'re here by accident, head back to your My-UW <a href=\'/web\'>homepage</a>.</p>    <p>For help with authorization, contact the <a href="https://kb.wisc.edu/helpdesk">DoIT Help Desk</a>.</p>';

    app.factory('sharedPortletService', function() {
        let property = {};

        return {
            getProperty: function() {
                return property;
            },
            setProperty: function(value) {
                property = value;
            },
        };
    });

    app.factory('layoutService', ['$sce', '$http', 'miscService', 'mainService', '$sessionStorage', '$q', 'SERVICE_LOC', function($sce, $http, miscService, mainService, $sessionStorage, $q, SERVICE_LOC) {
        let addToHome = function addToHomeFunction(portlet) {
            let fname = portlet.fname;
            let tabName = SERVICE_LOC.layoutTab;
            return $.ajax({
                url: SERVICE_LOC.base + 'layout?action=addPortlet&fname=' + fname + '&tabName=' + tabName,
                type: 'POST',
                data: null,
                dataType: 'json',
                async: true,
                success: function(request, text) {
                    console.log('Added ' + portlet.fname + ' successfully');
                    miscService.pushGAEvent('Layout Modification', 'Add', portlet.name);
                    return true;
                },
                error: function(request, text, error) {
                    console.warn('failed to add app to home.');
                    return false;
                },
            });
        };

        let removeFromHome = function removeFromHomeFunction(nodeId, title) {
            return $.ajax({
                url: SERVICE_LOC.base + 'layout?action=removeElement&elementID=' + nodeId,
                type: 'POST',
                data: null,
                dataType: 'json',
                async: true,
                success: function(request, text) {
                    console.log('removed ' + title + ' successfully.');
                    miscService.pushGAEvent('Layout Modification', 'Remove', title);
                },
                error: function(request, text, error) {
                },
            });
        };

        let checkLayoutCache = function() {
            let userPromise = mainService.getUser();
            return userPromise.then(function(user) {
                if ($sessionStorage.sessionKey === user.sessionKey && $sessionStorage.layout) {
                    return $sessionStorage.layout;
                }

                return null;
            });
        };

        let storeLayoutInCache = function(data) {
            let userPromise = mainService.getUser();
            userPromise.then(function(user) {
                $sessionStorage.sessionKey = user.sessionKey;
                $sessionStorage.layout = data;
            });
        };


        let getLayout = function() {
            return checkLayoutCache().then(function(data) {
                let successFn, errorFn, defer;

                // first, check the local storage...
                if (data) {
                    defer = $q.defer();
                    defer.resolve(data);
                    return defer.promise;
                }

                successFn = function(result) {
                    let data = result.data;
                    storeLayoutInCache(data);
                    return data;
                };

                errorFn = function(reason) {
                    miscService.redirectUser(reason.status, 'layoutDoc call');
                };

                // no caching...  request from the server
                return $http.get(SERVICE_LOC.base + SERVICE_LOC.layout).then(successFn, errorFn);
            });
        };

        let getApp = function(fname) {
            return $http.get(SERVICE_LOC.base + 'portlet/' +fname + '.json').then(
                function(result) {
                    return result;
                },
                function(reason) {
                    miscService.redirectUser(reason.status, 'getApp call');
                    if(reason.status === 403) {
                      reason.deniedTemplate = $sce.trustAsHtml(accessDeniedTemplate);
                    }
                    return reason;
                }
            );
        };
        let moveStuff = function moveStuffFunction(index, length, sourceId, previousNodeId, nextNodeId) {
            let insertNode = function(sourceId, previousNodeId, nextNodeId) {
                let saveOrderURL = SERVICE_LOC.base + 'layout?action=movePortletAjax'
                    + '&sourceId=' + sourceId
                    + '&previousNodeId=' + previousNodeId
                    + '&nextNodeId=' + nextNodeId;
                console.log(saveOrderURL);
                $.ajax({
                    url: saveOrderURL,
                    type: 'POST',
                    data: null,
                    dataType: 'json',
                    async: true,
                    success: function() {
                        console.log('layout move successful.');
                    },
                    error: function(request, text, error) {
                        console.error('Error persisting move ' + saveOrderURL);
                    },
                });
            };

            insertNode(sourceId, previousNodeId, nextNodeId);
        };

        let getNewStuffFeed = function() {
            return $http.get(SERVICE_LOC.newstuffInfo, {cache: true}).then(
                function(result) {
                    return result.data.stuff;
                },
                function(reason) {
                    miscService.redirectUser(reason.status, 'new stuff json feed call');
                }
            );
        };

        let getWidgetJson = function(portlet) {
            return $http.get(portlet.widgetURL, {cache: true}).then(
                function(result) {
                    let data = result.data;
                    if(data) {
                        if(data.result) {
                            portlet.widgetData = data.result;
                        }
                        if(data.content) {
                            portlet.widgetContent = data.content;
                        }
                        console.log(portlet.fname + '\'s widget data came back with data');
                    }
                    return data;
                },
                function(reason) {
                    miscService.redirectUser(reason.status, 'widget json for ' + portlet.fname + ' failed.');
                }
            );
        };


        let getExclusiveMarkup = function(portlet) {
            return $http.get(SERVICE_LOC.context + '/p/' + portlet.fname + '/exclusive/render.uP', {cache: true}).then(
                    function(result) {
                        let data = result.data;
                        if(data) {
                            portlet.exclusiveContent = $sce.trustAsHtml(data);
                            console.log(portlet.fname + '\'s exclusive data came back with data');
                        }else{
                            portlet.exclusiveContent='<div class="alert alert-danger" role="alert">This service is unavailable right now. Please check back later.</div>';
                        }

                        return data;
                    },
                    function(reason) {
                        if(reason.status===403) {
                            portlet.exclusiveContent=$sce.trustAsHtml(accessDeniedTemplate);
                        }else{
                           miscService.redirectUser(reason.status, 'exclusive markup for ' + portlet.fname + ' failed.');
                       }
                    }
                );
        };

          let getRSSJsonified = function(feedURL) {
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

    return app;
});

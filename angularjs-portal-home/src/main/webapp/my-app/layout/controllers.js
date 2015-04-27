'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.layout.controllers', []);

    app.controller('LayoutController', [
        '$location',
        '$localStorage',
        '$sessionStorage',
        '$scope',
        '$rootScope',
        'layoutService',
        'miscService',
        'sharedPortletService',
        function($location,
                 $localStorage,
                 $sessionStorage,
                 $scope,
                 $rootScope,
                 layoutService,
                 miscService,
                 sharedPortletService) {
            if(typeof $rootScope.layout === 'undefined' || $rootScope.layout == null) {

                $rootScope.layout = [];
                $scope.layoutEmpty = false;

                layoutService.getLayout().then(function(data){
                    $rootScope.layout = data.layout;
                    if(data.layout && data.layout.length == 0) {
                        $scope.layoutEmpty = true;
                    }
                });
            }

            this.portletType = function portletType(portlet) {
                if (portlet.staticContent != null
                    && portlet.altMaxUrl == false) {
                    return "SIMPLE";
                } else {
                    return "NORMAL";
                }
            };

            this.maxStaticPortlet = function gotoMaxStaticPortlet(portlet) {
                sharedPortletService.setProperty(portlet);
                $location.path('/static/'+portlet.fname);
            };

            this.directToPortlet = function directToPortlet(url) {
                $location.path(url);
            };
            this.removePortlet = function removePortletFunction(nodeId, title) {
                layoutService.removeFromHome(nodeId, title).success(function(){
                    $scope.$apply(function(request, text){
                        var result = $.grep($scope.layout, function(e) { return e.nodeId === nodeId});
                        var index = $.inArray(result[0], $scope.layout);
                        //remove
                        $scope.layout.splice(index,1);
                        if($sessionStorage.marketplace != null) {
                            var marketplaceEntries = $.grep($sessionStorage.marketplace, function(e) { return e.fname === result[0].fname});
                            if(marketplaceEntries.length > 0) {
                                marketplaceEntries[0].hasInLayout = false;
                            }
                        }
                    });
                }).error( 
                function(request, text, error){
                    alert('Issue deleting ' + title + ' from your list of favorites, try again later.');
                });
            };

            $scope.sortableOptions = {
                delay:250,
                cursorAt : {top: 30, left: 30},
                stop: function(e, ui) {
                    if(ui.item.sortable.dropindex != ui.item.sortable.index) {

                        var node = $scope.layout[ui.item.sortable.dropindex];
                        console.log("Change happened, logging move of " + node.fname + " from " + ui.item.sortable.index + " to " + ui.item.sortable.dropindex);
                        //index, length, movingNodeId, previousNodeId, nextNodeId
                        var prevNodeId = ui.item.sortable.dropindex != 0 ? $scope.layout[ui.item.sortable.dropindex - 1].nodeId : "";
                        var nextNodeId = ui.item.sortable.dropindex != $scope.layout.length - 1 ? $scope.layout[ui.item.sortable.dropindex + 1].nodeId : "";
                        layoutService.moveStuff(ui.item.sortable.dropindex, $scope.layout.length, node.nodeId, prevNodeId, nextNodeId);

                    }
                }
            };

        }]);


    app.controller('WidgetController', [
        '$location',
        '$localStorage',
        '$sessionStorage',
        '$scope',
        '$rootScope',
        'layoutService',
        'miscService',
        'sharedPortletService',
        function($location,
                 $localStorage,
                 $sessionStorage,
                 $scope,
                 $rootScope,
                 layoutService,
                 miscService,
                 sharedPortletService) {
            if(typeof $rootScope.layout === 'undefined' || $rootScope.layout == null) {

                $rootScope.layout = [];

                layoutService.getLayout().then(function(data){
                    $rootScope.layout = data.layout;
                });
            }

            this.portletType = function portletType(portlet) {
                if (portlet.widgetType) {
                    if('option-link' === portlet.widgetType) {
                        return "OPTION_LINK";
                    } else if('weather' === portlet.widgetType) {
                        return "WEATHER";
                    } else if('generic' === portlet.widgetType) {
                        return "GENERIC";
                    } else {
                        return "WIDGET";
                    }

                }else if(portlet.pithyStaticContent != null) {
                    return "PITHY";
                } else if (portlet.staticContent != null
                    && portlet.altMaxUrl == false) {
                    return "SIMPLE";
                } else {
                    return "NORMAL";
                }
            };

            this.maxStaticPortlet = function gotoMaxStaticPortlet(portlet) {
                sharedPortletService.setProperty(portlet);
                $location.path('/static/'+portlet.fname);
            };

            this.directToPortlet = function directToPortlet(url) {
                $location.path(url);
            };
            this.removePortlet = function removePortletFunction(nodeId, title) {
                layoutService.removeFromHome(nodeId, title).success(function(){
                    $scope.$apply(function(request, text){
                        var result = $.grep($scope.layout, function(e) { return e.nodeId === nodeId});
                        var index = $.inArray(result[0], $scope.layout);
                        //remove
                        $scope.layout.splice(index,1);
                        if($sessionStorage.marketplace != null) {
                            var marketplaceEntries = $.grep($sessionStorage.marketplace, function(e) { return e.fname === result[0].fname});
                            if(marketplaceEntries.length > 0) {
                                marketplaceEntries[0].hasInLayout = false;
                            }
                        }
                    });
                }).error( 
                function(request, text, error){
                    alert('Issue deleting ' + title + ' from your list of favorites, try again later.');
                });
            };

            $scope.sortableOptions = {
                delay:250,
                cursorAt : {top: 30, left: 30},
                stop: function(e, ui) {
                    if(ui.item.sortable.dropindex != ui.item.sortable.index) {

                        var node = $scope.layout[ui.item.sortable.dropindex];
                        console.log("Change happened, logging move of " + node.fname + " from " + ui.item.sortable.index + " to " + ui.item.sortable.dropindex);
                        //index, length, movingNodeId, previousNodeId, nextNodeId
                        var prevNodeId = ui.item.sortable.dropindex != 0 ? $scope.layout[ui.item.sortable.dropindex - 1].nodeId : "";
                        var nextNodeId = ui.item.sortable.dropindex != $scope.layout.length - 1 ? $scope.layout[ui.item.sortable.dropindex + 1].nodeId : "";
                        layoutService.moveStuff(ui.item.sortable.dropindex, $scope.layout.length, node.nodeId, prevNodeId, nextNodeId);

                    }
                }
            };

        }]);

    app.controller('NewStuffController', ['$scope', 'layoutService', function ($scope, layoutService){
        $scope.newStuffArray = [];
        layoutService.getNewStuffFeed().then(function(result){
            $scope.newStuffArray = result;
        });

        this.show = function(stuff) {
            var date = new Date(stuff.expireYr, stuff.expireMon, stuff.expireDay);
            var today = new Date();
            return date >= today;
        }
    }]);

    app.controller('ToggleController',[
        '$localStorage',
        '$scope',
        '$location',
        'miscService',
        'APP_FLAGS', function($localStorage,
                              $scope,
                              $location,
                              miscService,
                              APP_FLAGS){
            //scope functions
            $scope.switchMode = function(mode) {
                $localStorage.layoutMode = mode;
                $location.path('/' + mode);
            };

            $scope.modeIs = function(mode) {
                return $localStorage.layoutMode === mode;
            };

            //local functions
            this.init = function() {
                $scope.toggle = APP_FLAGS.enableToggle;
                if($localStorage.layoutMode
                    && $location.url().indexOf($localStorage.layoutMode) == -1) {
                    //opps, we are in the wrong mode, switch!
                    if(APP_FLAGS[$localStorage.layoutMode]) { //check to make sure that mode is active
                        $location.path('/' + $localStorage.layoutMode);
                    } else {
                        console.log("Something is weird, resetting to default layout view");
                        $scope.switchMode(APP_FLAGS.defaultView);
                    }
                } else {
                    //all is well, ga pageview, go
                    miscService.pushPageview();
                }
            };
            this.init();
        }
    ]);

    return app;

});


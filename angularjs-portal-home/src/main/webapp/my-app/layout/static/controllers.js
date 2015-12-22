'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.layout.static.controllers', []);

    app.controller('ExclusiveContentController', ['$modal',
                                                  '$location',
                                                  '$sessionStorage',
                                                  '$routeParams',
                                                  '$rootScope',
                                                  '$scope',
                                                  'layoutService',
                                                  'miscService',
                                                  'sharedPortletService',
                                                  function ($modal,
                                                            $location,
                                                            $sessionStorage,
                                                            $routeParams,
                                                            $rootScope,
                                                            $scope,
                                                            layoutService,
                                                            miscService,
                                                            sharedPortletService) {
        miscService.pushPageview();
        $scope.portlet = sharedPortletService.getProperty() || {};
        var that = this;
        that.getPortlet = function (fname, portlets) {
            for (var p in portlets) {
                if (portlets[p].fname == fname) {
                    return portlets[p];
                }
            }
            return {};
        };

        if (typeof $scope.portlet.fname === 'undefined' || $scope.portlet.fname !== $routeParams.fname) {

            if (typeof $rootScope.layout !== 'undefined' && $rootScope.layout != null) {
                $scope.portlet = that.getPortlet($routeParams.fname, $rootScope.layout);
            }
            if (typeof $scope.portlet.fname === 'undefined') {
                layoutService.getApp($routeParams.fname).then(function (data) {
                    $scope.portlet = data.portlet;
                    if (typeof $scope.portlet === 'undefined' ||
                        typeof $scope.portlet.fname === 'undefined') {
                        $location.path('/');
                    } else {
                        layoutService.getExclusiveMarkup($scope.portlet);
                    }
                });
            } else {
                layoutService.getExclusiveMarkup($scope.portlet);
            }

        }
    }]);

    app.controller('StaticContentController', [
        '$modal',
        '$location',
        '$sessionStorage',
        '$routeParams',
        '$rootScope',
        '$scope',
        'layoutService',
        'miscService',
        'sharedPortletService',
        function ($modal,
                  $location,
                  $sessionStorage,
                  $routeParams,
                  $rootScope,
                  $scope,
                  layoutService,
                  miscService,
                  sharedPortletService) {

            miscService.pushPageview();
            $scope.portlet = sharedPortletService.getProperty() || {};
            $scope.loading = [];
            var that = this;
            that.getPortlet = function (fname, portlets) {
                for (var p in portlets) {
                    if (portlets[p].fname == fname) {
                        return portlets[p];
                    }
                }
                return {};
            };

            if (typeof $scope.portlet.fname === 'undefined' || $scope.portlet.fname !== $routeParams.fname) {

                if (typeof $rootScope.layout !== 'undefined' && $rootScope.layout != null) {
                    $scope.portlet = that.getPortlet($routeParams.fname, $rootScope.layout);
                    $scope.loading = $scope.portlet;
                }
                if (typeof $scope.portlet.fname === 'undefined') {
                    layoutService.getApp($routeParams.fname).then(function (data) {
                        $scope.portlet = data.portlet;
                        if (typeof $scope.portlet === 'undefined' ||
                            typeof $scope.portlet.fname === 'undefined') {
                            $location.path('/');
                        } else {
                          $scope.loading = $scope.portlet; //not []
                        }
                    });
                }

            } else {
              $scope.loading = $scope.portlet;
            }

            $scope.openRating = function (size, fname, name) {
                var modalInstance = $modal.open({
                    templateUrl: 'ratingModal.html',
                    controller: 'RatingModalController',
                    size: size,
                    resolve: {
                        fname: function () {
                            return fname;
                        },
                        name: function () {
                            return name;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            this.addToHome = function (portlet) {
                var ret = layoutService.addToHome(portlet);
                ret.success(function (request, text) {
                    $('.fname-' + portlet.fname).html('<span style="color : green;"><i class="fa fa-check"></i> Added Successfully</span>').prop('disabled', true);
                    $scope.$apply(function () {
                        if (typeof $sessionStorage.marketplace !== 'undefined') {
                            var marketplaceEntries = $.grep($sessionStorage.marketplace, function (e) {
                                return e.fname === portlet.fname
                            });
                            if (marketplaceEntries.length > 0) {
                                marketplaceEntries[0].hasInLayout = true;
                            }
                        }

                        //reset layout due to modifications
                        $rootScope.layout = null;
                        $sessionStorage.layout = null;

                    });
                })
                    .error(function (request, text, error) {
                        $('.fname-' + portlet.fname).html('<span style="color : red;">Issue adding to home, please try again later</span>');
                    });
            };

            this.inLayout = function () {
                var layout = $rootScope.layout;
                var ret = false;
                if (!layout) {
                    //get layout
                    layoutService.getLayout().then(function (data) {
                        $rootScope.layout = data.layout;
                        var portlets = $.grep($rootScope.layout, function (e) {
                            return e.fname === $routeParams.fname
                        });
                        $scope.inFavorites = portlets.length > 0; //change scope variable to trigger apply
                    });
                } else {
                    var portlets = $.grep($rootScope.layout, function (e) {
                        return e.fname === $routeParams.fname
                    });
                    ret = portlets.length > 0;
                }

                return ret;
            };

            $scope.inFavorites = this.inLayout();
        }]);

    return app;

});

'use strict';

define(['angular', 'require'], function(angular, require){

    var app = angular.module('my-app.layout.directives', []);

    app.directive('portletIcon', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/portlet-icon.html')
        }
    });

    app.directive('defaultCard', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/default-card.html')
        }
    });

    app.directive('pithyContentCard', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/pithy-content-card.html') //FIXME: this doesn't exist
        }
    });

    app.directive('marketplaceLight', function(){
        return{
            restrict: 'E',
            templateUrl: require.toUrl('./partials/marketplace-light.html')
        }
    });

    app.directive('homeHeader', function(){
        return{
            restrict: 'E',
            templateUrl: require.toUrl('./partials/home-header.html')
        }
    });

    app.directive('exampleWidgets', function(){
        return{
            restrict: 'E',
            templateUrl: require.toUrl('./partials/example-widgets.html')
        }
    });

    app.directive('homeToggle', function(){
        return {
            restrict: 'E',
            templateUrl: require.toUrl('./partials/home-toggle.html'),
            controller: 'ToggleController'
        };
    });

    return app;

});


'use strict';

define(['angular'], function(angular){

    var app = angular.module('my-app.layout.widget.controllers', []);

    app.controller('OptionLinkController', ['$scope', 'layoutService', function($scope, layoutService){

        var configInit = function(){
            if(!$scope.config) {
                //setting up defaults since config doesn't exist
                $scope.config = {
                    singleElement : false,
                    arrayName : 'array',
                    value : 'value',
                    display : 'display'
                };
            }
        };

        var populateWidgetContent = function() {
            if($scope.portlet.widgetURL && $scope.portlet.widgetType) {
                //fetch portlet widget json
                $scope.portlet.widgetData = [];

                layoutService.getWidgetJson($scope.portlet).then(function(data) {
                    if(data) {
                        console.log(data);
                        //set init
                        if($scope.config.singleElement) {
                            //set the default selected url
                            $scope.portlet.selectedUrl = $scope.portlet.widgetData[$scope.config.value];
                        } else if($scope.portlet.widgetData[$scope.config.arrayName] && $scope.portlet.widgetData[$scope.config.arrayName].length > 0) {
                            $scope.portlet.selectedUrl = $scope.portlet.widgetData[$scope.config.arrayName][0][$scope.config.value];
                        }
                    } else {
                        console.warn("Got nothing back from widget fetch for " + $scope.portlet.fname);
                    }
                });
            }
        };
        configInit();
        populateWidgetContent();
    }]);

    app.controller('WeatherController', ['$scope', 'layoutService', function($scope, layoutService){
        $scope.weatherData = [];
        var populateWidgetContent = function() {
            if($scope.portlet.widgetURL && $scope.portlet.widgetType) {
                //fetch portlet widget json
                $scope.portlet.widgetData = [];
                layoutService.getWidgetJson($scope.portlet).then(function(data) {
                    if(data) {
                        console.log(data);
                        $scope.portlet.widgetData = data.weathers;
                        $scope.weatherData = $scope.portlet.widgetData;
                    } else {
                        console.warn("Got nothing back from widget fetch");
                    }
                });
            }
        };
        console.log("Config: " + $scope.portlet.widgetConfig);
        populateWidgetContent();
        $scope.details=false;
    }]);

    app.controller('GenericWidgetController', ['$scope', 'layoutService', function($scope, layoutService){
        var populateWidgetContent = function() {
            if($scope.portlet.widgetURL && $scope.portlet.widgetType) {
                //fetch portlet widget json
                layoutService.getWidgetJson($scope.portlet).then(function(data) {
                    if(data) {
                        console.log(data);
                        $scope.portlet.widgetData = data;
                        $scope.content = $scope.portlet.widgetData;
                        if(Array.isArray($scope.content) &&  $scope.content.length == 0) {
                            $scope.isEmpty = true;
                        } else if($scope.portlet.widgetConfig.evalString
                            && eval($scope.portlet.widgetConfig.evalString)) {
                            //ideally this would do a check on an embedded object for emptiness
                            //example : '$scope.content.report.length === 0'
                            $scope.isEmpty = true;
                        }
                    } else {
                        console.warn("Got nothing back from widget fetch from " + $scope.portlet.widgetURL);
                        $scope.isEmpty = true;
                    }
                });
            }
        };

        $scope.content = [];
        $scope.template =  $scope.portlet.widgetConfig.template;
        $scope.isEmpty = false;
        $scope.portlet.widgetData = [];
        console.log("Config for "+ $scope.portlet.fname + ": " + $scope.portlet.widgetConfig);
        populateWidgetContent();
    }]);

    return app;

});

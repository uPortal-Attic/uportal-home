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
        $scope.loading = false;
        var populateWidgetContent = function() {
            if($scope.portlet.widgetURL && $scope.portlet.widgetType) {
                $scope.loading = true;
                //fetch portlet widget json
                $scope.portlet.widgetData = [];
                layoutService.getWidgetJson($scope.portlet).then(function(data) {
                    $scope.loading = false;
                    if(data) {
                        console.log(data);
                        $scope.portlet.widgetData = data.weathers;
                        $scope.weatherData = $scope.portlet.widgetData;
                    } else {
                        $scope.error = true;
                        console.warn("Got nothing back from widget fetch");
                    }
                }, function(){
                    $scope.loading = false;
                    $scope.error = true;
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
                        } else if($scope.portlet.widgetConfig && $scope.portlet.widgetConfig.evalString
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
      
        $scope.filteredArray = function (array, objectVar, strings) {
          return array.filter(function (letter) {
            for(var i = 0; i < strings.length ; i++) {
              if(letter[objectVar].indexOf(strings[i]) != -1) {
                return true;
              }
            }
          });
        };

        if($scope.portlet.widgetTemplate) {
            $scope.content = [];
            $scope.template =  $scope.portlet.widgetTemplate;
            $scope.isEmpty = false;
            $scope.portlet.widgetData = [];
            console.log("Config for "+ $scope.portlet.fname + ": " + $scope.portlet.widgetConfig);
            populateWidgetContent();
        } else {
            console.error($scope.portlet.fname + " said its a widget, but no template defined.");
            $scope.isEmpty = true;
        }
    }]);

    return app;

});

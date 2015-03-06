'use strict';

(function() {
  var app = angular.module('portal.layout.widget.controllers', []);
  
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
                  console.warn("Got nothing back from widget fetch");
              }
            });
          }
      }
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
      }
      console.log("Config: " + $scope.config);
      populateWidgetContent();
      $scope.details=false;
  }]);
})();
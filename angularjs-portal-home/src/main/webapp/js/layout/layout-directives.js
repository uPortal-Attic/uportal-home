'use strict';

(function() {
  var app = angular.module('portal.layout.directives', []);
  
  app.directive('portletIcon', function(){
      return {
          restrict : 'E',
          templateUrl : 'partials/portlet-icon.html'
      }
  });
  
  app.directive('defaultCard', function(){
      return {
          restrict : 'E',
          templateUrl : 'partials/default-card.html'
      }
  });
  
  app.directive('staticContentCard', function(){
      return {
          restrict : 'E',
          templateUrl : 'partials/static-content-card.html'
      }
  });
  
  app.directive('staticContentCardMax', function(){
      return {
          restrict : 'E',
          templateUrl : 'partials/static-content-card-max.html'
      }
  });
  
  app.directive('pithyContentCard', function(){
      return {
          restrict : 'E',
          templateUrl : 'partials/pithy-content-card.html'
      }
  });
  
  app.directive('widgetCard', function(){
      return {
          restrict : 'E',
          templateUrl : 'partials/widget-card.html'
      }
  });


   app.directive('marketplaceLight', function(){
      return{
          restrict: 'E',
          templateUrl: 'partials/marketplace-light.html'
      }
   });
   
   app.directive('homeHeader', function(){
      return{
          restrict: 'E',
          templateUrl: 'partials/home-header.html'
      }
   });
   
   /**
    * <option-link> directive is used to display widget content.
    * You need to setup a config JSON object, or just use the defaults defined below
    * config = {
    *             singleElement : false, //flags if your widgetData object as a single set in addition to the array
    *             arrayName : 'array', //the array name under widgetData
    *             value : 'value', //what you want the value to be (usually a URL)
    *             display : 'display' // what to display in the drop down
    *         }
    */
   app.directive('optionLink', function(){
       
       return{
           restrict: 'E',
           scope : {
               portlet : '=app',
               config  : '=config'
           },
           templateUrl: 'partials/widgets/option-link.html',
           controller : 'OptionLinkController'
       }
    });
   
   app.directive('weather', function(){
       
       return{
           restrict: 'E',
           scope : {
               portlet : '=app',
               config  : '=config'
           },
           templateUrl: 'partials/widgets/weather.html',
           controller : 'WeatherController'
       }
    });
   
   app.directive('exampleWidgets', function(){
      return{
          restrict: 'E',
          templateUrl: 'partials/example-widgets.html'
      }
   });
   
   app.directive('homeToggle', function(){
       return {
           restrict: 'E',
           templateUrl: 'partials/home-toggle.html',
           controller: function($localStorage, $scope, $location, APP_FLAGS){
               //init
               $scope.toggle = APP_FLAGS.enableToggle;
               if($localStorage.layoutMode && $location.url().indexOf($localStorage.layoutMode) == -1) {
                   //opps, we are in the wrong mode, switch!
                   if(APP_FLAGS[$localStorage.layoutMode]) { //check to make sure that mode is active
                       $location.path('/' + $localStorage.layoutMode);
                   } else {
                       console.log("Something is weird, resetting to default layout view");
                       $localStorage.layoutMode = APP_FLAGS.defaultView;
                       $location.path('/' + APP_FLAGS.defaultView);
                   }
               }
               //functions
               $scope.switchMode = function(mode) {
                   $localStorage.layoutMode = mode;
                   $location.path('/' + mode);
               }
               
               $scope.modeIs = function(mode) {
                   return $localStorage.layoutMode === mode;
               }
           }
       };
   });

})();

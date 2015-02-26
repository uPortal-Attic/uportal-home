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
   
   app.directive('optionLink', function(){
       return{
           restrict: 'E',
           templateUrl: 'partials/widgets/option-link.html'
       }
    });

})();

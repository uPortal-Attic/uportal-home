'use strict';

(function() {
  var app = angular.module('portal.misc.directives', []);

    
    app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                        elm.css('margin','0')
                        elm.html(""); //removes content of div, so if it shows again later it doesn't make the page look funky
                    }
                });
            }
        };

    }]);

    app.directive('hideWhileLoading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.hide();
                    }else{
                        elm.show();
                    }
                });
            }
        };

    }]);

    app.directive('selectOnPageLoad',function($timeout){
        return {
            restrict: 'A',
            link: function(scope,element){
                //wait until intial value is there, then select it, then clear the watch so doesn't keep doing it
                var clearWatch = scope.$watch(
                    function(){ return $(element[0]).val(); },
                    function(value){
                        if (value){
                            element[0].focus();
                            clearWatch();
                        }
                    }
                )
            }
        }
    });
    
    app.directive('focusMe', function($timeout) {
        return {
          link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
              if(value === true) { 
                console.log('value=',value);
                $timeout(function() {
                  element[0].focus();
                  scope[attrs.focusMe] = false;
                });
              }
            });
          }
        };
      });
    
    /**
     * Directive to render the div with the "portlet-header" class.
     * Supports 3 attributes:
     * 
     * <ol>
     * <li>app-image: background image for the div</li>
     * <li>app-title: displayed in an h1 child element</li>
     * <li>app-description: displayed in a p child element</li>
     * </ol>
     * 
     * Example:
     * <pre>
     * <portlet-header app-title="My App Title" app-image="img/square.jpg" app-description="Optional app description."></portlet-header>
     * </pre>
     * 
     * See ../partials/portlet-header.html.
     */
    app.directive('portletHeader', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			title: '@appTitle',
    			image: '@appImage',
    			description: '@appDescription'
    		},
    		templateUrl: 'partials/portlet-header.html'
    	};
    });

})();

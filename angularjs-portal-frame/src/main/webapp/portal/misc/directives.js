'use strict';

define(['angular', 'require'], function(angular, require) {
  var app = angular.module('portal.misc.directives', []);

    /**
     * Loading gif - show loading gif when the length of said array is 0 and empty is not set
     * REQUIRED attribute that isn't listed below:
     *   object : this is the scope array we are watching to show/hide gif
     *   empty  : this is the scope boolean flag that you set if the data came back and it was empty
     *   reuse  : (optional) set to true, it won't destroy the loading gif, just hide it
     *
     */
    app.directive('loadingGif', [function(){
        return {
            restrict : 'E',
            templateUrl: require.toUrl('./partials/loading-gif.html'),
            link: function(scope, elm, attrs) {
                scope.isLoading = function () {

                    if(typeof attrs.empty === undefined) {
                        attrs.empty = false;
                    }

                    return (!scope[attrs.object] || scope[attrs.object].length == 0) && ! scope[attrs.empty];
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                        if(!attrs.reuse) {
                          elm.css('margin','0')
                          elm.html(""); //removes content of div, so if it shows again later it doesn't make the page look funky
                        }
                    }
                });
            }
        }
    }]);
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
     * See ./partials/portlet-header.html.
     */
    app.directive('portletHeader', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			title: '@appTitle',
    			image: '@appImage',
    			description: '@appDescription'
    		},
    		templateUrl: require.toUrl('./partials/portlet-header.html')
    	};
    });

    /**
     * content-item is a directive that
     * displays a template with provided content
     *
     * Params:
     *  - template: the template to display (can have angular markup)
     */
    app.directive('contentItem', function ($compile) {

        var linker = function(scope, element, attrs) {
            element.html(scope.template).show();
            $compile(element.contents())(scope);
        };

        return {
            restrict: "E",
            link: linker
        };
    });

    return app;

});

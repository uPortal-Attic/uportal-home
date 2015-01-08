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

})();

'use strict';

(function() {
  var app = angular.module('portal.misc.directives', []);

    app.directive('notifications', function(){

	    return {
	      restrict : 'E',
	      templateUrl : 'partials/notifications.html'
	    }
	  });

	 app.directive('marketplaceLight', function(){
	    return{
	        restrict: 'E',
	        templateUrl: 'partials/marketplace-light.html'
	    }
	 });

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

    app.directive('betaHeader', function() {
        return {
            restrict : 'E',
            templateUrl : 'partials/beta-header.html'
        }
    });

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
    })

})();

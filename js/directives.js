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
})();

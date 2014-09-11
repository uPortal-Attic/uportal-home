'use strict';

(function() {
  var app = angular.module('portal.directives', []);
    app.directive('portalHeader', function() {
	    return {
	      restrict : 'E',
	      templateUrl : 'partials/header.html'
	    }
	  });

	  app.directive('sideBarMenu', function(){

	    return {
	      restrict : 'E',
	      templateUrl : 'partials/sidebar-left.html'
	    }
	  });

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

	  app.directive('search', function() {
		  return {
			  restrict : 'E',
			  templateUrl : 'partials/search.html'
		  }
	  });
	  app.directive('username', function() {
		  return {
			  restrict : 'E',
			  templateUrl : 'partials/username.html'
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

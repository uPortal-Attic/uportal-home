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
	  
	  app.directive('search', function() {
		  return {
			  restrict : 'E',
			  templateUrl : 'partials/search.html'
		  }
	  });
})();


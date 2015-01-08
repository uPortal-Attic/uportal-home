'use strict';

 (function() {
  var app = angular.module('portal.misc.controllers', []);

  /* Profile */

  app.controller('ProfileController', [ '$http', function($http) {
  		var store = this;
  		store.user = {};

  		$http.get('/profile').success(function(data) {
  			store.user = data;
  		});
  	} ]);
  
  app.controller('SettingsController', [ '$localStorage', '$scope', function($localStorage, $scope) {
      $scope.$storage = $localStorage.$default( {showSidebar: true, sidebarQuicklinks: false, homeImg : "img/square.jpg"} );
  } ]);

 })();

  'use strict';
  
 (function() {
  var app = angular.module('portal.controllers', []);
  app.controller('ProfileController', [ '$http', function($http) {
  		var store = this;
  		store.user = {};
  		
  		$http.get('/profile').success(function(data) {
  			store.user = data;
  		});
  	} ]);
  
  app.controller('MainController', [ '$http', function($http) {
  	var store = this;
  	store.data = [];
  	$http.get('/portal/api/layoutDoc').success(function(data) {
  		store.data = data;
  	});
  	
	} ]);
  
  app.controller('MarketplaceController', [ '$http', function($http) {
  	var store = this;
  	store.data = [];
  	$http.get('/portal/api/portlets.json').success(function(data) {
  		store.data = data;
  	});
  	
	} ]);
  
  var notes = [
    {notificationId: 1, text: "test text", unread : true},
    {notificationId: 2, text: "test text 2", unread : false},
  ];
 })();
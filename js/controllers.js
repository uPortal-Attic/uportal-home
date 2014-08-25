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
  
  app.controller('NotificationController', [ '$http', function($http){
    var store = this;
    store.notifications = [];
    
    $http.get('/portal/f/u17l1s10/p/notification-icon.u17l1n11/normal/GET-NOTIFICATIONS-UNCATEGORIZED.resource.uP')
    		.success(function(data) {
    			store.notifications = data.feed;
    		});
    
    this.getClass = function getClass(index, notifications) {
      return {
        unread : !notifications[index].attributes.READ.value,
        read : notifications[index].attributes.READ.value
      };
    }

    this.markRead = function markRead(index, notifications) {
      notifications[index].unread = false;
    }
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
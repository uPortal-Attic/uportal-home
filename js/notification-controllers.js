  'use strict';
  
 (function() {
  var app = angular.module('portal.notificationControllers', []);
  
  app.controller('NotificationController', [ '$http', function($http){
    var store = this;
    store.notifications = [];
    store.count = 0;
    store.notificationUrl = '/portal/p/notification/';
    
    $http.get('/portal/p/notification/normal/GET-NOTIFICATIONS-UNCATEGORIZED.resource.uP')
    		.success(function(data) {
    			var theFeed = data.feed;
    			store.count = theFeed.length;
    			for(var i = 0; i < 3; i++) {
    				store.notifications.push(theFeed[i]);
    			}
    			
    		});
    
    this.getClass = function getClass(index, notifications) {
      return {
        unread : notifications[index].attributes == undefined || notifications[index].attributes.READ == undefined || !notifications[index].attributes.READ,
        read : notifications[index].attributes != undefined && notifications[index].attributes.READ  != undefined && notifications[index].attributes.READ
      };
    }
    
    this.markRead = function markRead(index, notifications) {
      if(notifications[index].attributes == undefined) {
        notifications[index].attributes = {READ : true};
      } else {
        notifications[index].attributes.READ = true;
      }
      
      store.count--;
    }
  } ]);
 })();
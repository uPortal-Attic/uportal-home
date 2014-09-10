  'use strict';

 (function() {
  var app = angular.module('portal.notificationControllers', []);

  app.controller('NotificationController', [ '$http', function($http){
    var store = this;
    store.notifications = [];
    store.notifications_full = [];
    store.count = 0;
    store.notificationUrl = '/portal/p/notification/';
    store.fetchUrl = '/portal/p/notification/normal/GET-NOTIFICATIONS-UNCATEGORIZED.resource.uP';

    $http.get(store.fetchUrl)
    		.success(function(data) {
    			var theFeed = data.feed;
    			store.count = theFeed.length;
          store.notifications_full = theFeed;
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

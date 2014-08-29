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

    store.notifications_full = [];
    store.count_full = 0;
    $http.get('/portal/p/notification/normal/GET-NOTIFICATIONS-UNCATEGORIZED.resource.uP')
        .success(function(data) {
          var theFeed_full = data.feed;
          store.count_full = theFeed_full.length;
          for(var i = 0; i < store.count_full; i++) {
            store.notifications_full.push(theFeed_full[i]);
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

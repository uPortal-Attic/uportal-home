'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.notifications.controllers ', []);

  app.controller('NotificationController', [ 'notificationsService', function(notificationsService){
    var store = this;
    store.notifications = [];
    store.count = 0;
    store.isEmpty = false;
    store.notificationUrl = 'notifications';

    notificationsService.getNotificationsByGroups().then(function(data){
      //success state
      store.count = data.length;
      store.isEmpty = (store.count === 0);
      if(store.isEmpty) {
        store.status = "No notifications";
      } else {
        store.status = "You have notifications";
      }
      store.notifications = data;
    }, function(data){
      //error state (logging of error happens at service layer)
      store.count = 0;
      store.isEmpty = true;
    });

    this.getClass = function getClass(index, notifications) {
      return {
        unread : notifications[index].attributes == undefined || notifications[index].attributes.READ == undefined || !notifications[index].attributes.READ,
        read : notifications[index].attributes != undefined && notifications[index].attributes.READ  != undefined && notifications[index].attributes.READ
      };
    };

    this.markRead = function markRead(index, notifications) {
      if(notifications[index].attributes == undefined) {
        notifications[index].attributes = {READ : true};
      } else {
        notifications[index].attributes.READ = true;
      }
      store.count--;
    }
  }]);

  return app;

});

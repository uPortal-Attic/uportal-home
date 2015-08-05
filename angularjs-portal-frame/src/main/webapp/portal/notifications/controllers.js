'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.notifications.controllers ', []);

  app.controller('NotificationController', [ '$scope','NOTIFICATION', 'notificationsService', function($scope, NOTIFICATION, notificationsService){
    var successFn = function(data){
      //success state
      $scope.count = data.length;
      $scope.isEmpty = ($scope.count === 0);
      $scope.status = "You have "+ ($scope.isEmpty ? "no " : "") + "notifications";
      $scope.notifications = data;
    };

    var errorFn = function(data){
      //error state (logging of error happens at service layer)
      $scope.count = 0;
      $scope.isEmpty = true;
    };



    $scope.getClass = function getClass(index, notifications) {
      return {
        unread : notifications[index].attributes == undefined || notifications[index].attributes.READ == undefined || !notifications[index].attributes.READ,
        read : notifications[index].attributes != undefined && notifications[index].attributes.READ  != undefined && notifications[index].attributes.READ
      };
    };

    $scope.markRead = function markRead(index, notifications) {
      if(notifications[index].attributes == undefined) {
        notifications[index].attributes = {READ : true};
      } else {
        notifications[index].attributes.READ = true;
      }
      $scope.count--;
    }

    var init = function(){
      $scope.notifications = [];
      $scope.count = 0;
      $scope.isEmpty = false;
      $scope.notificationUrl = NOTIFICATION.notificationFullURL;
      $scope.notificationsEnabled = NOTIFICATION.enabled;

      if(NOTIFICATION.enabled) {
        if(NOTIFICATION.groupFiltering) {
          notificationsService.getNotificationsByGroups().then(successFn, errorFn);
        } else {
          notificationsService.getAllNotifications().then(successFn, errorFn);
        }
      }
    }

    init();
  }]);

  return app;

});

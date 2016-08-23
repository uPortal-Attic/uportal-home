'use strict';

define(['angular', 'jquery', 'require'], function(angular, $, require) {

    var app = angular.module('my-app.rating.components', []);

    /**
     * <rating-button portlet='portletObject'
                      button-text='The text of the button'
                      button-classes="any additional classes">
     * portlet object usage : { fname, title}
     */
    app.component('ratingButton', {
      bindings : {
        portlet : '<',
        buttonText : '@',
        buttonClasses : '@'
      },
      templateUrl: require.toUrl('./partials/rating-button.html'),
      controllerAs: 'ratingCtrl',
      controller: function($scope,
                           $location,
                           $mdDialog) {

           this.$onInit = function() {
             //initialize
             $scope.openModal = function() {
               $mdDialog.show({
                   controller: 'RatingsModalController',
                   templateUrl: require.toUrl('./partials/rating-review.html'),
                   parent: angular.element(document.body),
                   scope: $scope,
                   preserveScope : true,
                   clickOutsideToClose:true,
                   fullscreen: false
               });
             };
           }

           this.$onChanges = function(changesObj) {
             if(changesObj
                 && changesObj.portlet
                 && changesObj.portlet.currentValue
                 && changesObj.portlet.currentValue
                     !== changesObj.portlet.previousValue) {
               $scope.portlet = changesObj.portlet.currentValue;
             }
           }
      }
    });

  });

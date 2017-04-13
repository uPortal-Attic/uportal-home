'use strict';

define(['angular', 'jquery', 'require'], function(angular, $, require) {
    return angular.module('my-app.rating.controllers', [])

    .controller('RatingsModalController', [
        'marketplaceService', '$mdDialog',
        function(marketplaceService, $mdDialog) {
            var vm = this;

            var init = function() {
              vm.loading = true;
              marketplaceService.getUserRating(vm.portlet.fname)
                .then(function(data) {
                  var rating = data;
                  if (rating !== null) {
                      vm.rating = rating;
                      vm.rating.previouslyRated=true;
                      vm.loading = false;
                  } else {
                      vm.rating = {
                       'rating': 0,
                       'review': '',
                       'previouslyRated': false,
                      };
                      vm.loading = false;
                  }
                  return data;
                }).catch(function() {
                  vm.loading = false;
                  vm.rating = {
                                   'rating': 0,
                                   'review': '',
                                   'previouslyRated': false,
                                  };
                });
            };

            init();

            vm.ok = function() {
              marketplaceService.saveRating(vm.portlet.fname, vm.rating)
                .then(function() {
                  $mdDialog.hide();
                  vm.saved = true;
                  return;
                })
                .catch(function() {
                  vm.error = 'Issue saving rating';
                });
            };

            vm.cancel = function() {
              $mdDialog.cancel();
            };
        }]);
  });

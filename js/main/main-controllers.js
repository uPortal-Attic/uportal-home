'use strict';

(function() {
  var app = angular.module('portal.main.controllers', []);

  app.controller('MainController', [ '$http', function($http) {
    var store = this;
    store.data = [];
    $http.get('/portal/api/layoutDoc?tab=UW Bucky Home').success(function(data) {
      store.data = data;
    });
    this.directToPortlet = function directToPortlet(url) {
      $location.path(url);
    }
    this.removePortlet = function removePortletFunction(nodeId) {
        $.ajax({
                url: "/portal/api/layout?action=removeElement&elementID=" + nodeId,
                type: "POST",
                data: null,
                dataType: "json",
                async: true,
                success: function (request, text){
                  $('#portlet-id-'+ nodeId).parent().fadeOut();
                  $('#portlet-id-'+ nodeId).parent().remove();
                },
                error: function(request, text, error) {
                  //$('#up-notification').noty({text: request.response, type: 'error'});
                }
            });
      };


  } ]);

  /* Username */

  app.controller('SessionCheckController', [ 'mainService', function(mainService) {
    var that = this;
    that.user = [];
    mainService.getUser().then(function(data){
      that.user = data;
      console.log(data);
    });
  }]);

  /* Search */

  app.controller('SearchController', [ '$scope', '$location', 'marketplaceService', function($scope, $location, marketplaceService) {
      $scope.submit = function(){
        marketplaceService.initialFilter($scope.initialFilter);
        $location.path("/marketplace");
        $scope.initialFilter = "";
      }
    } ]);



})();

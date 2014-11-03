'use strict';

(function() {
  var app = angular.module('portal.main.controllers', []);

  app.controller('MainController', [  '$rootScope', '$scope', 'mainService', 'miscService', function($rootScope, $scope, mainService, miscService) {

    miscService.pushPageview();
    $rootScope.layout = [];
    
    mainService.getLayout().then(function(data){
      $rootScope.layout = data.layout;
    });

    this.directToPortlet = function directToPortlet(url) {
      $location.path(url);
    }
    this.removePortlet = function removePortletFunction(nodeId, title) {
        $.ajax({
                url: "/portal/api/layout?action=removeElement&elementID=" + nodeId,
                type: "POST",
                data: null,
                dataType: "json",
                async: true,
                success: function (request, text){
                  $scope.$apply(function(){
                    var result = $.grep($rootScope.layout, function(e) { return e.nodeId === nodeId});
                    var index = $.inArray(result[0], $rootScope.layout);
                    //remove
                    $rootScope.layout.splice(index,1);
                  });
                  miscService.pushGAEvent('Layout Modification', 'Remove', title);
                },
                error: function(request, text, error) {

                }
            });
      };


  } ]);

  /* Username */

  app.controller('SessionCheckController', [ 'mainService', function(mainService) {
    var that = this;
    that.user = [];
    mainService.getUser().then(function(result){
      that.user = result.data.person;
    });
  }]);

  /* Search */

  app.controller('SearchController', [ '$scope', '$location', 'marketplaceService', function($scope, $location, marketplaceService) {
      $scope.submit = function(){
        if($scope.initialFilter != "") {
          marketplaceService.initialFilter($scope.initialFilter);
          $location.path("/marketplace/search/"+ $scope.initialFilter);
          $scope.initialFilter = "";
        }
      };
    } ]);

  app.controller('HeaderController', [ '$scope', function($scope) {
    $scope.showSearch = false;
  }]);



})();

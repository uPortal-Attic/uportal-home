'use strict';

(function() {
  var app = angular.module('portal.main.controllers', []);

  app.controller('MainController', [ '$sessionStorage', '$rootScope', '$scope', 'mainService', 'miscService', function($sessionStorage, $rootScope, $scope, mainService, miscService) {


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
                    if($sessionStorage.marketplace != null) {
                        var marketplaceEntries = $.grep($sessionStorage.marketplace, function(e) { return e.fname === result[0].fname});
                        if(marketplaceEntries.length > 0) {
                            marketplaceEntries[0].hasInLayout = false;
                        }
                    }
                  });
                  miscService.pushGAEvent('Layout Modification', 'Remove', title);
                },
                error: function(request, text, error) {

                }
            });
      };

	  $scope.sortableOptions = {
              stop : function() {
                  alert('stopped')
              }
      };
      
      this.toggleDiv = function toggleDiv(nodeId) {
          //Toggle Make full row
          $('#portlet-id-' + nodeId).parent().parent('.portlet-container').toggleClass('col-sm-6');
          $('#portlet-id-' + nodeId).parent().parent('.portlet-container').toggleClass('col-md-6');
          $('#portlet-id-' + nodeId).parent().parent('.portlet-container').toggleClass('col-lg-4');

          $('#portlet-id-' + nodeId).parent().parent('.portlet-container').toggleClass('col-sm-12');

          //Toggle height : auto
          if( $('#portlet-id-' + nodeId).css('height') == '150px') {
              $('#portlet-id-' + nodeId).css('height','auto');
          } else {
              $('#portlet-id-' + nodeId).css('height','150px');
    	  }
    	  
    	  //Toggle content visible
    	  $('#content-' + nodeId).toggleClass('hidden');
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

  /* Header */
  app.controller('HeaderController', ['$scope','$location', 'marketplaceService', function($scope, $location, marketplaceService) {
    $scope.showSearch = false;
    $scope.submit = function(){
      if($scope.initialFilter != "") {
        marketplaceService.initialFilter($scope.initialFilter);
        $location.path("/apps/search/"+ $scope.initialFilter);
        $scope.initialFilter = "";
        $scope.showSearch = false;
      }
    };
  }]);



})();

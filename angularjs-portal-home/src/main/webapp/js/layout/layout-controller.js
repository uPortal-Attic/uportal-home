'use strict';

(function() {
  var app = angular.module('portal.layout.controllers', []);

  app.controller('LayoutController', [ '$location', '$localStorage', '$sessionStorage', '$scope', '$rootScope', 'layoutService', 'miscService', 'sharedPortletService', function($location, $localStorage, $sessionStorage, $scope, $rootScope, layoutService, miscService, sharedPortletService) {
    miscService.pushPageview();
    if(typeof $rootScope.layout === 'undefined' || $rootScope.layout == null) {
      
      $rootScope.layout = [];
    
      layoutService.getLayout().then(function(data){
        $rootScope.layout = data.layout;
      });
    }
    
    this.portletType = function portletType(portlet) {
      if($localStorage.pithyContentOnHome && portlet.pithyStaticContent != null) {
          return "PITHY";
      } else if(portlet.staticContent == null
                 || portlet.altMaxUrl == true) {
          return "NORMAL";
      } else if (portlet.staticContent != null 
                 && portlet.altMaxUrl == false) {
          return "SIMPLE";
      }
    }
    
    this.maxStaticPortlet = function gotoMaxStaticPortlet(portlet) {
    	sharedPortletService.setProperty(portlet);
    	$location.path('/static/'+portlet.fname);
    }

    this.directToPortlet = function directToPortlet(url) {
      $location.path(url);
    }
    this.removePortlet = function removePortletFunction(nodeId, title) {
        $.ajax({
                url: "/portal/web/layout?action=removeElement&elementID=" + nodeId,
                type: "POST",
                data: null,
                dataType: "json",
                async: true,
                success: function (request, text){
                  $scope.$apply(function(){
                    var result = $.grep($scope.layout, function(e) { return e.nodeId === nodeId});
                    var index = $.inArray(result[0], $scope.layout);
                    //remove
                    $scope.layout.splice(index,1);
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
              delay:250,
              cursorAt : {top: 30, left: 30},
              stop: function(e, ui) {
                  if(ui.item.sortable.dropindex != ui.item.sortable.index) {

                      var node = $scope.layout[ui.item.sortable.dropindex];
                      console.log("Change happened, logging move of " + node.fname + " from " + ui.item.sortable.index + " to " + ui.item.sortable.dropindex);
                      //index, length, movingNodeId, previousNodeId, nextNodeId
                      var prevNodeId = ui.item.sortable.dropindex != 0 ? $scope.layout[ui.item.sortable.dropindex - 1].nodeId : "";
                      var nextNodeId = ui.item.sortable.dropindex != $scope.layout.length - 1 ? $scope.layout[ui.item.sortable.dropindex + 1].nodeId : "";
                      layoutService.moveStuff(ui.item.sortable.dropindex, $scope.layout.length, node.nodeId, prevNodeId, nextNodeId);

                  }
              }
      };

      this.toggleDiv = function toggleDiv(nodeId) {
          //Toggle Make full row
          $('#portlet-id-' + nodeId).parent().parent().toggleClass('col-sm-6');
          $('#portlet-id-' + nodeId).parent().parent().toggleClass('col-md-6');
          $('#portlet-id-' + nodeId).parent().parent().toggleClass('col-lg-4');

          $('#portlet-id-' + nodeId).parent().parent().toggleClass('col-sm-12');

          //Toggle height : auto
          if( $('#portlet-id-' + nodeId).css('height') == '150px') {
              $('#portlet-id-' + nodeId).css('height','auto');
              $('#portlet-id-' + nodeId).parent().parent().css('width','100%');
              $('#portlet-id-' + nodeId).parent().parent().css('z-index','1000');
              
          } else {
              $('#portlet-id-' + nodeId).css('height','150px');
              $('#portlet-id-' + nodeId).parent().parent().css('width','');
          }

          //Toggle content visible
          $('#content-' + nodeId).toggleClass('hidden');
      };
      
  } ]);
  
  app.controller('StaticContentController', ['$modal', '$location','$sessionStorage', '$routeParams', '$rootScope','$scope', 'layoutService', 'miscService', 'sharedPortletService', function ($modal, $location,$sessionStorage, $routeParams, $rootScope, $scope, layoutService,miscService, sharedPortletService){
	  $scope.portlet = sharedPortletService.getProperty() || {};
	  var that = this;
	  that.getPortlet = function(fname, portlets ) {
	    for(var p in portlets) {
	      if (portlets[p].fname == fname) {
	        return portlets[p];
	        break;
	      }
	    };
	    return {};
	  }
	  
	  if (typeof $scope.portlet.fname === 'undefined' || $scope.portlet.fname !== $routeParams.fname) {
		  
		  if(typeof $rootScope.layout !== 'undefined' && $rootScope.layout != null) {
			  $scope.portlet = that.getPortlet($routeParams.fname, $rootScope.layout);
		  } 
		  if(typeof $scope.portlet.fname === 'undefined'){
			  layoutService.getApp($routeParams.fname).then(function(data){
			      $scope.portlet = data.portlet;
			      if(typeof $scope.portlet === 'undefined' || 
			              typeof $scope.portlet.fname === 'undefined') {
			    	  $location.path('/');
			      }
			  });
		  }
	      
       }
      $scope.openRating = function (size, fname, name) {
            var modalInstance = $modal.open({
            templateUrl: 'ratingModal.html',
            controller: 'RatingModalController',
            size: size,
            resolve: {
              fname: function(){return fname;},
              name: function(){return name;}
            }
          });
        
          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      };
      
      this.addToHome = function(portlet) {
          var ret = layoutService.addToHome(portlet);
          ret.success(function (request, text){
              $('.fname-'+portlet.fname).html('<span style="color : green;"><i class="fa fa-check"></i> Added Successfully</span>').prop('disabled',true);
              $scope.$apply(function(){
                  if(typeof $sessionStorage.marketplace !== 'undefined') {
                      var marketplaceEntries = $.grep($sessionStorage.marketplace, function(e) { return e.fname === portlet.fname});
                      if(marketplaceEntries.length > 0) {
                          marketplaceEntries[0].hasInLayout = true;
                      }
                  }
                  
                  //reset layout due to modifications
                  $rootScope.layout = null; 
                  $sessionStorage.layout = null;
                  
              });
          })
          .error(function(request, text, error) {
            $('.fname-'+portlet.fname).html('<span style="color : red;">Issue adding to home, please try again later</span>');
          });
      }
      
      this.inLayout = function() {
          var layout = $rootScope.layout;
          var ret=false;
          if(!layout) {
            //get layout
           layoutService.getLayout().then(function(data) {
             $rootScope.layout = data.layout;
             var portlets = $.grep($rootScope.layout, function(e) { return e.fname === $routeParams.fname});
             $scope.inFavorites = portlets.length > 0; //change scope variable to trigger apply
           });
          } else {
              var portlets = $.grep($rootScope.layout, function(e) { return e.fname === $routeParams.fname});
              ret = portlets.length > 0;
          }
          
          return ret;
     }

      $scope.inFavorites = this.inLayout();
  }]);
  
  app.controller('NewStuffController', ['$scope', 'layoutService', function ($scope, layoutService){
      $scope.newStuffArray = [];
      layoutService.getNewStuffFeed().then(function(result){
          $scope.newStuffArray = result;
      });
      
      this.show = function(stuff) {
          var date = new Date(stuff.expireYr, stuff.expireMon, stuff.expireDay);
          var today = new Date();
          return date >= today;
      }
  }]);



})();

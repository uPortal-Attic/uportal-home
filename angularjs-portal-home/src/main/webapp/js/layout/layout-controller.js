'use strict';

(function() {
  var app = angular.module('portal.layout.controllers', []);

  app.controller('LayoutController', [ '$location', 
                                       '$localStorage', 
                                       '$sessionStorage', 
                                       '$scope', 
                                       '$rootScope', 
                                       'layoutService', 
                                       'miscService', 
                                       'sharedPortletService',
                                       'APP_FLAGS', 
                                       function($location, 
                                                $localStorage, 
                                                $sessionStorage, 
                                                $scope, 
                                                $rootScope, 
                                                layoutService, 
                                                miscService, 
                                                sharedPortletService,
                                                APP_FLAGS) {
    miscService.pushPageview();
    $scope.toggle = APP_FLAGS.enableToggle;
    if(typeof $rootScope.layout === 'undefined' || $rootScope.layout == null) {
      
      $rootScope.layout = [];
    
      layoutService.getLayout().then(function(data){
        $rootScope.layout = data.layout;
      });
    }
    
    this.portletType = function portletType(portlet) {
      if (portlet.staticContent != null 
                 && portlet.altMaxUrl == false) {
          return "SIMPLE";
      } else {
          return "NORMAL";
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
      
  } ]);
  
  
  app.controller('WidgetController', [ '$location', 
                                       '$localStorage', 
                                       '$sessionStorage', 
                                       '$scope', 
                                       '$rootScope', 
                                       'layoutService', 
                                       'miscService', 
                                       'sharedPortletService',
                                       'APP_FLAGS', 
                                       function($location, 
                                            $localStorage, 
                                            $sessionStorage, 
                                            $scope, 
                                            $rootScope, 
                                            layoutService, 
                                            miscService, 
                                            sharedPortletService,
                                            APP_FLAGS) {
                                              
    miscService.pushPageview();
    $scope.toggle = APP_FLAGS.enableToggle;
    var that = this;
    
    that.populateWidgetContent = function() {
        for(var i=0; i < $rootScope.layout.length; i++) {
            if($rootScope.layout[i].widgetURL && $rootScope.layout[i].widgetType) {
              //fetch portlet widget json
              $rootScope.layout[i].widgetData = [];
              layoutService.getWidgetJson($rootScope.layout[i], i).then(function(data) {
                if(data) {
                    if(data.result) {
                      $rootScope.layout[data.index].widgetData = data.result;
                    }
                    if(data.content) {
                      $rootScope.layout[data.index].widgetContent = data.content;
                    }
                    console.log($rootScope.layout[data.index].fname + "'s widget data came back with data: ");
                    console.log(data);
                } else {
                    console.warn("Got nothing back from widget fetch");
                }
              });
            }
        }
    }
    
    if(typeof $rootScope.layout === 'undefined' || $rootScope.layout == null) {
      
      $rootScope.layout = [];
    
      layoutService.getLayout().then(function(data){
        $rootScope.layout = data.layout;
        that.populateWidgetContent();
        $rootScope.widgetsPopulated = true;
      });
    } else if (!($rootScope.widgetsPopulated)) {
        that.populateWidgetContent();
        $rootScope.widgetsPopulated = true;
    }
    
    this.portletType = function portletType(portlet) {
      if (portlet.widgetType) {
          if('option-link' === portlet.widgetType) {
              //portlet.widgetData = [{"value" : "levett@wisc.edu"}];
              return "OPTION_LINK";
          } else {
              return "WIDGET";
          }
          
      }else if($localStorage.pithyContentOnHome && portlet.pithyStaticContent != null) {
          return "PITHY";
      } else if (portlet.staticContent != null 
                 && portlet.altMaxUrl == false) {
          return "SIMPLE";
      } else {
          return "NORMAL";
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

                                            
  } ]);
  
  
  
  app.controller('StaticContentController', ['$modal', 
                                             '$location',
                                             '$sessionStorage', 
                                             '$routeParams', 
                                             '$rootScope',
                                             '$scope', 
                                             'layoutService', 
                                             'miscService', 
                                             'sharedPortletService', 
                                             function ($modal, 
                                                       $location,
                                                       $sessionStorage, 
                                                       $routeParams, 
                                                       $rootScope, 
                                                       $scope, 
                                                       layoutService,
                                                       miscService, 
                                                       sharedPortletService){
      
      miscService.pushPageview();
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

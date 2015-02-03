'use strict';

(function() {
var app = angular.module('portal.layout.service', []);

app.factory('sharedPortletService', function () {
    var property = {};

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});

app.factory('layoutService', function($http, miscService) {
    
  var addToHome = function addToHomeFunction(portlet) {
      var fname = portlet.fname;
      var tabName = "UW Bucky Home";
      var ret = $.ajax({
              url: "/portal/api/layout?action=addPortlet&fname=" + fname +"&tabName=" + tabName,
              type: "POST",
              data: null,
              dataType: "json",
              async: true,
              success: function (request, text){
                console.log('added successfully');
                miscService.pushGAEvent('Layout Modification', 'Add', portlet.name);
                return true;
              },
              error: function(request, text, error) {
                  console.warn('failed to add app to home.');
                  return false;
              }
          });
      
      return ret;
    };

  var getLayout = function() {
    return $http.get('/portal/api/layoutDoc?tab=UW Bucky Home').then(
      function(result) {
        return  result.data;
      } ,
      function(reason){
       miscService.redirectUser(reason.status, 'layoutDoc call');
      }
    );
  }
    
  var getApp = function(fname) {
      return $http.get('/portal/api/portlet/' +fname + '.json').then(
        function(result) {
          return  result.data;
        } ,
        function(reason){
         miscService.redirectUser(reason.status, 'getApp call');
         return reason.data;
        }
      );
  }
  var moveStuff = function moveStuffFunction(index, length, sourceId, previousNodeId, nextNodeId) {
      var insertNode = function(sourceId, previousNodeId, nextNodeId){
          var saveOrderURL = "/portal/api/layout?action=movePortletAjax"
          + "&sourceId=" + sourceId
          + "&previousNodeId=" + previousNodeId
          + "&nextNodeId=" + nextNodeId;
          console.log(saveOrderURL);
          $.ajax({
              url: saveOrderURL,
              type: "POST",
              data: null,
              dataType: "json",
              async: true,
              success: function (){
                console.log("layout move successful.");
              },
              error: function(request, text, error) {
                console.error("Error persisting move " + saveOrderURL);
              }
          });
      };
      
      insertNode(sourceId, previousNodeId, nextNodeId);
    };
    
    var getNewStuffFeed = function() {
        return $http.get('/web/samples/new-stuff.json').then(
          function(result) {
            return  result.data.stuff;
          } ,
          function(reason){
           miscService.redirectUser(reason.status, 'new stuff json feed call');
          }
        );
      }

  return {
    getLayout : getLayout,
    getApp : getApp,
    moveStuff : moveStuff,
    getNewStuffFeed : getNewStuffFeed,
    addToHome : addToHome
  }

});

})();

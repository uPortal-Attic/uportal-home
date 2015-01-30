'use strict';

(function() {
var app = angular.module('portal.layout.service', []);

app.service('sharedPortlet', function () {
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
    moveStuff : moveStuff,
    getNewStuffFeed : getNewStuffFeed
  }

});

})();

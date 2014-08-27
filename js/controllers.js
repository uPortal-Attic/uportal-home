  'use strict';
  
 (function() {
  var app = angular.module('portal.controllers', []);
  app.controller('ProfileController', [ '$http', function($http) {
  		var store = this;
  		store.user = {};
  		
  		$http.get('/profile').success(function(data) {
  			store.user = data;
  		});
  	} ]);
  
  app.controller('MainController', [ '$http', function($http) {
  	var store = this;
  	store.data = [];
  	$http.get('/portal/api/layoutDoc?tab=UW Bucky Home').success(function(data) {
  		store.data = data;
  	});
  	
  	this.removePortlet = function removePortletFunction(index, layout) {
        var portletId = layout[index].nodeId;
        $.ajax({
                url: "/portal/api/layout?action=removeElement&elementID=" + portletId,
                type: "POST",
                data: null,
                dataType: "json",
                async: true,
                success: function (request, text){
                  $('#portlet-id-'+ store.data.layout[index].nodeId).parent().fadeOut();
                  $('#portlet-id-'+ store.data.layout[index].nodeId).parent().remove();
                },
                error: function(request, text, error) {
                  //$('#up-notification').noty({text: request.response, type: 'error'});
                }
            });
      };
  	
	} ]);
  
  app.controller('MarketplaceController', [ '$http', function($http) {
  	var store = this;
  	store.data = [];
  	$http.get('/portal/api/portlets.json').success(function(data) {
  		store.data = data;
  	});
  	
	} ]);
  
  var notes = [
    {notificationId: 1, text: "test text", unread : true},
    {notificationId: 2, text: "test text 2", unread : false},
  ];
 })();
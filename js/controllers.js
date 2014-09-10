  'use strict';

 (function() {
  var app = angular.module('portal.controllers', []);

  /* Profile */

  app.controller('ProfileController', [ '$http', function($http) {
  		var store = this;
  		store.user = {};

  		$http.get('/profile').success(function(data) {
  			store.user = data;
  		});
  	} ]);


  /* Home Page */

  app.controller('MainController', [ '$http', function($http) {
  	var store = this;
  	store.data = [];
  	$http.get('/portal/api/layoutDoc?tab=UW Bucky Home').success(function(data) {
  		store.data = data;
  	});
    this.directToPortlet = function directToPortlet(url) {
      $location.path(url);
    }
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


  /* Marketplace */

  app.controller('MarketplaceController', [ '$http', function($http) {
  	var store = this;
    store.portlets = [];
    store.count = 0;

  	$http.get('/portal/api/marketplace/entries.json')
      .success(function(data) {
        store.portlets = data.portlets;
        store.count = store.portlets.length;
    	}).error(function(data) {
    });

    this.addToHome = function addToHomeFunction(index, portlet) {
      var fname = portlet.fname;
      var tabName = "UW Bucky Home";
      $.ajax({
              url: "/portal/api/layout?action=addPortlet&fname=" + fname +"&tabName=" + tabName,
              type: "POST",
              data: null,
              dataType: "json",
              async: true,
              success: function (request, text){
                $('.fname-'+fname).html('Added Successfully').prop('disabled',true).removeClass('btn-add');

              },
              error: function(request, text, error) {
                $('.fname-'+fname).parent().append('<span>Issue adding to home, please try again later</span>');
              }
          });
    };



	} ]);

  var notes = [
    {notificationId: 1, text: "test text", unread : true},
    {notificationId: 2, text: "test text 2", unread : false},
  ];


 })();

'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.misc.services', []);

  app.factory('miscService', function($http, $window, $location) {

    var redirectUser = function(status, caller) {
      if(status === 0 || status === 302) {
        //got a redirect call from shib due to session timeout or /web direct hit
        console.log("redirect happening");
        console.log(status);
        window.location.replace('/portal/Login?profile=bucky');
      } else {
        console.warn("Strange behavior from " + caller +". Returned status code : " + status);
      }
    };

    var pushPageview = function (search) {
      var path = $location.path();
      if(typeof search !== 'undefined' && search !== null) {
        path += "?q=" + search;
      }
      console.log('ga pageview logged ' + path);
      $window._gaq.push(['_trackPageview', path]);
    };

    var pushGAEvent = function(category, action, label) {
      console.log('ga event logged c:' + category + " a:" + action + " l:" + label);
      $window._gaq.push(['_trackEvent', category, action, label]);
    };

    return {
      redirectUser: redirectUser,
      pushPageview: pushPageview,
      pushGAEvent : pushGAEvent
    };

  });

  return app;

});


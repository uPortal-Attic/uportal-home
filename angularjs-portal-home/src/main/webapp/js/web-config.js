define(['angular'], function(angular) {

    var config = angular.module('web-config', []);
    config.value('SEARCH_CONFIG', [
      {
        "group" : "UW-Madison",
        "directorySearchURL" : "/web/api/wiscdirectory",
        "googleSearchURL" : "/web/api/wiscedusearch?v=1.0&rsz=10&start=0&cx=001601028090761970182:2g0iwqsnk2m",
        "webSearchURL" : "http://www.wisc.edu/search/?q=",
        "domainResultsLabel" : "Wisc.edu",
        'kbSearchURL' : 'https://kb.wisc.edu/search.php?q=',
        'eventsSearchURL' : 'https://today.wisc.edu/events/search?term=',
        'helpdeskURL' : 'https://kb.wisc.edu/helpdesk/'
      },
      {
        "group" : "UW System-River Falls",
        "directorySearchURL" : "/web/api/uwrfdirectory",
        "googleSearchURL" : "/web/api/uwrfsearch?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=10&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=432dd570d1a386253361f581254f9ca1&cx=004071655910512460416:8kmve-tofw8&googlehost=www.google.com&nocache=1456777578251&",
        "webSearchURL" : "https://www.uwrf.edu/AboutUs/SearchResults.cfm?q=",
        "domainResultsLabel" : "UWRF.edu",
        'helpdeskURL' : 'https://kb.wisc.edu/helpdesk/'
      }
    ])
    return config;
});

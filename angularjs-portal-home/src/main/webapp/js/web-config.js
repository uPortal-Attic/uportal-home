define(['angular'], function(angular) {

    var config = angular.module('web-config', []);
    config.value('SEARCH_CONFIG', [
      {
        "group" : "UW-Madison",
        "directorySearchURL" : "/web/api/wiscdirectory",
        "googleSearchURL" : "https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=filtered_cse&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=b16e3ffbc96e4526fdc0cc8394bf713a&cx=001601028090761970182:uu2tbvfp4za&&googlehost=www.google.com&alt=json&callback=google.search.Search.apiary14781&nocache=1463424027762&q=",
        "webSearchURL" : "http://www.wisc.edu/search/?q=",
        "domainResultsLabel" : "Wisc.edu",
        'kbSearchURL' : 'https://kb.wisc.edu/search.php?q=',
        'eventsSearchURL' : 'https://today.wisc.edu/events/search?term=',
        'helpdeskURL' : 'https://kb.wisc.edu/helpdesk/'
      },
      {
        "group" : "UW System-River Falls",
        "directorySearchURL" : "/web/api/uwrfdirectory",
        "googleSearchURL" : "/web/api/uwrfsearch?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=10&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=432dd570d1a386253361f581254f9ca1&cx=004071655910512460416:8kmve-tofw8&googlehost=www.google.com&nocache=1456777578251&q=",
        "webSearchURL" : "https://www.uwrf.edu/AboutUs/SearchResults.cfm?q=",
        "domainResultsLabel" : "UWRF.edu",
        'helpdeskURL' : "https://technology.uwrf.edu/TDClient/Home/"
      }
    ])
    return config;
});

/* eslint max-len: "off" */
define(['angular'], function(angular) {
    var config = angular.module('web-config', []);
    config.value('SEARCH_CONFIG', [
      {
        'group': 'UW-Madison',
        'directorySearchURL': '/web/api/proxy/wiscdirectory',
        'googleSearchURL': '/web/api/proxy/wiscedusearch?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=10&num=10&sig=b16e3ffbc96e4526fdc0cc8394bf713a&cx=001601028090761970182:uu2tbvfp4za&alt=json',
        'webSearchURL': 'http://www.wisc.edu/search/?q=',
        'domainResultsLabel': 'Wisc.edu',
        'kbSearchURL': 'https://kb.wisc.edu/search.php?q=',
        'eventsSearchURL': 'https://today.wisc.edu/events/search?term=',
        'helpdeskURL': 'https://kb.wisc.edu/helpdesk/',
      },
      {
        'group': 'UW System-River Falls',
        'directorySearchURL': '/web/api/proxy/uwrfdirectory',
        'googleSearchURL': '/web/api/proxy/uwrfsearch?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=10&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=432dd570d1a386253361f581254f9ca1&cx=004071655910512460416:8kmve-tofw8&googlehost=www.google.com&nocache=1456777578251&',
        'webSearchURL': 'https://www.uwrf.edu/AboutUs/SearchResults.cfm?q=',
        'domainResultsLabel': 'UWRF.edu',
        'eventsSearchURL': 'https://events.uwrf.edu?q=',
        'helpdeskURL': 'https://technology.uwrf.edu/TDClient/Home/',
      },
      {
        'group': 'UW System-Platteville',
        'kbSearchURL': 'https://kb.uwplatt.edu/search.php?q=',
        'helpdeskURL': 'https://kb.wisc.edu/helpdesk/',
        'googleSearchURL': '/web/api/proxy/uwplattsearch?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=10&num=10&sig=b16e3ffbc96e4526fdc0cc8394bf713a&cx=013148818429580281285:suupwg3jgw4&alt=json',
        'domainResultsLabel': 'uwplatt.edu',
      },
    ]);
    return config;
});

/* eslint max-len: "off" */
define(['angular'], function(angular) {
    return angular.module('web-config', [])
    .value('SEARCH_CONFIG', [
      {
        'group': 'UW-Madison',
        'directorySearchURL': '/aries/proxy/wiscdirectory',
        'webSearchURL': 'http://www.wisc.edu/search/?q=',
        'domainResultsLabel': 'Wisc.edu',
        'kbSearchURL': 'https://kb.wisc.edu/search.php?q=',
        'eventsSearchURL': 'https://today.wisc.edu/events/search?term=',
        'helpdeskURL': 'https://kb.wisc.edu/helpdesk/',
      },
      {
        'group': 'UW System-River Falls',
        'directorySearchURL': '/aries/proxy/uwrfdirectory',
        'webSearchURL': 'https://www.uwrf.edu/AboutUs/SearchResults.cfm?q=',
        'domainResultsLabel': 'UWRF.edu',
        'eventsSearchURL': 'https://events.uwrf.edu?q=',
        'helpdeskURL': 'https://technology.uwrf.edu/TDClient/Home/',
      },
      {
        'group': 'UW System-Platteville',
        'kbSearchURL': 'https://kb.uwplatt.edu/search.php?q=',
        'helpdeskURL': 'https://kb.wisc.edu/helpdesk/',
        'domainResultsLabel': 'uwplatt.edu',
      },
    ]);
});

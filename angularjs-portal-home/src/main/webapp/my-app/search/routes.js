define(['require'], function(require){

    return {
        search: {
            templateUrl: require.toUrl('./partials/search-results.html'),
            controller: 'SearchResultController',
            searchParam: 'initFilter',
            resolve: {
            user: function(mainService) {
              return mainService.getUser();
            }
          }
        }
    }

});

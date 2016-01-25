define(['require'], function(require){

    return {
        search: {
            templateUrl: require.toUrl('./partials/search-results.html'),
            controller: 'SearchResultController'
        }
    }

});

define(['require'], function(require){

    return {
        main: {
            templateUrl: require.toUrl('./partials/marketplace.html')
        },
        search: {
            templateUrl: require.toUrl('./partials/search-results.html')
        },
        details: {
            templateUrl: require.toUrl('./partials/marketplace-details.html')
        }
    }

});


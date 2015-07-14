define(['require'], function(require){

    return {
        main: {
            name: 'marketplace-main',
            url: '/apps',
            templateUrl: require.toUrl('./partials/marketplace.html')
        },
        details: {
            name: 'marketplace-details',
            url: '/apps/details/:fname',
            templateUrl: require.toUrl('./partials/marketplace-details.html'),
            controller:'MarketplaceDetailsController'
        },
        search: {
            name: 'marketplace-search',
            url: '/apps/search/:initFilter',
            templateUrl: require.toUrl('./partials/marketplace.html')
        }
    }

});


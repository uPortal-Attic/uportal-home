define(['require'], function(require){

    return {
        main: {
            templateUrl: require.toUrl('./partials/marketplace.html')
        },
        details: {
            templateUrl: require.toUrl('./partials/marketplace-details.html'), controller:'MarketplaceDetailsController'
        }
    }

});


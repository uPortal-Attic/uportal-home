'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.marketplace.services', []);

    app.factory('marketplaceService', ['$q', '$http','$sessionStorage', 'layoutService', 'miscService', 'mainService', function($q, $http, $sessionStorage, layoutService, miscService, mainService) {
        var marketplacePromise;
        //local variables
        var filter = "";

        //public functions

        var initialFilter = function(theFilter) {
            filter = theFilter;
        };

        var getInitialFilter = function(){
            return filter;
        };

        var checkMarketplaceCache = function() {
            var userPromise = mainService.getUser();
            return userPromise.then(function(user) {
                if ($sessionStorage.sessionKey === user.sessionKey && $sessionStorage.marketplace) {
                    return {
                        portlets : $sessionStorage.marketplace,
                        categories : $sessionStorage.categories
                    };
                }
                return null;
            });
        };

        var storeMarketplaceInCache = function(data) {
            var userPromise = mainService.getUser();
            userPromise.then(function(user) {
                $sessionStorage.sessionKey = user.sessionKey;
                $sessionStorage.marketplace = data.portlets;
                $sessionStorage.categories = data.categories;
            });
        };

        var getPortlets = function () {
            return checkMarketplaceCache().then(function(data) {
                var successFn, errorFn, defer;

                // first, check the local storage...
                if (data) {
                    defer = $q.defer();
                    defer.resolve(data);
                    return defer.promise;
                }

                // then check for outstanding requests that may have not yet been cached.

                // Downside of adding caching in getUser() is that the
                // promise in getUser blocks till we get results.  That blocks
                // the call to getMarketplace.  So, they pile up.  Then, when
                // getUser clears, all the getUser promises fire immediately.
                // They all fire so fast that the layout data doesn't make it
                // to cache between calls.  So, cache the very first promise locally.
                // Then, if the marketplace promise exists use it again.
                if (marketplacePromise) {
                    return marketplacePromise;
                }

                successFn =function(data){
                    var result = {};
                    postProcessing(result,data);
                    storeMarketplaceInCache(result);
                    return result;
                };

                errorFn = function(reason) {
                    miscService.redirectUser(reason.status, 'marketplace entries call');
                };

                // no caching...  request from the server
                marketplacePromise = $q.all([$http.get('/portal/web/marketplace/entries.json', {cache : true}), layoutService.getLayout()]).then(successFn,errorFn);
                return marketplacePromise;
            });

        };

        var getUserRating = function(fname) {
            return $http.get('/portal/web/marketplace/' + fname + '/getRating').then(function(result) {
                return result.data.rating;
            });
        };

        var saveRating = function(fname, rating) {
            $http.post('/portal/web/marketplace/' + fname + '/rating/' + rating.rating , {}, {params: {review : rating.review}}).
                success(function(data, status, headers, config){
                    console.log("successfully saved marketplace rating for " + fname + " with data " + rating);
                }).
                error(function(data, status, headers, config){
                    console.error("Failed to save marketplace rating for " + fname + " with data " + rating);
                });
        };

        //private functions

        var postProcessing = function(result, data) {

            result.portlets = data[0].data.portlets;

            var categories = [];
            var layout = data[1].layout;

            $.each(result.portlets, function (index, cur){
                //in layout check
                var inLayout = $.grep(layout, function(e) { return e.fname === cur.fname}).length;
                if(inLayout > 0) {
                    cur.hasInLayout = true;
                } else {
                    cur.hasInLayout = false;
                }

                //categories building
                var categoriesOfThisPortlet = cur.categories;

                $.each(categoriesOfThisPortlet, function(index, category){
                    if ($.inArray(category, categories) == -1) {
                        categories.push(category);
                    }
                });
            });

            result.categories = categories.sort();
            result.layout = layout;
        };

        var portletMatchesSearchTerm = function(portlet, searchTerm, opts) {
            if (!searchTerm) {
                return opts && opts.defaultReturn;
            }

            var lowerSearchTerm = searchTerm.toLowerCase(); //create local var for searchTerm

            if(portlet.title.toLowerCase().indexOf(lowerSearchTerm) !== -1) {//check title
                return true;
            }

            if (opts && opts.searchDescription) {
                //check description match
                if(portlet.description && portlet.description.toLowerCase().indexOf(lowerSearchTerm) !== -1) {
                    return true;
                }
            }

            //last ditch effort, check keywords
            if (opts && opts.searchKeywords) {
                if (portlet.keywords) {
                    for (var i = 0; i < portlet.keywords.length; i++) {
                        if (portlet.keywords[i].toLowerCase().indexOf(lowerSearchTerm) !== -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };

        var filterPortletsBySearchTerm = function(portletList, searchTerm, opts) {
            var matches;

            if (!angular.isArray(portletList)) {
                return null;
            }

            matches = [];
            angular.forEach(portletList, function(portlet) {
                if (portletMatchesSearchTerm(portlet, searchTerm, opts)) {
                    matches.push(portlet);
                }
            });

            return matches;
        };

        //return list of avaliable functions
        return {
            getPortlets: getPortlets,
            initialFilter: initialFilter,
            getInitialFilter: getInitialFilter,
            getUserRating : getUserRating,
            saveRating : saveRating,
            filterPortletsBySearchTerm: filterPortletsBySearchTerm,
            portletMatchesSearchTerm: portletMatchesSearchTerm
        };

    }]);

    return app;

});


'use strict';

define(['angular', 'jquery'], function(angular, $) {
    let app = angular.module('my-app.marketplace.services', []);

    app.factory('marketplaceService', ['$q', '$http', '$sessionStorage', 'layoutService', 'miscService', 'mainService', 'SERVICE_LOC', 'APP_FLAGS', function($q, $http, $sessionStorage, layoutService, miscService, mainService, SERVICE_LOC, APP_FLAGS) {
        let marketplacePromise;
        // local variables
        let filter = '';
        let fromSearchTerm = '';
        let fromSearchOrBrowse = '';

        // public functions

        let initialFilter = function(theFilter) {
            filter = theFilter;
        };

        let getInitialFilter = function() {
            return filter;
        };

        /**
         * Sets the information about where they came from
         */
        let setFromInfo = function(searchOrBrowse, term) {
          fromSearchTerm = term;
          fromSearchOrBrowse = searchOrBrowse;
        };
        /**
         * Gets the information about where they came from
         */
        let getFromInfo = function() {
          return {term: fromSearchTerm, searchOrBrowse: fromSearchOrBrowse};
        };

        let checkMarketplaceCache = function() {
            let userPromise = mainService.getUser();
            return userPromise.then(function(user) {
                if ($sessionStorage.sessionKey === user.sessionKey && $sessionStorage.marketplace) {
                    return {
                        portlets: $sessionStorage.marketplace,
                        categories: $sessionStorage.categories,
                    };
                }
                return null;
            });
        };

        let storeMarketplaceInCache = function(data) {
            let userPromise = mainService.getUser();
            userPromise.then(function(user) {
                $sessionStorage.sessionKey = user.sessionKey;
                $sessionStorage.marketplace = data.portlets;
                $sessionStorage.categories = data.categories;
            });
        };

        let getPortlets = function() {
            return checkMarketplaceCache().then(function(data) {
                let successFn, errorFn, defer;

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

                successFn =function(data) {
                    let result = {};
                    postProcessing(result, data);
                    storeMarketplaceInCache(result);
                    return result;
                };

                errorFn = function(reason) {
                    miscService.redirectUser(reason.status, 'marketplace entries call');
                };

                // no caching...  request from the server
                marketplacePromise = $q.all([$http.get(SERVICE_LOC.base + SERVICE_LOC.marketplace.base + SERVICE_LOC.marketplace.entries, {cache: true}), layoutService.getLayout()]).then(successFn, errorFn);
                return marketplacePromise;
            });
        };

        /**
          returns portlet if one exists in user's marketplace, or goes and gets entry from server
        **/
        let getPortlet = function(fname) {
          let successFn, errorFn, defer;
          // first check cache, if there use that (it'll be faster)
          return checkMarketplaceCache().then(function(data) {
            if (data) {
                defer = $q.defer();
                // find portlet and resolve with it if exists
                let portlets = $.grep(data.portlets, function(e) {
 return e.fname === fname;});
                let portlet = portlets ? portlets[0] : null;
                defer.resolve(portlet);
                return defer.promise;
            } else {
              successFn =function(data) {
                let portlet = data[0].data.entry;
                if(portlet) {
                  let layout = data[1];
                  processInLayout(portlet, layout);
                }
                return portlet;
              };

              errorFn = function(reason) {
                miscService.redirectUser(reason.status, 'marketplace entry service call');
              };

              return $q.all([$http.get(SERVICE_LOC.base + SERVICE_LOC.marketplace.base + SERVICE_LOC.marketplace.entry + fname + '.json', {cache: true}), layoutService.getLayout()]).then(successFn, errorFn);
            }
          });
        };

        let getUserRating = function(fname) {
            return $http.get(SERVICE_LOC.base + SERVICE_LOC.marketplace.base + fname + '/getRating').then(function(result) {
                return result.data.rating;
            });
        };

        let saveRating = function(fname, rating) {
            return $http.post(SERVICE_LOC.base + SERVICE_LOC.marketplace.base + fname + '/rating/' + rating.rating, {}, {params: {review: rating.review}}).
                success(function(data, status, headers, config) {
                  if(APP_FLAGS.debug) {
                    console.log('successfully saved marketplace rating for ' + fname + ' with data ' + rating);
                  }
                  return data;
                }).
                error(function(data, status, headers, config) {
                  if(APP_FLAGS.debug) {
                    console.error('Failed to save marketplace rating for ' + fname + ' with data ' + rating);
                  }
                  return data;
                });
        };

        // private functions

        var processInLayout = function(portlet, layout) {
          let inLayout = $.grep(layout, function(e) {
 return e.fname === portlet.fname
}).length;
          if (inLayout > 0) {
              portlet.hasInLayout = true;
          } else {
              portlet.hasInLayout = false;
          }
        };

        var postProcessing = function(result, data) {
            result.portlets = data[0].data.portlets;

            let categories = [];
            let layout = data[1].layout;


            $.each(result.portlets, function(index, cur) {
                // in layout check
                processInLayout(cur, layout);

                // categories building
                let categoriesOfThisPortlet = cur.categories;

                $.each(categoriesOfThisPortlet, function(index, category) {
                    if ($.inArray(category, categories) == -1 && cur.canAdd == true) {
                        categories.push(category);
                    }
                });
            });

            result.categories = categories.sort();
            result.layout = layout;
        };

        let portletMatchesSearchTerm = function(portlet, searchTerm, opts) {
            if (!searchTerm) {
                return opts && opts.defaultReturn;
            }

            let lowerSearchTerm = searchTerm.toLowerCase(); // create local var for searchTerm

            if(portlet.title.toLowerCase().indexOf(lowerSearchTerm) !== -1) {// check title
                return true;
            }

            if (opts && opts.searchDescription) {
                // check description match
                if(portlet.description && portlet.description.toLowerCase().indexOf(lowerSearchTerm) !== -1) {
                    return true;
                }
            }

            // last ditch effort, check keywords
            if (opts && opts.searchKeywords) {
                if (portlet.keywords) {
                    for (let i = 0; i < portlet.keywords.length; i++) {
                        if (portlet.keywords[i].toLowerCase().indexOf(lowerSearchTerm) !== -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };

        let filterPortletsBySearchTerm = function(portletList, searchTerm, opts) {
            let matches;

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

        let getAllRatings = function(fname) {
          return $http.get(SERVICE_LOC.base + SERVICE_LOC.marketplace.base + fname + '/ratings').then(function(result) {
              return result.data.ratings;
          });
        };

        // return list of avaliable functions
        return {
            getPortlet: getPortlet,
            getPortlets: getPortlets,
            initialFilter: initialFilter,
            getInitialFilter: getInitialFilter,
            getUserRating: getUserRating,
            saveRating: saveRating,
            getAllRatings: getAllRatings,
            filterPortletsBySearchTerm: filterPortletsBySearchTerm,
            portletMatchesSearchTerm: portletMatchesSearchTerm,
            setFromInfo: setFromInfo,
            getFromInfo: getFromInfo,
        };
    }]);

    return app;
});

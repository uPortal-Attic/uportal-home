'use strict';

define(['angular', 'jquery'], function(angular, $) {
    return angular.module('my-app.marketplace.services', [])

    .factory('marketplaceService',
      ['$q', '$http', '$sessionStorage', 'layoutService', '$log',
      'miscService', 'mainService', 'SERVICE_LOC', 'APP_FLAGS',
      function($q, $http, $sessionStorage, layoutService, $log,
          miscService, mainService, SERVICE_LOC, APP_FLAGS) {
        var marketplacePromise;
        // local variables
        var filter = '';
        var fromSearchTerm = '';
        var fromSearchOrBrowse = '';

        // public functions

        var initialFilter = function(theFilter) {
            filter = theFilter;
        };

        var getInitialFilter = function() {
            return filter;
        };

        /**
         * Sets the information about where they came from
         */
        var setFromInfo = function(searchOrBrowse, term) {
          fromSearchTerm = term;
          fromSearchOrBrowse = searchOrBrowse;
        };
        /**
         * Gets the information about where they came from
         */
        var getFromInfo = function() {
          return {term: fromSearchTerm, searchOrBrowse: fromSearchOrBrowse};
        };

        var checkMarketplaceCache = function() {
            var userPromise = mainService.getUser();
            return userPromise.then(function(user) {
                if ($sessionStorage.sessionKey === user.sessionKey &&
                    $sessionStorage.marketplace) {
                  return {
                      portlets: $sessionStorage.marketplace,
                      categories: $sessionStorage.categories,
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
                return user;
            }).catch(function() {
              $log.warn('Could not getUser');
            });
        };

        var getPortlets = function() {
            return checkMarketplaceCache().then(function(data) {
                var successFn;
                var errorFn;
                var defer;

                // first, check the local storage...
                if (data) {
                    defer = $q.defer();
                    defer.resolve(data);
                    return defer.promise;
                }

                // check for outstanding requests that have not yet been cached.

                // Downside of adding caching in getUser() is that the
                // promise in getUser blocks till we get results.  That blocks
                // the call to getMarketplace.  So, they pile up.  Then, when
                // getUser clears, all the getUser promises fire immediately.
                // They all fire so fast that the layout data doesn't make it
                // to cache between calls.
                // So, cache the very first promise locally.
                // Then, if the marketplace promise exists use it again.
                if (marketplacePromise) {
                    return marketplacePromise;
                }

                successFn =function(data) {
                    var result = {};
                    postProcessing(result, data);
                    storeMarketplaceInCache(result);
                    return result;
                };

                errorFn = function(reason) {
                  miscService.redirectUser(
                    reason.status,
                    'marketplace entries call'
                  );
                };

                // no caching...  request from the server
                marketplacePromise = $q.all([$http.get(
                    SERVICE_LOC.base + SERVICE_LOC.marketplace.base +
                    SERVICE_LOC.marketplace.entries, {cache: true}),
                  layoutService.getLayout()]).then(successFn, errorFn);
                return marketplacePromise;
            });
        };

        /**
         *  returns portlet if one exists in user's marketplace,
         *  or goes and gets entry from server
         */
        var getPortlet = function(fname) {
          var successFn;
          var errorFn;
          var defer;
          // first check cache, if there use that (it'll be faster)
          return checkMarketplaceCache().then(function(data) {
            if (data) {
                defer = $q.defer();
                // find portlet and resolve with it if exists
                var portlets = $.grep(data.portlets, function(e) {
                  return e.fname === fname;
                });
                var portlet = portlets ? portlets[0] : null;
                defer.resolve(portlet);
                return defer.promise;
            } else {
              successFn =function(data) {
                var portlet = data[0].data.entry;
                if (portlet) {
                  var layout = data[1];
                  processInLayout(portlet, layout);
                }
                return portlet;
              };

              errorFn = function(reason) {
                miscService.redirectUser(
                  reason.status,
                  'marketplace entry service call'
                );
              };

              return $q.all(
                  [$http.get(
                    SERVICE_LOC.base + SERVICE_LOC.marketplace.base +
                    SERVICE_LOC.marketplace.entry + fname + '.json',
                    {cache: true}),
                  layoutService.getLayout()])
                .then(successFn, errorFn);
            }
          });
        };

        var getUserRating = function(fname) {
            return $http.get(SERVICE_LOC.base + SERVICE_LOC.marketplace.base +
                fname + '/getRating')
              .then(function(result) {
                return result.data.rating;
              });
        };

        var saveRating = function(fname, rating) {
          return $http.post(
              SERVICE_LOC.base + SERVICE_LOC.marketplace.base + fname +
                '/rating/' + rating.rating,
              {},
              {params: {review: rating.review}})
            .success(function(data, status, headers, config) {
              if (APP_FLAGS.debug) {
                $log.log('successfully saved marketplace rating for ' +
                  fname + ' with data ' + rating);
              }
              return data;
            })
            .error(function(data, status, headers, config) {
              if (APP_FLAGS.debug) {
                $log.error('Failed to save marketplace rating for ' +
                  fname + ' with data ' + rating);
              }
              return data;
            });
        };

        // private functions

        var processInLayout = function(portlet, layout) {
          var inLayout = $.grep(layout, function(e) {
            return e.fname === portlet.fname;
          }).length;
          if (inLayout > 0) {
            portlet.hasInLayout = true;
          } else {
            portlet.hasInLayout = false;
          }
        };

        var postProcessing = function(result, data) {
            result.portlets = data[0].data.portlets;

            var categories = [];
            var layout = data[1].layout;


            $.each(result.portlets, function(index, cur) {
                // in layout check
                processInLayout(cur, layout);

                // categories building
                var categoriesOfThisPortlet = cur.categories;

                $.each(categoriesOfThisPortlet, function(index, category) {
                    if ($.inArray(category, categories) == -1 &&
                        cur.canAdd == true) {
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

          // create local var for searchTerm
          var lowerSearchTerm = searchTerm.toLowerCase();

          // check title
          if (portlet.title.toLowerCase().indexOf(lowerSearchTerm) !== -1) {
            return true;
          }

          if (opts && opts.searchDescription) {
            var desc = portlet.description;
            // check description match
            if (desc &&
                desc.toLowerCase().indexOf(lowerSearchTerm) !== -1) {
              return true;
            }
          }

          // last ditch effort, check keywords
          if (opts && opts.searchKeywords) {
            var keys = portlet.keywords;
            if (keys) {
              for (var i = 0; i < keys.length; i++) {
                if (keys[i].toLowerCase().indexOf(lowerSearchTerm) !== -1) {
                    return true;
                }
              }
            }
          }
          return false;
        };

        var filterPortletsBySearchTerm =
          function(portletList, searchTerm, opts) {
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

        var getAllRatings = function(fname) {
          return $http.get(
              SERVICE_LOC.base +
              SERVICE_LOC.marketplace.base + fname +
              '/ratings')
            .then(function(result) {
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
});

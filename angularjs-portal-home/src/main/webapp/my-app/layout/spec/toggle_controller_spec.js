'use strict';
define(['angular-mocks', 'portal', 'my-app'], function() {
    describe('ToggleController', function() {
      let scope;
      let controller;
      let $localStorage;
      let $location;
      let miscService;
      let APP_FLAGS;
      let currentPath;
      let gaPageViewHits;


      // load the marketplace controller
      beforeEach(function() {
        module('portal');
        module('my-app');
      });

      beforeEach(inject(function(_$rootScope_, $controller, _$localStorage_, _APP_FLAGS_) {
        scope = _$rootScope_.$new();
        $localStorage = _$localStorage_;
        APP_FLAGS = _APP_FLAGS_;
        currentPath = '/';
        gaPageViewHits = 0;
        $location = {
            'path': function(newPath) {
                if(newPath) {
                    currentPath = newPath;
                } else {
                    return path;
                }
            },
            'url': function() {
                return currentPath;
            },
        };

        miscService = {
                        'pushPageview': function() {
 gaPageViewHits++; console.log($location.url()); return;
},
                        'pushGAEvent': function() {
 return;
},
                      };

        controller = $controller('ToggleController', {'$localStorage': $localStorage,
                                                      '$scope': scope,
                                                      '$location': $location,
                                                      'miscService': miscService,
                                                      'APP_FLAGS': APP_FLAGS,
                                                      });
      }));

      it('should have toggle set', function() {
          expect(scope.toggle).toBeTruthy();
      });

      it('should switch to default if layoutMode is set to something weird', function() {
          $localStorage.layoutMode = 'fishy'; // basically not list or widgets
          controller.init();

          // verify it was reset properly
          expect($localStorage.layoutMode === APP_FLAGS.defaultView);
      });

      it('should redirect if you go somewhere you are not supposed to be.', function() {
          // setup
          $location.path('/expanded');
          $localStorage.layoutMode = 'compact';
          // execute init
          controller.init();

          expect($location.url()).toBe('/compact');
      });

      it('should redirect you if you switch modes and have a new layoutMode', function() {
        // setup
        $location.path('/expanded');
        controller.init();

        // switch!
        scope.switchMode('compact');
        controller.init();

        // validate
        expect($localStorage.layoutMode).toBe('compact');
        expect($location.url()).toBe('/compact');
      });

      it('should only have page hits if it didn\'t redirect', function() {
        // setup
        gaPageViewHits = 0;
        $localStorage.layoutMode = 'expanded';
        $location.path('/compact');
        controller.init();

        // verify redirect happened
        expect($location.url()).toBe('/expanded');
        controller.init();// fire again due to redirect
      });
    });
});

'use strict';
define(['angular-mocks', 'portal'], function() {
    describe('MainController', function() {
        var scope;
        var controller;
        var $localStorage;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function($rootScope, $controller, _$localStorage_) {
          scope = $rootScope.$new();
          $localStorage = _$localStorage_;
          controller = $controller('MainController', {'$localStorage' : $localStorage, '$scope': scope});
        }));

        it("should set storage in scope", function() {
            expect(scope.$storage).not.toBeNull();
        });

        it("should have a default of showing the sidebar", function() {
            expect(scope.$storage.showSidebar).toBeTruthy();
        });

        it("should have an app name defined", function() {
            expect(scope.NAMES.title).not.toBeNull();
        });
    });
});

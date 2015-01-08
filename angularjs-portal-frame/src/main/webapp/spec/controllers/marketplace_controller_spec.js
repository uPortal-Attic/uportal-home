


/* This tests that the Marketplace has exactly 17 categories */

describe("MarketplaceController", function() {
  var scope;
  var controller;

  // load the marketplace controller
  beforeEach(function() {
    module('portal.marketplace.controller');
    module('ngRoute');
    module('portal.marketplace.service');
    module('portal.misc.service');
    module('ui.bootstrap');
  });

  describe("Marketplace", function() {
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('MarketplaceController', {'$scope': scope});
    }));
    it("should have 17 categories", function() {
      expect(scope.categories.length).toBe(17);
    });

  });
});

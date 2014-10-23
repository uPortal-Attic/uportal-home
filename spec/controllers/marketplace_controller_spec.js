


/* This is a working sample test that checks whether
a variable in the HeaderController scope is correct */

describe("Example Test", function() {
  var scope;
  var controller;

  // load the main controllers module
  beforeEach(function() {
    module('portal.main.controllers');
  });

  describe("Testing", function() {
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('HeaderController', {'$scope': scope});
    }));
    it("that the scope variable greets me", function() {
      expect(scope.test).toBe('hi myuw');
    });

  });
});

// describe("MarketplaceController", function() {
//   var scope;
//   var controller;
//
//   // load the marketplace controller
//   beforeEach(function() {
//     // module('portal.marketplace.controller');
//     module('portal.marketplace.controller');
//   });
//
//   describe("Marketplace", function() {
//     beforeEach(inject(function($rootScope, $controller) {
//       scope = $rootScope.$new();
//       controller = $controller('MarketplaceController', {'$scope': scope});
//     }));
//     it("should have 17 categories", function() {
//       expect(scope.categories.length).toBe(17);
//     });
//
//   });
// });

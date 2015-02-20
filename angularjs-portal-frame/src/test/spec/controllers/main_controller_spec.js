

describe("MainController", function() {
  var scope;
  var controller;
  var $localStorage;

  // load the marketplace controller
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
  
  it("should set your default view to list", function(){
      expect(scope.$storage.view).toBe('list');
  });
});

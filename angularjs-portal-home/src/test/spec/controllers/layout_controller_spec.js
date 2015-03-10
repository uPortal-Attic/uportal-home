

describe("LayoutController", function() {
  var scope;
  var controller;
  var $localStorage;
  var $location;
  var $sessionStorage;
  var rootScope;
  var layoutService;
  var miscService;
  var sharedPortletService;
  
  var q;
  var deferred;

  // load the marketplace controller
  beforeEach(function() {
    module('portal');
  });
  
  beforeEach(inject(function(_$rootScope_, $controller, _$localStorage_, _$sessionStorage_, $location, $q, _APP_FLAGS_) {
    q = $q;
    scope = _$rootScope_.$new();
    rootScope = _$rootScope_;
    $localStorage = _$localStorage_;
    $sessionStorage = _$sessionStorage_;
    layoutService = {
            'getLayout' : function() {
                 deferred = q.defer();
                 return deferred.promise;

            }
    };
    miscService = { 
            'pushPageview' : function() {
                return;
            }
    };
    sharedPortletService = {};
    controller = $controller('LayoutController', {'$localStorage' : $localStorage, 
                                                  '$scope': scope,
                                                  '$rootScope': rootScope,
                                                  '$location' : $location,
                                                  '$sessionStorage' : $sessionStorage,
                                                  'layoutService' : layoutService,
                                                  'miscService' : miscService,
                                                  'sharedPortletService' : sharedPortletService,
                                                  'APP_FLAGS' : _APP_FLAGS_
                                                  });
  }));
  
  it("should set layout to something not null", function() {
      expect(scope.layout).toBeTruthy();
  });
  
  it("should set layoutEmpty to false initially", function() {
      expect(scope.layoutEmpty).toBe(false);
  });
  
  it("should set layoutEmpty to true after return empty layout", function() {
      scope.$apply(function(){
          deferred.resolve({"layout" : []});
      });
      expect(scope.layoutEmpty).toBe(true);
  });
  
  it("should set layoutEmpty to false after return non empty layout", function() {
      scope.$apply(function(){
          deferred.resolve({"layout" : [{"fake" : true}]});
      });
      expect(scope.layoutEmpty).toBe(false);
  });
});

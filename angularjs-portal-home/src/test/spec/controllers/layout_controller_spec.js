

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
  
  it("should set scope.toggle", function() {
      expect(scope.toggle).not.toBeNull();
    });
});

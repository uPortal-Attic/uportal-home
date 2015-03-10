
(function() {
angular.module('app-config', [])
.constant('APP_FLAGS', {
                          'enableToggle': true,
                          'defaultView' : 'list',
                          'list' : true,
                          'widgets' : true
                       }
          )
.constant('SERVICE_LOC', {
                           'sessionInfo' : '/portal/web/session.json',
                           'sidebarInfo' : '/web/samples/sidebar.json'
                       });

})();

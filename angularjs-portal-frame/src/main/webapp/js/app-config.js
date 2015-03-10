
(function() {
angular.module('app-config', [])
.constant('APP_FLAGS', {
                          'enableToggle': true,
                          'default' : 'list',
                          'list' : true,
                          'widget' : true
                       }
          )
.constant('SERVICE_LOC', {
                           'sessionInfo' : '/portal/web/session.json',
                           'sidebarInfo' : '/web/samples/sidebar.json'
                       });

})();

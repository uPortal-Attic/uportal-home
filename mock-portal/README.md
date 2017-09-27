Howdy, here are some suggestions on how you can best use the mock-portal instance.

### Configure for guest

Change your `app-config.js` like this:

```diff
@@ -16,18 +16,18 @@ define(['angular'], function(angular) {
         })
         .constant('SERVICE_LOC', {
             'aboutURL' : '/portal/web/session.json',
-            'sessionInfo' : '/portal/web/session.json',
+            'sessionInfo' : '/portal/web/guest-session.json',
             'sidebarInfo' : '/web/staticFeeds/sidebar.json',
             'featuresInfo' : '/web/staticFeeds/features.json',
             'newstuffInfo': '/web/staticFeeds/new-stuff.json',
             'context'     : '/portal/',
             'base'        : '/portal/web/',
-            'layout'      : 'layoutDoc?tab=UW Bucky Home',
+            'layout'      : 'layoutDocGuest.json',
             'layoutTab' : 'UW Bucky Home',
             'marketplace' : {
                 'base' : 'marketplace/',
                 'entry' : 'entry/',
-                'entries' : 'entries.json'
+                'entries' : 'entries-guest.json'
             },
```

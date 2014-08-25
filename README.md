# Portal with Angular

### What is this?
This is an angular approach to the dashboard view of uPortal. This dashboard will work along side uPortal, more of a companion app. It utilizes the uPortal rest APIs to collect layout info. It pulls notifications from the notification portlet resource URL.

### To Build
* Create directory in tomcat/webapps (suggest calling it angular). This must be the same tomcat instance as uPortal (unless you have Apache setup).
* Put all files in this directory

### To Run
* Startup a uPortal instance
* Login to said uPortal instance, ei: `my.wisc.edu/portal`
* Change url to /angular, ei: `my.wisc.edu/angular`

### Assumptions
* Your end point of portal is /portal.
* You utilize notification portlet

### Suggestions
* Change your default page to be /angular, change to LoginController.java, around line 110
* Change all home page links to point at /angular
* the iconUrl is an actual URL.
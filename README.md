# Portal with Angular

### What is this?
This is an angular approach to the dashboard view of uPortal. This dashboard will work along side uPortal, more of a companion app. It utilizes the uPortal rest APIs to collect layout info. It pulls notifications from the notification portlet resource URL.

### To Build
* Create directory in tomcat/webapps (suggest calling it angular). This must be the same tomcat instance as uPortal (unless you have Apache setup).
* Put all files in this directory

### To Run
* Startup a uPortal instance
* Login to said uPortal instance, ei: `my.wisc.edu/portal`
* Change url to /<whatever you named the directory in /webapps>, ei: `my.wisc.edu/web`

### Assumptions
* Your end point of portal is /portal.
* You utilize notification portlet

### Suggestions
* Change your default page to be /angular, change to LoginController.java, around line 110
* Change all home page links to point at /angular
* the iconUrl is an actual URL.

### Auto deploy setup
We added in support to deploy the artifact to tomcat using maven. To setup add a server to your .m2/settings.xml for tomcat. Example:
```xml
<server>
   <id>TomcatServer</id>
   <username>user</username>
   <password>password</password>
</server>

```
The id is important here. Then add that user/pass combo to your $TOMCAT_HOME/conf/tomcat-users.xml, example:
```xml
<user username="user" password="password" roles="manager-script"/>

```
The role of `manager-script` gives them the ability to use the `/text` api from tomcat.

Read more about that here: http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/plugin-info.html

With this you can run `mvn tomcat7:deploy` or better yet `mvn tomcat7:redeploy`



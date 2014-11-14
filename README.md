# Portal with Angular

### What is this?
This is an angular approach to the dashboard view of uPortal. This dashboard will work along side uPortal, more of a companion app. It utilizes the uPortal rest APIs to collect layout info. It pulls notifications from the notification portlet resource URL.

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



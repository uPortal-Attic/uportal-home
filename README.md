# Portal with Angular

[![Join the chat at https://gitter.im/UW-Madison-DoIT/angularjs-portal](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/UW-Madison-DoIT/angularjs-portal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal.svg)](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal)

[![alt](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=tgb1ssv37wjnblun)

### What is this?
This is an angular approach to the dashboard view of uPortal. This dashboard will work along side uPortal, more of a companion app. It utilizes the uPortal rest APIs to collect layout info. It pulls notifications from the notification portlet resource URL.

### Building
`mvn package` from the root directory.

### Modules

#### Frame
The frame is your starting point for a new application.  This has the MyUW header and sidebar. It does still rely on /portal to be in the same container for the session information (name, server, etc...).  If you want to run outside the container just remove those two dependencies and fix the URL's in the side-bar-left.html.

To deploy the frame build from the base directory described above. Then `cd ./angularjs-portal-frame` and run `mvn tomcat7:redeploy` (assuming you have auto deploy configured).  The frame will now be deployed to /frame.

#### Home
This is the MyUW home page. It uses the frame as a base then adds in the layout, marketplace, and features pages.

To deploy the home build from the base directory described above. Then `cd ./angularjs-portal-home` and run `mvn tomcat7:redeploy` (assuming you have auto deploy configured).  The home will now be deployed to `/web`.

### Running
To run Frame or Home in isolation with the jetty-maven plugin, run `mvn jetty:run` or `mvn jetty:run-war` from the submodule directory.

### Auto deploy setup
We added in support to deploy the artifact to tomcat using maven. To setup add a server to your .m2/settings.xml for tomcat. Example:
```xml
<server>
   <id>TomcatServer</id>
   <username>user</username>
   <password>password</password>
</server>

```
The id is important here. Then add that user/pass combo to your $TOMCAT_HOME/conf/tomcat-users.xml. Also be sure you have a role of manager listed. Example:
```xml
<role rolename="manager"/>
<user username="user" password="password" roles="manager-script"/>

```
The role of `manager-script` gives them the ability to use the `/text` api from tomcat.

Read more about that here: http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/plugin-info.html

With this you can run `mvn tomcat7:deploy` or `mvn tomcat7:redeploy` if you have already deployed it once.

### Codenvy Setup

+ Create a codenvy account (codenvy.com)
+ Click [![alt](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=tgb1ssv37wjnblun) and clone the codenvy project.
+ Run The `Multinode-tc7-j7` runner. (upper right corner). This should be the default runner for the project. (Note that it defaults to the root node, so you have to add in /web or /frame to the URL to get to those sub projects)

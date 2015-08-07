# Portal with Angular

[![Join the chat at https://gitter.im/UW-Madison-DoIT/angularjs-portal](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/UW-Madison-DoIT/angularjs-portal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal.svg)](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal)

[![alt](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=tgb1ssv37wjnblun)

### What is this?
This is an angular approach to the dashboard view of uPortal. This dashboard will work along side uPortal, more of a companion app. It utilizes the uPortal rest APIs to collect layout info. It pulls notifications from the notification portlet resource URL.

#### Resources for understanding what you can do with `angularjs-portal`:

 * [MyUW Introduction YouTube video](https://www.youtube.com/watch?v=4kM9pPnH_hA)
 * [MyUW KnowledgeBase](https://kb.wisc.edu/myuw/)

### Building

First, copy

```
angularjs-portal/angularjs-portal-home/src/main/resources/endpoint.properties.example
```

to

```
angularjs-portal/angularjs-portal-home/src/main/resources/endpoint.properties
```

so that the `/web` war file you are packaging includes an `endpoint.properties` file, so that the
 `/web` Spring application context can initialize successfully.
 
You do not have to actually set any properties in that properties file to achieve basic 
workingness ; it might be simplest if you did not.

Once the source is ready to build by your having provided a suitable `endpoint.properties`, run

`mvn clean package` from the root directory to build the war files.

### Modules

#### Frame
The frame is your starting point for a new application.  This has the MyUW header and sidebar. It does still rely on /portal to be in the same container for the session information (name, server, etc...).  If you want to run outside the container just remove those two dependencies and fix the URL's in the side-bar-left.html.

To deploy the frame build from the base directory described above. Then `cd ./angularjs-portal-frame` and run `mvn tomcat7:redeploy` (assuming you have auto deploy configured).  The frame will now be deployed to /frame.

#### Home
This is the MyUW home page. It uses the frame as a base then adds in the layout, marketplace, and features pages.

To deploy the home build from the base directory described above. Then `cd ./angularjs-portal-home` and run `mvn tomcat7:redeploy` (assuming you have auto deploy configured).  The home will now be deployed to `/web`.

### Running Mock
To run simply type `mvn jetty:run` from the root directory. By default jetty runs on port 8080.

### Deploying to Local Instance
We added in support to deploy the artifact to tomcat using maven. To setup add a server to your .m2/settings.xml for tomcat. Example:
```xml
<server>
   <id>TomcatServer</id>
   <username>user</username>
   <password>password</password>
</server>

```
The id of `TomcatServer` is important here. Add that user/pass combo to your `$TOMCAT_HOME/conf/tomcat-users.xml`. Also be sure you have a role of manager listed. 

Example:
```xml
<role rolename="manager"/>
<user username="user" password="password" roles="manager-script"/>

```
The role of `manager-script` gives them the ability to use the `/text` api from tomcat.

Read more about that here: http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/plugin-info.html

With this you can run `mvn tomcat7:deploy` or `mvn tomcat7:redeploy` if you have already deployed it once.

### Run on Codenvy

+ Create a codenvy account (codenvy.com)
+ Click [![alt](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=tgb1ssv37wjnblun) and clone the codenvy project.
+ If the project setup wizard prompts, select a java maven project.
+ Run The `Multinode-tc7-j7` runner. (upper right corner). This should be the default runner for the project. (Note that it defaults to the root node, so you have to add in /web or /frame to the URL to get to those sub projects)

### Deploy to Remote Instance

Drop web.war in the tomcat instance that runs uportal and fire it up. Should just work.

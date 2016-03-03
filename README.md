# Portal with Angular

[![Join the chat at https://gitter.im/UW-Madison-DoIT/angularjs-portal](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/UW-Madison-DoIT/angularjs-portal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal.svg)](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal) [![Coverage Status](https://coveralls.io/repos/UW-Madison-DoIT/angularjs-portal/badge.svg?branch=master&service=github)](https://coveralls.io/github/UW-Madison-DoIT/angularjs-portal?branch=master) [![alt](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=tgb1ssv37wjnblun)

### What is this?
This is an Angular approach to the dashboard view of uPortal. This dashboard will work along side uPortal, more of a companion app. It utilizes the uPortal rest APIs to collect layout info. It pulls notifications from the notification portlet resource URL.

#### Resources for understanding what you can do with `angularjs-portal`:

 * [MyUW Overview slide deck][]
 * [MyUW Introduction YouTube video](https://www.youtube.com/watch?v=4kM9pPnH_hA)
 * [MyUW KnowledgeBase](https://kb.wisc.edu/myuw/)

### Building

+ Generate `endpoint.properties`
```shell
cp angularjs-portal/angularjs-portal-home/src/main/resources/endpoint.properties.example angularjs-portal/angularjs-portal-home/src/main/resources/endpoint.properties
```
This file contains your server side proxy configurations. See the example file for examples
+ run `mvn clean package` from the root directory to build the war files.

#### Building, Deploying, and Running with [Apereo uPortal] (https://github.com/Jasig/uPortal)
+ Download, build, and run uPortal on your server
+ Setup [autodeploy] (https://github.com/UW-Madison-DoIT/angularjs-portal/blob/master/README.md#deploying-to-a-running-local-tomcat)
+ cd to angularjs-portal root directory
+ Unix based systems, run : `./build.sh master`
+ Windows based systems, run : 
```
copy angularjs-portal-home/src/main/webapp/js/app-config.js angularjs-portal-home/src/main/webapp/js/app-config.js.bak
copy angularjs-portal-home/src/main/webapp/js/master-app-config.js angularjs-portal-home/src/main/webapp/js/app-config.js
mvn package
cd angularjs-portal-home
mvn tomcat7:deploy  #or redeploy depending if this is a consecutive run
```
+ navigate to localhost:8080/uPortal
+ Login via any user that has access to the Welcome Tab in uPortal.  If you want to use admin, you have to comment out the admin restricting part in the [welcome tab layout] (https://github.com/Jasig/uPortal/blob/master/uportal-war/src/main/data/quickstart_entities/fragment-layout/welcome-lo.fragment-layout.xml)
+ navigate to localhost:8080/web

Angularjs-portal is a different front end than the one supplied with [Apereo uPortal] (https://github.com/Jasig/uPortal).  
As of now, portlet rendering still takes place via uPortal's rendering pipeline.
The [theming] (http://uw-madison-doit.github.io/uw-frame/latest/#/md/theming) comes from the [uw-frame dependency](https://github.com/UW-Madison-DoIT/uw-frame).

University of Wisconsin styles the portal theme to look similar for a seamless transition between this webapp and the portal webapp.

### Modules

+ #### Frame
Frame was so cool it moved to [its own project](https://github.com/UW-Madison-DoIT/uw-frame).

+ #### Home
This is the MyUW home page. It uses the frame as a base then adds in the layout, marketplace (app directory), and features pages.

To deploy the home build from the base directory described above. Then `cd ./angularjs-portal-home` and run `mvn tomcat7:redeploy` (assuming you have auto deploy configured).  The home will now be deployed to `/web`.

### Running w/ Mock Data
To run simply type `mvn clean package && mvn jetty:run` from the root directory. By default jetty runs on port 8080.

### Deploying to a Running Local Tomcat
We added in support to deploy the artifact to Tomcat using Maven. To setup add a server to your .m2/settings.xml for Tomcat. Example:
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
The role of `manager-script` gives them the ability to use the `/text` api from Tomcat.

Read more about that here: http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/plugin-info.html

With this you can run `mvn tomcat7:deploy` or `mvn tomcat7:redeploy` if you have already deployed it once. We also wrote a script for this. Just run `./build.sh`

### Run on Codenvy

+ Create a Codenvy account (codenvy.com)
+ Click [![alt](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=tgb1ssv37wjnblun) and clone the Codenvy project.
+ If the project setup wizard prompts, select a Java Maven project.
+ Run the `Multinode-tc7-j7` runner. (upper right corner). This should be the default runner for the project. (Note that it defaults to the root node, so you have to add in /web or /frame to the URL to get to those sub projects.)

### Deploy to Remote Instance

Drop angularjs-portal-home/target/web.war in the Tomcat instance that runs uPortal and fire it up. Should just work.

[MyUW Overview slide deck]: http://go.wisc.edu/qwg5r1

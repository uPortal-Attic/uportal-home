# uPortal-home

Questions? [Get in touch][uportal-user@].

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal.svg)](https://travis-ci.org/UW-Madison-DoIT/angularjs-portal)
[![Coverage Status](https://coveralls.io/repos/UW-Madison-DoIT/angularjs-portal/badge.svg?branch=master&service=github)](https://coveralls.io/github/UW-Madison-DoIT/angularjs-portal?branch=master)
[![Code Climate](https://codeclimate.com/github/UW-Madison-DoIT/angularjs-portal/badges/gpa.svg)](https://codeclimate.com/github/UW-Madison-DoIT/angularjs-portal)
[![codeclimate.com Issue Count](https://codeclimate.com/github/UW-Madison-DoIT/angularjs-portal/badges/issue_count.svg)](https://codeclimate.com/github/UW-Madison-DoIT/angularjs-portal)
[![Greenkeeper badge](https://badges.greenkeeper.io/UW-Madison-DoIT/angularjs-portal.svg)](https://greenkeeper.io/)
[![uPortal ecosystem incubating badge](https://img.shields.io/badge/uPortal%20ecosystem-incubating-blue.svg)](http://uw-madison-doit.github.io/angularjs-portal/apereo-incubation.html)
[![Apereo Incubating badge](https://img.shields.io/badge/apereo-incubating-blue.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QUTEi0ybN9p9wAAAiVJREFUKM9lkstLlGEUxn%2Fv%2B31joou0GTFKyswkKrrYdaEQ4cZAy4VQUS2iqH%2BrdUSNYmK0EM3IkjaChnmZKR0dHS0vpN%2FMe97TIqfMDpzN4XkeDg8%2Fw45R1XNAu%2Fe%2BGTgAqLX2KzAQRVGytLR0jN2jqo9FZFRVvfded66KehH5oKr3dpueiMiK915FRBeXcjo9k9K5zLz%2B3Nz8EyAqX51zdwGMqp738NSonlxf36Cn7zX9b4eYX8gSBAE1Bw9wpLaW%2BL5KWluukYjH31tr71vv%2FU0LJ5xzdL3q5dmLJK7gON5wjEQizsTkFMmeXkbHxtHfD14WkbYQaFZVMzk1zfDHERrPnqGz4wZ1tYfJ5%2FPMLOYYW16ltrqKRDyOMcYATXa7PRayixSc4%2FKFRhrqjxKGIWVlZVQkqpg1pYyvR%2BTFF2s5FFprVVXBAAqq%2F7a9uPKd1NomeTX4HXfrvZ8D2F9dTSwWMjwywueJLxQKBdLfZunue0Mqt8qPyMHf0HRorR0ArtbX1Zkrly7yPNnN1EyafZUVZLJZxjNLlHc%2BIlOxly0RyktC770fDIGX3vuOMAxOt19vJQxD%2BgeHmE6liMVKuNPawlZ9DWu2hG8bW1Tuib0LgqCrCMBDEckWAVjKLetMOq2ZhQV1zulGVFAnohv5wrSq3tpNzwMR%2BSQi%2FyEnIl5Ehpxzt4t6s9McRdGpIChpM8Y3ATXbkKdEZDAIgqQxZrKo%2FQUk5F9Xr20TrQAAAABJRU5ErkJggg%3D%3D)](https://www.apereo.org/content/projects-currently-incubation)
[![We adopt Google code style](https://img.shields.io/badge/code_style-Google-green.svg?style=flat)](https://google.github.io/styleguide/)

### What is this?
This is an Angular approach to the dashboard view of uPortal. This dashboard will work along side uPortal, more of a companion app. It utilizes the uPortal rest APIs to collect layout info. It pulls notifications from the notification portlet resource URL.

"uPortal-home" is somewhere in the process of a name change from its old name, "AngularJS-Portal".

See [this project's documentation][GitHub Pages site].

#### Resources for understanding what you can do with `angularjs-portal`:

+ [MyUW Overview slide deck][]
+ [MyUW Introduction YouTube video](https://www.youtube.com/watch?v=4kM9pPnH_hA)
+ [MyUW KnowledgeBase](https://kb.wisc.edu/myuw/)

### Building

+ Generate `endpoint.properties`
```shell
cp angularjs-portal/angularjs-portal-home/src/main/resources/endpoint.properties.example angularjs-portal/angularjs-portal-home/src/main/resources/endpoint.properties
```
This file contains your server side proxy configurations. See the example file for examples
+ run `mvn clean package` from the root directory to build the war files.

#### Building, Deploying, and Running with [Apereo uPortal](https://github.com/Jasig/uPortal)

See [documentation site][GitHub Pages site].

### Modules

#### Frame
Frame was so cool it moved to [its own project](https://github.com/UW-Madison-DoIT/uw-frame).

#### Home
This is the portal home page. It uses the frame as a base then adds in the layout, app directory, and features pages.

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

Read more about how this works in [Tomcat documentation][Tomcat docs re Maven plugin].

With this you can run `mvn tomcat7:deploy` or `mvn tomcat7:redeploy` if you have already deployed it once. We also wrote a script for this. Just run `./build.sh`

### Deploy to Remote Instance

Drop angularjs-portal-home/target/web.war in the Tomcat instance that runs uPortal and fire it up. Should just work.

[MyUW Overview slide deck]: http://go.wisc.edu/qwg5r1
[Tomcat docs re Maven plugin]: http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/plugin-info.html

[GitHub Pages site]: http://uw-madison-doit.github.io/angularjs-portal/
[uportal-user@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-user

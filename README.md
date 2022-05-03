# uPortal-home

UNMAINTAINED.

[![No Maintenance Intended](https://unmaintained.tech/badge.svg)](https://unmaintained.tech/)

Developers at the University of Wisconsin had been the primary developers and maintainers of this project, 
using uPortal-home as the primary user interface for [MyUW](https://it.wisc.edu/services/myuw/).
In May 2022, the University of Wisconsin switched to building uPortal-home for use in MyUW from 
[a private repository](https://git.doit.wisc.edu/wps/myuw-service/myuw-legacy/uportal-home).

With that change, this repository is effectively unmaintained.

Questions? [Get in touch][uportal-user@].


## What is this?

`uPortal-home` is an alternative user interface for some of the most frequent
user interactions in `uPortal`, namely

+ home page
+ widgets
+ app directory
+ search
+ rendering static content
+ rendering simple Portlets

This alternative user interface is implemented using AngularJS as a client-side
in-browser experience. It relies upon uPortal (through uPortal REST APIs) and
delegates to uPortal for the user experiences that uPortal-home doesn't directly
implement or inline (so, for more complex JSR-286 Portlet experiences).

See [this project's documentation][GitHub Pages site].

### Resources for understanding what you can do with `uPortal-home`

+ [MyUW Overview slide deck][]
+ [MyUW Introduction YouTube video](https://www.youtube.com/watch?v=4kM9pPnH_hA)
+ [MyUW KnowledgeBase](https://kb.wisc.edu/myuw/)

## Building

+ Generate `endpoint.properties`

```shell
cd uportal-home
cp web/src/main/resources/endpoint.properties.example web/src/main/resources/endpoint.properties
```

This file contains your server side proxy configurations. See the example file
for examples

+ run `mvn clean package` from the root directory to build the war files.

### Building, Deploying, and Running with [Apereo uPortal](https://github.com/Jasig/uPortal)

See [documentation site][GitHub Pages site].

## Modules

### Frame

uPortal-home is a [uPortal App-Framework project](https://github.com/uPortal-Project/uportal-app-framework).

### Home

This is the portal home page. It uses the frame as a base then adds in the
layout, app directory, and features pages.

To deploy the home build from the base directory described above. Then
`cd ./web` and run `mvn tomcat7:redeploy` (assuming you have auto deploy
configured).  The home will now be deployed to `/web`.

## Running w/ Mock Data

To run simply type `mvn clean package && mvn jetty:run` from the root directory.
By default Jetty runs on port 8080.

## Deploying to a Running Local Tomcat

We added in support to deploy the artifact to Tomcat using Maven. To setup add a
server to your `.m2/settings.xml` for Tomcat. Example:

```xml
<server>
   <id>TomcatServer</id>
   <username>user</username>
   <password>password</password>
</server>

```

The id of `TomcatServer` is important here. Add that user/pass combo to your `$TOMCAT_HOME/conf/tomcat-users.xml`. Also be sure you have a role of manager
listed.

Example:

```xml
<role rolename="manager"/>
<user username="user" password="password" roles="manager-script"/>

```

The role of `manager-script` gives them the ability to use the `/text` api from
Tomcat.

Read more about how this works in
[Tomcat documentation][Tomcat docs re Maven plugin].

With this you can run `mvn tomcat7:deploy` or `mvn tomcat7:redeploy` if you have
already deployed it once. We also wrote a script for this. Just run `./build.sh`

## Deploy to Remote Instance

Drop `uportal-home/web/target/web.war` in the Tomcat instance that runs uPortal
and fire it up. Should just work.

## License

This product is licensed to you under the Apache License 2.0.

The binary distribution of this product includes binaries licensed under the
Eclipse Public License - v 1.0.


[MyUW Overview slide deck]: http://go.wisc.edu/qwg5r1
[Tomcat docs re Maven plugin]: http://tomcat.apache.org/maven-plugin-2.0/tomcat7-maven-plugin/plugin-info.html

[GitHub Pages site]: http://uportal-project.github.io/uportal-home/
[uportal-user@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-user

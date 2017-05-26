# uPortal-home and uPortal

`uPortal-home` is an alternative user experience layer for use with `uPortal`. `uPortal-home` is entirely static front end HTML/CSS/JavaScript for users to exercise in their web browsers. To be interesting, it needs to connect up with services provided by server-side components, including those in `uPortal`.

This documentation is about how to use `uPortal-home` with `uPortal`.

The uPortal project is an ecosystem of open source software products, communities, participants, and adopters. `uPortal-home` is one organism in this wider ecosystem.

## uPortal?

uPortal a software product implementing the server-side portions of an enterprise portal, with facilities for user authentication, user attribute gathering, groups and permissions, user layouts, content directory modeling, containing JSR-286 Portlets, and administrative functions over all of this.

## Getting uPortal

Clone the uPortal Git repository. This will get you the latest `master` branch code, which is the bleeding edge code that will eventually become a uPortal 5.0.0 release.

## Basic localhost demonstration

### Tomcat

You'll need a Servlet container to run uPortal. Because of uPortal's portlet container, that Servlet container probably needs to be Tomcat. Since you'll have a Tomcat anyway, we'll use that to serve up `uPortal-home` too.

So download a Tomcat distribution. Version `8.5.15` worked for me.

You'll have to configure Tomcat a bit to uPortal's needs:

#### Aside: Maybe fixing a glitch in Tomcat 8.5

I found the out of the box Tomcat 8.5.15 unstable, and that changing the connector implementation fixed the glitch.  You may not have this problem and not need to do this.

In `server.xml`, change the `protocol` of the `Connector` to `org.apache.coyote.http11.Http11Nio2Protocol`.

Before:

```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />

```

After:

```xml
<!-- <Connector port="8080" protocol="HTTP/1.1" -->
<Connector port="8080" protocol="org.apache.coyote.http11.Http11Nio2Protocol"
           connectionTimeout="20000"
           redirectPort="8443" />
```

#### Configure shared loader

uPortal needs to share libraries across webapps for its Portlet container to work.

In `catalina.properties`:

```
shared.loader=${catalina.base}/shared/lib/*.jar
```

##### Configure shared session cookies

In `context.xml`, add the `sessionCookiePath` attribute to the `Context` element, with value `"/"`.

```xml
<Context sessionCookiePath="/">
```

#### Configure bigger cache size

Add a `Resources` element to increase Tomcat's cache size to accommodate uPortal's bulk:

```xml
  <Resources cachingAllowed="true" cacheMaxSize="100000" />
</Context>
```

#### Tell uPortal source where Tomcat is

Configure uPortal `build.properties` to know where your Tomcat is.




### The server: uPortal

You're going to need a couple terminals:

#### Run the HSQL database for uPortal

In one terminal, in the root directory of your checked out uPortal codebase, run an HSQL server so that uPortal has a database to depend upon.

```
ant hsql
```

#### initportal

WARNING: `initportal` is destructive, to data in the configured database and to deployed web applications in the configured Tomcat. Only `initportal` in contexts where you really mean it.

In another terminal, in that same root directory of your checked out uPortal codebase, initialize your uPortal.

```shell
ant initportal
```

#### Start Tomcat

After uPortal downloads dependencies, builds, and deploys to Tomcat, in a third terminal or so start Tomcat.

Check it out: at `http://localhost:8080/uPortal`; you've got a uPortal.

### The client: `uPortal-home`

Now that you've got uPortal running, go ahead and stop Tomcat again.

Configure for operation against a localhost uPortal: in source `angularjs-portal-home/src/main/webapp/js/`, replace the contents of  `override.js` with the contents of `master-override.js`.

Build `uPortal-home` to a .war file with

```shell
npm install
```

and then

```shell
mvn clean package
```

Drop the resulting `angularjs-portal-home/target/web.war` in the `webapps` directory of Tomcat.

Start Tomcat again.

### The basic demo

First, log into uPortal, say as `student`.

<http://localhost:8080/uPortal>

Then, navigate to /web.

<http://localhost:8080/web>

Tada! It'll render the `uPortal-home` home page with some widgets on it.

(Currently the widgets won't work, but you'll at least see your layout. Working on getting the MyUW-local uPortal additions uPortal-home depends upon working in upstream...)

## Portlet registry as app directory

TODO.

## Widgets as portlet-definition metadata

TODO.

## uPortal-home and Portlets

TODO.

## Redirecting from uPortal to uPortal-home

TODO.

# uPortal-home and uPortal

`uPortal-home` is an alternative user experience layer for use with `uPortal`. `uPortal-home` is entirely static front end HTML/CSS/JavaScript for users to exercise in their web browsers. To be interesting, it needs to connect up with services provided by server-side components, including those in `uPortal`.

This documentation is about how to use `uPortal-home` with `uPortal`.

The uPortal project is an ecosystem of open source software products, communities, participants, and adopters. `uPortal-home` is one organism in this wider ecosystem.

## uPortal?

uPortal a software product implementing the server-side portions of an enterprise portal, with facilities for user authentication, user attribute gathering, groups and permissions, user layouts, content directory modeling, containing JSR-286 Portlets, and administrative functions over all of this.

## Getting uPortal

Clone the uPortal Git repository. This will get you the latest `master` branch code, which is the bleeding edge code that will eventually become a uPortal 5.0.0 release.

## Basic localhost demonstration

### The server: uPortal

uPortal itself should provide great documentation about how to obtain, install, implement it.

Here are some crib notes for spinning up a local demo environment:

Have a Tomcat Java Servlet Container. Tomcat should provide great documentation about... but the short version is download it, unzip it. Version `8.5.15` worked for me.

You'll have to configure Tomcat a bit to uPortal's needs:

In `catalina.properties`:

```
shared.loader=${catalina.base}/shared/lib/*.jar
```

In `context.xml`, add the `sessionCookiePath` attribute to the `Context` element, with value `"/"`.

```xml
<Context sessionCookiePath="/">
```

and add a `Resources` element to increase Tomcat's cache size to accommodate uPortal's bulk:

```xml
  <Resources cachingAllowed="true" cacheMaxSize="100000" />
</Context>
```

Configure uPortal `build.properties` to know where your Tomcat is.

You're going to need a couple terminals:

In one terminal, in the root directory of your checked out uPortal codebase, run an HSQL server so that uPortal has a database to depend upon.

```
ant hsql
```

In another terminal, in that same root directory of your checked out uPortal codebase, initialize your uPortal.

```shell
ant initportal
```

After it downloads dependencies, builds, and deploys to Tomcat, in a third terminal or so start Tomcat.

Check it out: at `http://localhost:8080/uPortal` you've got a uPortal.

### The client: `uPortal-home`

Now that you've got uPortal running, go ahead and stop Tomcat again.

Configure for operation against a localhost uPortal: in source `angularjs-portal-home/src/main/webapp/js/`, replace the contents of  `override.js` with the contents of `master-override.js`.

Build `uPortal-home` to a .war file with

```shell
mvn clean package
```


Drop `angularjs-portal-home/target/web.war` in the Tomcat instance that runs uPortal and fire it up. Should just work.




## Portlet registry as app directory



## Widgets as portlet-definition metadata



## uPortal-home and Portlets



## Redirecting from uPortal to uPortal-home

AngularJS-portal [is presently][Apereo projects currently in incubation] in [Apereo Incubation][], aspiring to be an [Apereo][] project in the [uPortal][] ecosystem.

[![Apereo Incubating badge](https://www.apereo.org/sites/default/files/Incubation%20Logos/incubating%20w-out%20logo%2015mar17.png)](https://www.apereo.org/content/projects-currently-incubation)

+ Incubation requested: [2016-11-21][incubation@ proposal]
+ Apereo Board approved for incubation: [2016-12-20][2016-12-20 Apereo Board meeting minutes]
+ Entered incubation (initial conference call): 2017-03-13.
+ Subsequent check-in calls: [2017-04-10][2017-04-10 incubation status call], [2017-05-25 at 10a NYC (scheduled)][2017-04-10 incubation status call].


## Project status vis a vis exit criteria

(See [exit criteria][]).

### 4.1 Legal

#### 4.1.1 Out-bound licensing

AngularJS-portal and uw-frame include the Apache 2 license (approved for Apereo outbound) as LICENSE, but do not include the NOTICE file intended for inclusion with Apache2-licensed products.

Next actions:

+ Add `NOTICE` file. (Requires some auditing to get its contents correct).

#### 4.1.2 License marking

+ Partial but not verified-complete license marking.
+ Poor acknowledgement of dependency or inclusion licensing.

Next actions:

+ Clean up marking source code with license
+ Automate source code header checking
+ Add NOTICE file. Audit inclusions and dependencies to get its contents right.
+ Automate `NOTICE` file checking

#### 4.1.3 Contributor License Agreements

Most major contributors have ICLAs on file.

Next actions:

+ Follow up with past Contributors to secure CLAs
+ Potentially implement cla-assistant.io with the wrinkle of it asking contributors to attest to their compliance with the external-to-CLA-assistant CLA agreement process. (Click-through assurance that demonstrated CLA agreement through more arduous process, not click-through agreement to CLA.)

#### 4.1.4 Name trademark clarity

Next actions:

+ New software product names that better reflect nature and do not infringe on others' trademarks.
+ Names should reflect uPortal commitment and represent how the product should
be used.
+ Proposed names:
  + `uw-frame` → `uPortal-app-framework`
    + The uPortal App Framework will house common functionality to be leveraged
      by uPortal Apps.
    + Institutions can provide a custom `uPortal-app-framework-config`
    + Developers can create their own uPortal Apps drawing from common
      configuration, style and functionality.
  + `angularjs-portal` → `uPortal-home`
    + uPortal Home will be a standard uPortal App that handles layout of the
      framework widgets for a cohesive user experience.
    + Developers provide `uPortal-home-config` for environment specific
      configuration.

### 4.2 Community

#### a. Level of community involvement

> What is the number of participants? What level of participation is there? What activities do participants undertake or what artifacts have they created?)


Next actions:

+ Open, public incubation status check-in conference call.
+ Move GitHub repositories to a uPortal-project context

#### b. Organization of community

> What roles are in place? Who occupies those roles? How do those roles interact among one another and with the community?

Next actions:

+ Re-commit to using Gitter.im for chat.

#### c. Operation of community

> What activities/events/artifacts are created/managed by the project to foster participation and development? How are decisions made?

Next actions:

+ Formalize recognition of committership
+ Pre-conference seminar and presentations at Open Apereo 2017.

### 4.3 Governance

No formal governance is documented.

Next actions:

+ Formalize recognition of committership
+ Formalize relationship of committership with uPortal-steering

### 4.4 Voting practices

No formal voting practices are documented.

Next actions:

+ Formalize adoption of Apache rules

### 4.5 Conflict resolution policy

No formal conflict resolution policy is in place.

Next actions:

+ Adopt a conflict resolution policy (or inherit from uPortal)

### 4.6 Release planning

Releases come together organically. They're simply the changes from the accepted Pull Requests since the prior release, with Semantic Versioning observed.

Next actions:

+ Further document release planning, beyond just release execution.
+ Further document adoption of Semantic Versioning.
+ Start looking a few more milestones out
+ Consider adopting a predictable release cadence

### 4.7 Successful release during Incubation

AngularJS-portal has had many releases.

Let's say Incubation starts for this purpose after governance and licensing is squared and the repos are moved to a uPortal-project context. Successfully releasing after those changes are in place will demonstrate that the product can still release under the new arrangements.

### 4.8 Alignment and synergy with other Apereo software products

Depends on and leverages uPortal.

Aspires to depend on and leverage more feasible microservices and hopes to evolve with uPortal itself in this direction.

Next actions:

+ Factor out app directory as a microservice
+ Factor out user layout as a microservice

### 4.9 Infrastructure

#### a. Version control

Using GitHub repositories.

Next actions:

+ Move GitHub repositories to a non-UW-Madison-specific organizational context.

#### b. Issue tracking

Intend to use GitHub issue tracking for product issue tracking.

Next actions:

+ Use GitHub issue tracking for product management in earnest. (This subset of) MyUW Scrum team user stories become references to public issue tracker issues.

#### c. Communications channels

Currently piggyback on uPortal email lists, only somewhat effectively.

Next actions:

+ Use Incubation check-in meetings, making these open meetings and drawing in would-be participants.
+ Re-commit to using Gitter for project chat.
+ Consider advocating for an Apereo Discourse instance and adopt Discourse forums in lieu of traditional email list.
+ Consider how to better fit into existing uPortal email lists, or create new lists.

#### d. Plans, directions, and objectives are readily identifiable

Long range plans don't so much exist.

Next actions:

+ Articulate product plans, directions, objectives
+ Navigate tension between product roadmapping and agile, organic discovery of product progress

#### e. Website: current and with instructions for installation, configuration

Both AngularJS-portal and uw-frame use GitHub Pages to generate documentation websites, including installation and configuration instructions. Documentation of the uPortal integration specifically is weak.

Next actions:

+ Improve documentation helping with, no seriously, how do I adopt this with a vanilla uPortal

[Apereo]: https://www.apereo.org/
[Apereo Incubation]: https://www.apereo.org/incubation
[Apereo projects currently in incubation]: https://www.apereo.org/content/projects-currently-incubation
[uPortal]: https://www.apereo.org/projects/uportal
[incubation@ proposal]: https://groups.google.com/a/apereo.org/d/msg/incubation/tPBN3-YSSPM/Xk4yghH1AwAJ
[2016-12-20 Apereo Board meeting minutes]: https://www.apereo.org/sites/default/files/meeting_minutes/2016/Apereo%20Board%20Minutes%20-%20Dec%202016%20-%20002.pdf
[2017-04-10 incubation status call]: https://groups.google.com/a/apereo.org/d/msg/uportal-user/rN76LaT-VGQ/dikxNY9wAQAJ
[exit criteria]: https://www.apereo.org/content/apereo-incubation-process#S4

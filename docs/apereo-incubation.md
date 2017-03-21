# AngularJS-portal aspires to be an Apereo project

AngularJS-portal [is presently][Apereo projects currently in incubation] in [Apereo Incubation][], aspiring to be an [Apereo][] project in the [uPortal][] ecosystem.

[![Apereo Incubating badge](https://img.shields.io/badge/apereo-incubating-blue.svg)](https://www.apereo.org/content/projects-currently-incubation)

+ Incubation requested: [2016-11-21][incubation@ proposal]
+ Apereo Board approved for incubation: [2016-12-20][2016-12-20 Apereo Board meeting minutes]
+ Entered incubation (initial conference call): 2017-03-13.

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

+ Audit for CLA completeness of contributors
+ Document CLA requirements in `CONTRIBUTING.md`
+ Potentially implement cla-assistant.io with the wrinkle of it asking contributors to attest to their compliance with the external-to-CLA-assistant CLA agreement process. (Click-through assurance that demonstrated CLA agreement through more arduous process, not click-through agreement to CLA.)

#### 4.1.4 Name trademark clarity

Next actions:

+ New software product names that better reflect nature and do not infringe on others' trademarks. Probably a functional name describing what the product is, with "uPortal" brand attached. As in "uPortal Foo Sprocket".

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
[exit criteria]: https://www.apereo.org/content/apereo-incubation-process#S4

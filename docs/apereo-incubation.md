# uPortal-home aspires to be an Apereo project

uPortal-home [is presently][Apereo projects currently in incubation] in
[Apereo Incubation][], aspiring to be an [Apereo][] project in the [uPortal][]
ecosystem.

[![Apereo Incubating badge](https://www.apereo.org/sites/default/files/Incubation%20Logos/incubating%20w-out%20logo%2015mar17.png)](https://www.apereo.org/content/projects-currently-incubation)

+ [Formal incubation record][]
+ Incubation requested: [2016-11-21][incubation@ proposal]
+ Apereo Board approved for incubation:
  [2016-12-20][2016-12-20 Apereo Board meeting minutes]
+ Entered incubation (initial conference call): 2017-03-13.
+ Subsequent check-in calls: [2017-04-10][2017-04-10 incubation status call],
  [2017-05-25][2017-05-25 incubation status call Google Group topic],
  [2017-07-11 10][2017-07-11 incubation status call]
  ([audio][2017-07-11 incubation status audio]),
  [2017-09-20][2017-09-20 incubation status call]
  ([audio][2017-09-20 incubation status call audio]),
  [2018-02-19][2018-02-19 incubation status call]
  ([audio][2018-02-19 incubation status audio]).
  **Next call Monday 2018-03-12 at 1p NYC**.
+ Open Apereo 2017 pre-conference seminar: 2017-06-04, including
  [slides about incubation][Open Apereo 2017 seminar slides re incubation].

## Summary: Project status vis a vis exit criteria

Items are checked where the project believes it now fulfills the exit criteria.

- [x] 4.1 Legal
  - [x] 4.1.1 Out-bound licensing
  - [x] 4.1.2 License marking
  - [x] 4.1.3 Contributor License Agreements
  - [x] 4.1.4 Name trademark clarity
- [ ] 4.2 Community
  - [ ] 4.2.a Level of community involvement
  - [ ] 4.2.b Organization of community
  - [ ] 4.2.c Operation of community
- [x] 4.3 Governance
- [x] 4.4 Voting practices
- [ ] 4.5 Conflict resolution policy
- [ ] 4.6 Release planning
- [x] 4.7 Successful release during incubation
- [ ] 4.8 Alignment and synergy with other Apereo software products
- [ ] 4.9 Infrastructure
  - [x] 4.9.a Version control
  - [ ] 4.9.b Issue tracking
  - [ ] 4.9.c Communication channels
  - [ ] 4.9.d Plans, directions, and objectives are readily identifiable
  - [ ] 4.9.e Website: current and with instructions for installation,
    configuration


## Detail: Project status vis a vis exit criteria

(See [exit criteria][]).

### 4.1 Legal

#### 4.1.1 Out-bound licensing

uPortal-home and uPortal-app-framework include the Apache 2 license (approved
for Apereo outbound) as LICENSE and accompanying NOTICE file acknowledging
dependencies under Apache 2 and other permitted licenses.

Next actions:

+ Stop using Maven, stop delivering a `.war`, and thereby stop having Java
dependencies and further simplify licensing posture.

#### 4.1.2 License marking

All source files are marked with the Apereo Apache2 license header.

Next actions:

+ Re-implement license header checking without relying upon Maven. Sooner or
later this project will stop using Maven.

#### 4.1.3 Contributor License Agreements

All major contributors have ICLAs on file.

Did not secure ICLA from one minor past Contributor. Deferred further worry
about this by accepting the Contributor's Contributions (if any are still
relevant) via Apache2 clause 5, as noted in `LICENSE`.

If this ever becomes a problem a careful audit might reveal that no
Contributions from this Contributor are still relevant, through the natural
turnover of modules and code within the project. In practice this is unlikely to
ever be a problem.

Next actions:

+ Potentially implement cla-assistant.io with the wrinkle of it asking
  contributors to attest to their compliance with the external-to-CLA-assistant
  CLA agreement process. (Click-through assurance that demonstrated CLA
  agreement through more arduous process, not click-through agreement to CLA.)

#### 4.1.4 Name trademark clarity

Naming considerations: Names should reflect uPortal commitment and represent how
the product should be used.

Benito Gonzalez confirmed via US Patent and Trademark search that uPortal-home
is not registered.

+ Names:
  + `uPortal-app-framework`
    + The uPortal App Framework houses common functionality to be leveraged by
      uPortal Apps.
    + TODO: Institutions can provide a custom `uPortal-app-framework-config`
    + Developers can create their own uPortal Apps drawing from common
      configuration, style and functionality.
  + `uPortal-home`
    + uPortal-home is a standard uPortal App implementing portal home page
      and other core portal user experiences (notifications, announcements,
      settings, ...)
    + TODO: Developers provide `uPortal-home-config` for environment specific
      configuration.

Next actions:

+ Add `uPortal-app-framework-config` features for institutions to provide shared
  configuration for uPortal App Framework apps. (That is, currently this is an
  envisioned sub-module name rather than a concrete thing.)
+ Add `uPortal-home-config` for institutions to provide configuration for
  uPortal-home as locally implemented. (That is, currently this is an
  envisioned sub-module name rather than a concrete thing.)

(Currently, the framework and the core product *are* configurable, but it's not
nearly as clean as envisioned.)


### 4.2 Community

#### a. Level of community involvement

> What is the number of participants? What level of participation is there? What
> activities do participants undertake or what artifacts have they created?)

+ Participants:
  + Adopters: (3)
    + Sinclair Community College
    + [Université de Bretagne Occidentale for ENT][ent.univ-brest.fr]
      ([ESUP-Days 24 presentation][] (at 1h04))
    + [University of Wisconsin-Madison][public.my.wisc.edu]
  + [Committers][]: (5)
  + [Contributors][]: (11) (not double-counting Committers)
    + 0 non-Committer Contributors in 2018

Next actions:

+ Open, public incubation status check-in conference calls. (Continuing).
+ Answer the question: what level of participation?
+ Answer the question: What activities do participants undertake or what
  artifacts have they created?

#### b. Organization of community

> What roles are in place? Who occupies those roles? How do those roles interact
> among one another and with the community?

Roles:

+ [Committers][]
+ [Contributors][]
+ Adopters

Next actions

+ Document any roles not yet listed or documented.
+ Document how the roles interact.

#### c. Operation of community

> What activities/events/artifacts are created/managed by the project to foster
> participation and development? How are decisions made?

+ [Committers][] are documented, with Apache-style governance by the Committers,
  process for adding Committers, and governance fail-safes.
+ [Contributors][] are gratefully acknowledged.
+ Pre-conference seminar and presentations about this project delivered at Open
  Apereo 2015, 2016, and 2017.
+ Incubation status calls are held as open conference calls.

Next actions

+ Answer question: what activities/events/artifacts are created/managed to
  foster participation and development?

### 4.3 Governance

+ [Committers][] are documented, with Apache-style governance by the Committers,
  process for adding Committers, and governance fail-safe falling back on
  uPortal steering.

Committers include a non-University-of-Wisconsin committer (Christian Murphy).

### 4.4 Voting practices

+ [Adopted Apache-style rules][Committers]

### 4.5 Conflict resolution policy

+ Inherits code of conduct considerations from uPortal which participates in the
  [Apereo Welcoming Policy][]. However, Apereo Welcoming Policy is not yet a
  mature code of conduct mechanism because while it states "Apereo will
  designate two Board members to receive complaints", it's not clear that Apereo
  has done so or who these "Duty Officers" are. This suggests that it might be
  unclear to a person who experiences conduct prohibited under the policy whom
  they might contact to report concerns.

No formal conflict resolution policy is in place.

Next actions:

+ Adopt a conflict resolution policy (or inherit from uPortal)
+ Advocate for maturing the Apereo Welcoming Policy to function as an adequate
  "code of conduct" for this and other Apereo projects

### 4.6 Release planning

Releases come together organically. They're the changes from the accepted Pull
Requests since the prior release, with Semantic Versioning observed.

Next actions:

+ Move product issue tracking into a public context. Currently product issue
  tracking to the extent it exists is implied from the Scrum stories on the MyUW
  product and sprint backlogs. Scrum stories and product issue tracker entries
  for bugs, features, etc. aren't the same thing.
+ Further document release planning, beyond just release execution.
+ Further document adoption of Semantic Versioning.
+ Start looking a few more milestones out
+ Consider adopting a predictable release cadence

### 4.7 Successful release during Incubation

uPortal-home has had many releases, including many during incubation after
governance and licensing squared and the repos moved to a uPortal-project
context. Successfully releasing after those changes demonstrated that the
product can still release under the Apereo arrangements.

### 4.8 Alignment and synergy with other Apereo software products

Depends on and leverages uPortal.

Aspires to depend on and leverage more feasible microservices and hopes to
evolve with uPortal itself in this direction.

Next actions:

+ Factor out app directory as a microservice
+ Factor out user layout as a microservice
+ Factor out messages (announcements and notifications) as a microservice
+ Explore relationship with nascent Edinburgh Notifications

### 4.9 Infrastructure

#### a. Version control

Using GitHub repositories in `uPortal-Project` context.

#### b. Issue tracking

Intend to use GitHub issue tracking for product issue tracking.

Next actions:

+ Use GitHub issue tracking for product management in earnest. (This subset of)
  MyUW Scrum team user stories become references to public issue tracker issues.

#### c. Communications channels

Currently piggyback on uPortal email lists, only somewhat effectively.

Next actions:

+ Use Incubation check-in meetings, making these open meetings and drawing in
  would-be participants. (Continuing).
+ Consider advocating for an Apereo Discourse instance and adopt Discourse
  forums in lieu of traditional email list.
+ Consider how to better fit into existing uPortal email lists, or create new
  lists.

#### d. Plans, directions, and objectives are readily identifiable

Long range plans don't so much exist.

cf. [roadmap][]

Next actions:

+ Articulate product plans, directions, objectives
+ Navigate tension between product roadmapping and agile, organic discovery of
  product progress

#### e. Website: current and with instructions for installation, configuration

Both uPortal-home and uPortal-app-framework use GitHub Pages to generate
documentation websites, including installation and configuration instructions.
Documentation of the uPortal integration specifically is weak.

Next actions:

+ Improve documentation helping with, no seriously, how do I adopt this with a
  vanilla uPortal

[Apereo]: https://www.apereo.org/
[Apereo Incubation]: https://www.apereo.org/incubation
[Apereo projects currently in incubation]: https://www.apereo.org/content/projects-currently-incubation
[uPortal]: https://www.apereo.org/projects/uportal
[incubation@ proposal]: https://groups.google.com/a/apereo.org/d/msg/incubation/tPBN3-YSSPM/Xk4yghH1AwAJ
[2016-12-20 Apereo Board meeting minutes]: https://www.apereo.org/sites/default/files/meeting_minutes/2016/Apereo%20Board%20Minutes%20-%20Dec%202016%20-%20002.pdf
[2017-04-10 incubation status call]: https://groups.google.com/a/apereo.org/d/msg/uportal-user/rN76LaT-VGQ/dikxNY9wAQAJ
[2017-05-25 incubation status call Google Group topic]: https://groups.google.com/a/apereo.org/d/topic/uportal-user/7CmkrP-2Dic/discussion
[2017-07-11 incubation status audio]: https://www.youtube.com/watch?v=3YPS_IWJ_tM
[2017-07-11 incubation status call]: https://docs.google.com/document/d/1LGBcsL-hg6a6kWktE4HgThjpF7idc_AwFcV4op6NLy8/edit?usp=sharing
[exit criteria]: https://www.apereo.org/content/apereo-incubation-process#S4
[Open Apereo 2017 seminar slides re incubation]: https://docs.google.com/a/wisc.edu/presentation/d/1C-xRJoXWJKObfhmGV-7KYoZmiT5EyKHcQ36JVF6sGxk/edit?usp=sharing.
[Committers]: https://github.com/uPortal-Project/uportal-home/blob/master/committers.md
[Contributors]: contributors.md
[Apereo Welcoming Policy]: https://www.apereo.org/content/apereo-welcoming-policy
[Formal incubation record]: https://apereo.oaeproject.org/content/apereo/r1jIPVNjl
[2017-09-20 incubation status call]: https://docs.google.com/document/d/10xEvhXZP6L381VBoDVkfMAoblwxVAqRQ2cuf9lUtMCI/edit?usp=sharing
[2017-09-20 incubation status call audio]: https://soundcloud.com/andrew-petro-278980355/up-home-incubation-check-in-call-2017-09-20
[2018-02-19 incubation status call]: https://docs.google.com/document/d/1K4JwXmsb1NotwSpp52R2zFxeYRQcQC5yPbPIql28ezQ/edit?usp=sharing
[2018-02-19 incubation status audio]: https://soundcloud.com/andrew-petro-278980355/2018-02-19-uportal-home-apereo-incubation-check-in
[public.my.wisc.edu]: https://public.my.wisc.edu
[ent.univ-brest.fr]: https://ent.univ-brest.fr/
[ESUP-Days 24 presentation]: https://mediasd.parisdescartes.fr/#/watch?id=NVIN4MmXdFXQ&fc=N6IFZMg4xNvV
[roadmap]: roadmap.md

# Contributing to `uPortal-home`

In short:

+ [Be kind][code of conduct].
+ All Contributors must appear in the public [Apereo CLA roster][].
+ Use [Google code style][].
+ Use [Conventional Commits][].
+ Run `npm run lint-all` locally to earlier catch what the Travis-CI continuous
  integration build is going to complain about.

However: *please do not let contribution guidance be an insurmountable barrier to your contribution.* Project participants can work with you to hone your contribution, but only if we know you're trying to contribute.

## Code of conduct

The [Apereo Welcoming Policy][] [applies][code of conduct].

## Contributor License Agreements

As an [incubating, aspiring Apereo product][uPortal-home website on incubating], `uPortal-home` requires contributors and contributions to comply with [Apereo inbound intellectual property licensing practices][].

The short version:

+ You must have submitted an [Apereo Individual Contributor License Agreement][]
+ You individually must actually appear in the [roster of registered ICLAs][Apereo CLA roster].
+ To the extent that you're working under the auspices of an employer or working on behalf of anyone or anything other than yourself individually, those entities must have submitted a [Apereo Corporate Contributor License Agreement][] naming you as an authorized contributor.
+ Those entities must actually appear in [the roster of registered CCLAs][Apereo CLA roster].

The long version:

+ [Apereo website on licensing][]
+ [Apereo website on Contributor License Agreement][]

*Please* provide feedback about how these practices impact your ability to contribute. You might voice that feedback on the [Apereo licensing discussion Google Group][] or in any other way in which you are comfortable.

## Google code style

This project adopts [Google code style][].

You can locally check for build, test, and linting ("style") errors with commands like

```shell
mvn package
mvn checkstyle:check
npm test
npm run lint-js
npm run lint-md
npm run lint-less
```

## Conventional Commits

We use [Conventional Commits][] as our commit message format. This leads to more
uniform messages in the project history.

### Type

We use [the change types Angular uses][].


### Scope

We have not yet formalized scopes. In practice scopes used so far include:

+ `changelog`
+ `ci`
+ `contributing` : guidance to contributors
+ `dependency`
+ `dependency upgrade`
+ `github`
+ `md`
+ `npm`
+ `package`
+ `presentations` : the documentation linking related presentations
+ `readme`

## Linting

The Travis-CI continual integration build continually lints the codebase.

You can run linting locally to discover earlier what Travis-CI might be
concerned about in your changes.

`npm run lint-all`

## Contribution welcome

Contribution guidance is intended to help you make the most effective contributions you can. Contribution guidance is **not intended to be a barrier to contributions, especially not to newcomer contributions.**

The [code of conduct][] is not negotiable. Please do be kind.

Everything else the project participants welcome helping you to work through in your contributions.


[uPortal-home website on incubating]: http://uportal-project.github.io/uportal-home/apereo-incubation.html
[Apereo CLA roster]: http://licensing.apereo.org/completed-clas
[Apereo Corporate Contributor License Agreement]: https://www.apereo.org/sites/default/files/Licensing%20Agreements/apereo-ccla.pdf
[Apereo inbound intellectual property licensing practices]: https://www.apereo.org/licensing/practices
[Apereo Individual Contributor License Agreement]: https://www.apereo.org/sites/default/files/Licensing%20Agreements/apereo-icla.pdf
[Apereo licensing discussion Google Group]: https://groups.google.com/a/apereo.org/forum/#!forum/licensing-discuss
[Apereo website on Contributor License Agreement]: https://www.apereo.org/licensing/agreements
[Apereo website on licensing]: https://www.apereo.org/licensing
[Apereo Welcoming Policy]: https://www.apereo.org/content/apereo-welcoming-policy
[code of conduct]: ../CODE_OF_CONDUCT.md
[Conventional Commits]: https://conventionalcommits.org/
[Google code style]: https://google.github.io/styleguide/
[the change types Angular uses]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit

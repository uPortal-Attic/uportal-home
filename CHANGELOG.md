# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][]
### Added
* Added `CHANGELOG` file with copy of release notes from [GitHub releases](https://github.com/UW-Madison-DoIT/angularjs-portal/releases).

### Changed
* Change `CHANGELOG` format to [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [6.5.0][] - 2017-05-04
### CI Enhancements
* [Cache dependencies to reduce download time in Travis CI](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/618)

### Code Style Enhancements
* [Adopts AngularJS code stylez](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/615)
* [Ignore mock folder for Lint checks](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/617)

### Apereo Incubation
* [Formalizes committers](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/619)
* [Acknowledges contributors](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/621)
* [Clarifies release procedures](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/625)

### Documentation Updates
* [Updates RSS widget documentation](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/620)
* [Updates launch button default text documentation](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/623)

### New Features
* [Portlet icon directive prefers md-icons if available](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/622)
* [Uses a new api `layout.json` to retrieve a users layout](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/624)
* [Updates to UW-Frame v4.1.0](https://github.com/UW-Madison-DoIT/uw-frame/releases/tag/uw-frame-maven-4.1.0)

## [6.4.2][] - 2017-04-13

[Upgrades to use latest 4.0.3 release of UW-Frame](https://github.com/UW-Madison-DoIT/uw-frame/releases/tag/uw-frame-maven-4.0.3)

## [6.4.1][] - 2017-04-13

[Adds back in compact mode for user's layouts](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/614)
[Upgrades to the latest App Framework 4.0.2](https://github.com/UW-Madison-DoIT/uw-frame)

## [6.4.0][] - 2017-04-13

Release 6.4.0 Adds thoughtful automation tools.  Style checkers were added and our Travis CI integration (is that word redundant) is back and working once more.  Continued progress in Apereo Incubation was well as bug fixes and routine maintenance, including upgrading to the latest [App Framework version 4.0.1](https://github.com/UW-Madison-DoIT/uw-frame/releases/tag/uw-frame-maven-4.0.1).

### Automate Testing and Checking of Styles
* [Fix Karma with Travis CI](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/597)
* [Fix Lint errors for Travis CI](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/601)
* [Remove duplicated Travis CI install scripts](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/602)
* [Automatically ban ES6+ syntax from application for continue IE support](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/603)
* [Add ability to automatically link check files before committing](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/605)

### Apereo Incubation Progress
* [Guide contributors to Apereo ICLA compliance via a contributors.md and pull request template](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/592)
* [Add uPortal ecosystem incubating badges](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/598)
* [Announce name transitions for incubation](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/609)

### Bug Fixes
* [Update markdown file link syntax](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/600)
* [Fix missing ratings in search results](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/606)
* [Fix bug when showing 0 search results](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/606)
* [Adds back widget styling that was removed in the App Framework upgrade](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/613)

### Maintenance
* [Remove defunct app entry in mock data feeds](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/610)
* [Add function documentation and removes a code TODO](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/611)
* [Upgrade to the latest App Framework](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/612)

## [6.3.0][] - 2017-03-21

### Apereo Incubation Work
* [Documents Apereo Incubation Status](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/581)
* [Cleans up Apereo Incubation badge](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/593)

### Code Cleanup
* [Refactors Widget Types](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/580)
  * [Widget Documentation](http://uw-madison-doit.github.io/angularjs-portal/widgets.html) stating that custom widgets will be typed as `custom`.  Listing custom widget types as `generic` still works for backwards compatibility.
* [Adds Google code style check](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/583)
* [Configures TravisCI to use multiple JDK's](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/584)
* [Updates license in package.json to Apache 2.0](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/585/files)
* [Adds ESLint to repository](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/586)
* [Adds remark-lint to repository](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/588/files)
* [Adds styelint to repository](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/589)
* [Removes references to codenvy](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/591)
* [Removes unneeded lti-launch widget type](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/594)
* [Adds feature to apply linter recommendations](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/595)
* [Applies stylelint recommended changes](https://github.com/UW-Madison-DoIT/angularjs-portal/pull/596)

## [6.2.2][] - 2017-03-09

* Documentation updates https://github.com/UW-Madison-DoIT/angularjs-portal/pull/579
* Upgrades to [UW-Frame version 3.1.3](https://github.com/UW-Madison-DoIT/uw-frame/releases/tag/v3.1.3) which adds a fix for UW-Lacrosse UI

## [6.2.1][] - 2017-03-02

Updates the version of uw-frame to use version 3.1.1

## [6.2.0][] - 2017-02-21

* Removes unneeded doc building shell scripts <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/570>
* Switches Jekyll theme to minimal and customizes <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/571>
* Removes post-graduation-plans content from sample feeds <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/572>
* Fixes broken links in documentation <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/573>
* Adds the ability for weather widgets to show temperature in Kelvin <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/578>
* Adds keywords to the Grad Student Portal in sample feeds <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/561>

## [6.1.0][] - 2017-02-02

* Utilizes maintenance mode  attribute being sent in layout feeds <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/565>, <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/567>, <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/568>
* Uses GitHub pages for documentation now <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/563>, <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/564>, <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/569>
* Adds codeclimate.com badge <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/560>
* Adds LTI-launch as a widget type <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/562>
* Fixes display bug in LOL widgets with greater than five links <https://github.com/UW-Madison-DoIT/angularjs-portal/pull/566>

## [6.0.0][] - 2016-12-20

### RSS widget type configuration change

Breaking configuration change:

Whereas previously the `widgetURL` for RSS type widgets was the URL of an RSS feed, with this release the `widgetURL` for RSS type widgets is a JSON feed, such as that generated by the new [rssToJson microservice](https://github.com/UW-Madison-DoIT/rssToJson).

Adopters will need to update the `portlet-definition`s of any RSS type widgets.

### uw-frame upgrade

This release overlays on [uw-frame v3.0.3](https://github.com/UW-Madison-DoIT/uw-frame/releases/tag/uw-frame-maven-3.0.3), picking up a fix for the Google Analytics integration.

See also:
- the [6.0.0 milestone](https://github.com/UW-Madison-DoIT/angularjs-portal/milestone/5?closed=1).

[Unreleased]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.5.0...HEAD
[6.5.0]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.4.2...angularjs-portal-parent-6.5.0
[6.4.2]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.4.1...angularjs-portal-parent-6.4.2
[6.4.1]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.4.0...angularjs-portal-parent-6.4.1
[6.4.0]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.3.0...angularjs-portal-parent-6.4.0
[6.3.0]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.2.2...angularjs-portal-parent-6.3.0
[6.2.2]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.2.1...angularjs-portal-parent-6.2.2
[6.2.1]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.2.0...angularjs-portal-parent-6.2.1
[6.2.0]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.1.0...angularjs-portal-parent-6.2.0
[6.1.0]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-6.0.0...angularjs-portal-parent-6.1.0
[6.0.0]: https://github.com/UW-Madison-DoIT/angularjs-portal/compare/angularjs-portal-parent-5.5.0...angularjs-portal-parent-6.0.0

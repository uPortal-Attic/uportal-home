# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][]

### Added

* Added `public-myuw` to localhost mock app directory to demonstrate
  `list-of-links` widget sourcing its links from a URL rather than from direct
  configuration. (#792)

### Changed

### Fixed

* Made `relatedPortlets` arrays empty in `entries.json` (#787)

### Removed

## [7.2.0][] - 2018-01-11

### Added
* require npm version 5.6.0 or higher (#756)
* update apereo-incubation.md to reflect incubation progress (#754)

### Changed
* update to latest 8.0.0 release of uportal-app-framework
* update stylelint-config-standard to latest 17.0.0 version (#749)
* update karma to latest 2.0.0 version (#759)

### Fixed
* resolve requireJS build flakiness (#757)

### Removed

## [7.1.0][] - 2017-12-06

### Features

* Implement `uportal-app-framework` `7.0.0`'s new sidebar navigation #730
* Use frame-page directive for all views #739, #742 (supports upgrade to
  `uportal-app-framework` `7.0.0` with its new side navigation feature.)

### Bug Fixes
* fix: support deep link to details page about an app #732, #735
* fix: use `mdColors` to get primary color in app directory #723
* fix: Calculate rel on marketplace anchors #725

### Build changes
* build(maven): set Java 8 as source and target versions #737

### Dependency upgrades
* chore(package): update @commitlint/config-angular to version 4.2.0 #729

### Style
* style(lint): Style marketplace controller per style guide #738

## [7.0.3][] - 2017-10-10

Uses [uPortal-app-framework 6.0.4](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uportal-app-framework-maven-6.0.4).

### Bug Fixes
* Fix clipping app options on small screens #713
* Separate remove button into own controller #718

### Documentation & Build
* update appveyor badge #716
* Enable cross browser testing #717
* Use name `uPortal-home` consistently #715
* Update @commitlint/cli to the latest version #719
* update `eslint-plugin-compat` to version `2.0.1` #721

## [7.0.2][] - 2017-10-02

Uses [uPortal-app-framework 6.0.3](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uportal-app-framework-maven-6.0.3).

## [7.0.1][] - 2017-09-29
* Updating to [uPortal-app-framework 6.0.2](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uportal-app-framework-maven-6.0.2)
* [Link to MyUW examples deck](https://github.com/uPortal-Project/uportal-home/pull/705)
* [Update references to github repos](https://github.com/uPortal-Project/uportal-home/pull/706)

## [7.0.0][] - 2017-09-27
* Changing name from angularjs-portal to uPortal-home

## [6.7.0][] - 2017-09-26
### Minor Changes
* [Add from feature button](https://github.com/uPortal-Project/uportal-home/pull/692)
* [Remove "categories" from app directory](https://github.com/uPortal-Project/uportal-home/pull/695)

### Patch Changes
#### Documentation
* [Update Changelog](https://github.com/uPortal-Project/uportal-home/pull/681)
* [Add badge for AppVeyor](https://github.com/uPortal-Project/uportal-home/pull/683)
* [Acknowledge Jianyi Liu](https://github.com/uPortal-Project/uportal-home/pull/684)
* [Document conventional commits](https://github.com/uPortal-Project/uportal-home/pull/685)
* [Apply License Headers](https://github.com/uPortal-Project/uportal-home/pull/690)
* [Add Notice File](https://github.com/uPortal-Project/uportal-home/pull/691)

#### Bug Fixes
* [Remove google domain search](https://github.com/uPortal-Project/uportal-home/pull/689)
* [Clean up Lint Errors](https://github.com/uPortal-Project/uportal-home/pull/694)
* [Remove Auto-Licensing from Docs](https://github.com/uPortal-Project/uportal-home/pull/693)
* [Clean up category remnants](https://github.com/uPortal-Project/uportal-home/pull/698)
* [Fix auto-redirect introduced in 6.6.0](https://github.com/uPortal-Project/uportal-home/pull/703)

#### Build Changes
* [Change Maven Commit format](https://github.com/uPortal-Project/uportal-home/pull/686)
* [Use uportal-app-framework](https://github.com/uPortal-Project/uportal-home/pull/701)

## [6.6.0][] - 2017-09-01

### Documentation updates
* [Add additional badges](https://github.com/uPortal-Project/uportal-home/pull/673)
* [Note next scheduled Incubation call](https://github.com/uPortal-Project/uportal-home/pull/670)
* [Link to formal incubation record](https://github.com/uPortal-Project/uportal-home/pull/669)
* [Fix broken GitHub Pages caused by extra whitespace](https://github.com/uPortal-Project/uportal-home/pull/668)
* [Link project screenshots and presentations](https://github.com/uPortal-Project/uportal-home/pull/667)
* [Reflect latest incubation status](https://github.com/uPortal-Project/uportal-home/pull/664)
* [Adds SUPPORT.md](https://github.com/uPortal-Project/uportal-home/pull/661)
* [Remove unused images from docs](https://github.com/uPortal-Project/uportal-home/pull/660)
* [Emphasize support channels through existing uPortal methods](https://github.com/uPortal-Project/uportal-home/pull/655)
* [Move widget documentation to this project](https://github.com/uPortal-Project/uportal-home/pull/657)
* [Note which incubation steps are intended to be resolved in 2017 Q3](https://github.com/uPortal-Project/uportal-home/pull/656)
* [Reflect Christian Murphy committer status](https://github.com/uPortal-Project/uportal-home/pull/650)
* [Acknowledge Apereo Welcoming Policy](https://github.com/uPortal-Project/uportal-home/pull/649)
* [Link to slides used in incubation call](https://github.com/uPortal-Project/uportal-home/pull/640)
* [Document implementing with Vanilla uPortal](https://github.com/uPortal-Project/uportal-home/pull/633)
* [Add documentation how to do local testing and linting](https://github.com/uPortal-Project/uportal-home/pull/635)
* [Document our use of Google Style](https://github.com/uPortal-Project/uportal-home/pull/630)
* [Switch incubating badge to shields.io version](https://github.com/uPortal-Project/uportal-home/pull/631)

### Code maintenance
* [Adopt conventional commits](https://github.com/uPortal-Project/uportal-home/pull/666)
* [Update remark-validate-links to latest version](https://github.com/uPortal-Project/uportal-home/pull/679)
* [Fix link in documentation](https://github.com/uPortal-Project/uportal-home/pull/675)
* [Adds a formal change log](https://github.com/uPortal-Project/uportal-home/pull/671)
* [Restructure remarklint setup](https://github.com/uPortal-Project/uportal-home/pull/672)
* [Update requirejs-text to new version](https://github.com/uPortal-Project/uportal-home/pull/665)
* [Enable greenkeeper](https://github.com/uPortal-Project/uportal-home/pull/659)
* [Remove phantomjs and possible security risk](https://github.com/uPortal-Project/uportal-home/pull/653)
* [Add layout service tests](https://github.com/uPortal-Project/uportal-home/pull/638)
* [Stop assuming application deployed at /web on web server](https://github.com/uPortal-Project/uportal-home/pull/641)
* [Clear all markdown lint warnings](https://github.com/uPortal-Project/uportal-home/pull/636)

### CI
* [Skip flaky maven dependency checks](https://github.com/uPortal-Project/uportal-home/pull/678)
* [Update to work with Greenkeeper](https://github.com/uPortal-Project/uportal-home/pull/662)
* [Add chrome to CI, test with macOS and Ubuntu Trusty](https://github.com/uPortal-Project/uportal-home/pull/651)
* [Add automated testing for Windows](https://github.com/uPortal-Project/uportal-home/pull/628)

### Header
* [Allow the subheader to be more configurable and in an easier to implement](https://github.com/uPortal-Project/uportal-home/pull/676)

### Messaging
* [Update configuration to use new messages model](https://github.com/uPortal-Project/uportal-home/pull/674)

### Widgets
* [Allow widgets to be removable even when in maintenance mode](https://github.com/uPortal-Project/uportal-home/pull/663)
* [Document new action-items widget type](https://github.com/uPortal-Project/uportal-home/pull/652)

### Search
* [Fix bug where show all directory results button doesn't do anything](https://github.com/uPortal-Project/uportal-home/pull/637)

### Vanilla uPortal
* [Add support and detection for using layout.json v4.3](https://github.com/uPortal-Project/uportal-home/pull/634)

## [6.5.0][] - 2017-05-04
### CI Enhancements
* [Cache dependencies to reduce download time in Travis CI](https://github.com/uPortal-Project/uportal-home/pull/618)

### Code Style Enhancements
* [Adopts AngularJS code stylez](https://github.com/uPortal-Project/uportal-home/pull/615)
* [Ignore mock folder for Lint checks](https://github.com/uPortal-Project/uportal-home/pull/617)

### Apereo Incubation
* [Formalizes committers](https://github.com/uPortal-Project/uportal-home/pull/619)
* [Acknowledges contributors](https://github.com/uPortal-Project/uportal-home/pull/621)
* [Clarifies release procedures](https://github.com/uPortal-Project/uportal-home/pull/625)

### Documentation Updates
* [Updates RSS widget documentation](https://github.com/uPortal-Project/uportal-home/pull/620)
* [Updates launch button default text documentation](https://github.com/uPortal-Project/uportal-home/pull/623)

### New Features
* [Portlet icon directive prefers md-icons if available](https://github.com/uPortal-Project/uportal-home/pull/622)
* [Uses a new api `layout.json` to retrieve a users layout](https://github.com/uPortal-Project/uportal-home/pull/624)
* [Updates to App-Framework v4.1.0](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.1.0)

## [6.4.2][] - 2017-04-13

[Upgrades to use latest 4.0.3 release of App-Framework](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.0.3)

## [6.4.1][] - 2017-04-13

[Adds back in compact mode for user's layouts](https://github.com/uPortal-Project/uportal-home/pull/614)
[Upgrades to the latest App Framework 4.0.2](https://github.com/uPortal-Project/uportal-app-framework)

## [6.4.0][] - 2017-04-13

Release 6.4.0 Adds thoughtful automation tools.  Style checkers were added and our Travis CI integration (is that word redundant) is back and working once more.  Continued progress in Apereo Incubation was well as bug fixes and routine maintenance, including upgrading to the latest [App Framework version 4.0.1](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.0.1).

### Automate Testing and Checking of Styles
* [Fix Karma with Travis CI](https://github.com/uPortal-Project/uportal-home/pull/597)
* [Fix Lint errors for Travis CI](https://github.com/uPortal-Project/uportal-home/pull/601)
* [Remove duplicated Travis CI install scripts](https://github.com/uPortal-Project/uportal-home/pull/602)
* [Automatically ban ES6+ syntax from application for continue IE support](https://github.com/uPortal-Project/uportal-home/pull/603)
* [Add ability to automatically link check files before committing](https://github.com/uPortal-Project/uportal-home/pull/605)

### Apereo Incubation Progress
* [Guide contributors to Apereo ICLA compliance via a contributors.md and pull request template](https://github.com/uPortal-Project/uportal-home/pull/592)
* [Add uPortal ecosystem incubating badges](https://github.com/uPortal-Project/uportal-home/pull/598)
* [Announce name transitions for incubation](https://github.com/uPortal-Project/uportal-home/pull/609)

### Bug Fixes
* [Update markdown file link syntax](https://github.com/uPortal-Project/uportal-home/pull/600)
* [Fix missing ratings in search results](https://github.com/uPortal-Project/uportal-home/pull/606)
* [Fix bug when showing 0 search results](https://github.com/uPortal-Project/uportal-home/pull/606)
* [Adds back widget styling that was removed in the App Framework upgrade](https://github.com/uPortal-Project/uportal-home/pull/613)

### Maintenance
* [Remove defunct app entry in mock data feeds](https://github.com/uPortal-Project/uportal-home/pull/610)
* [Add function documentation and removes a code TODO](https://github.com/uPortal-Project/uportal-home/pull/611)
* [Upgrade to the latest App Framework](https://github.com/uPortal-Project/uportal-home/pull/612)

## [6.3.0][] - 2017-03-21

### Apereo Incubation Work
* [Documents Apereo Incubation Status](https://github.com/uPortal-Project/uportal-home/pull/581)
* [Cleans up Apereo Incubation badge](https://github.com/uPortal-Project/uportal-home/pull/593)

### Code Cleanup
* [Refactors Widget Types](https://github.com/uPortal-Project/uportal-home/pull/580)
  * [Widget Documentation](http://uportal-project.github.io/uportal-home/widgets.html) stating that custom widgets will be typed as `custom`.  Listing custom widget types as `generic` still works for backwards compatibility.
* [Adds Google code style check](https://github.com/uPortal-Project/uportal-home/pull/583)
* [Configures TravisCI to use multiple JDK's](https://github.com/uPortal-Project/uportal-home/pull/584)
* [Updates license in package.json to Apache 2.0](https://github.com/uPortal-Project/uportal-home/pull/585/files)
* [Adds ESLint to repository](https://github.com/uPortal-Project/uportal-home/pull/586)
* [Adds remark-lint to repository](https://github.com/uPortal-Project/uportal-home/pull/588/files)
* [Adds styelint to repository](https://github.com/uPortal-Project/uportal-home/pull/589)
* [Removes references to codenvy](https://github.com/uPortal-Project/uportal-home/pull/591)
* [Removes unneeded lti-launch widget type](https://github.com/uPortal-Project/uportal-home/pull/594)
* [Adds feature to apply linter recommendations](https://github.com/uPortal-Project/uportal-home/pull/595)
* [Applies stylelint recommended changes](https://github.com/uPortal-Project/uportal-home/pull/596)

## [6.2.2][] - 2017-03-09

* Documentation updates <https://github.com/uPortal-Project/uportal-home/pull/579>
* Upgrades to [App-Framework version 3.1.3](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/v3.1.3) which adds a fix for UW-Lacrosse UI

## [6.2.1][] - 2017-03-02

Updates the version of App-Framework to use version 3.1.1

## [6.2.0][] - 2017-02-21

* Removes unneeded doc building shell scripts <https://github.com/uPortal-Project/uportal-home/pull/570>
* Switches Jekyll theme to minimal and customizes <https://github.com/uPortal-Project/uportal-home/pull/571>
* Removes post-graduation-plans content from sample feeds <https://github.com/uPortal-Project/uportal-home/pull/572>
* Fixes broken links in documentation <https://github.com/uPortal-Project/uportal-home/pull/573>
* Adds the ability for weather widgets to show temperature in Kelvin <https://github.com/uPortal-Project/uportal-home/pull/578>
* Adds keywords to the Grad Student Portal in sample feeds <https://github.com/uPortal-Project/uportal-home/pull/561>

## [6.1.0][] - 2017-02-02

* Utilizes maintenance mode  attribute being sent in layout feeds <https://github.com/uPortal-Project/uportal-home/pull/565>, <https://github.com/uPortal-Project/uportal-home/pull/567>, <https://github.com/uPortal-Project/uportal-home/pull/568>
* Uses GitHub pages for documentation now <https://github.com/uPortal-Project/uportal-home/pull/563>, <https://github.com/uPortal-Project/uportal-home/pull/564>, <https://github.com/uPortal-Project/uportal-home/pull/569>
* Adds codeclimate.com badge <https://github.com/uPortal-Project/uportal-home/pull/560>
* Adds LTI-launch as a widget type <https://github.com/uPortal-Project/uportal-home/pull/562>
* Fixes display bug in LOL widgets with greater than five links <https://github.com/uPortal-Project/uportal-home/pull/566>

## [6.0.0][] - 2016-12-20

### RSS widget type configuration change

Breaking configuration change:

Whereas previously the `widgetURL` for RSS type widgets was the URL of an RSS feed, with this release the `widgetURL` for RSS type widgets is a JSON feed, such as that generated by the new [rssToJson microservice](https://github.com/UW-Madison-DoIT/rssToJson).

Adopters will need to update the `portlet-definition`s of any RSS type widgets.

### App-Framework upgrade

This release overlays on [App-Framework v3.0.3](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-3.0.3), picking up a fix for the Google Analytics integration.

See also:
- the [6.0.0 milestone](https://github.com/uPortal-Project/uportal-home/milestone/5?closed=1).

[Unreleased]: https://github.com/uPortal-Project/uportal-home/compare/uportal-home-parent-7.2.0...HEAD
[7.2.0]: https://github.com/uPortal-Project/uportal-home/releases/tag/uportal-home-parent-7.1.0...uportal-home-parent-7.2.0
[7.1.0]: https://github.com/uPortal-Project/uportal-home/releases/tag/uportal-home-parent-7.0.3...uportal-home-parent-7.1.0
[7.0.3]: https://github.com/uPortal-Project/uportal-home/releases/tag/uportal-home-parent-7.0.2..uportal-home-parent-7.0.3
[7.0.2]: https://github.com/uPortal-Project/uportal-home/releases/tag/uportal-home-parent-7.0.1...uportal-home-parent-7.0.2
[7.0.1]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-7.0.0...uportal-home-parent-7.0.1
[7.0.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.7.0...uportal-home-parent-7.0.0
[6.7.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.6.0...angularjs-portal-parent-6.7.0
[6.6.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.5.0...angularjs-portal-parent-6.6.0
[6.5.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.4.2...angularjs-portal-parent-6.5.0
[6.4.2]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.4.1...angularjs-portal-parent-6.4.2
[6.4.1]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.4.0...angularjs-portal-parent-6.4.1
[6.4.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.3.0...angularjs-portal-parent-6.4.0
[6.3.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.2.2...angularjs-portal-parent-6.3.0
[6.2.2]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.2.1...angularjs-portal-parent-6.2.2
[6.2.1]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.2.0...angularjs-portal-parent-6.2.1
[6.2.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.1.0...angularjs-portal-parent-6.2.0
[6.1.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-6.0.0...angularjs-portal-parent-6.1.0
[6.0.0]: https://github.com/uPortal-Project/uportal-home/compare/angularjs-portal-parent-5.5.0...angularjs-portal-parent-6.0.0

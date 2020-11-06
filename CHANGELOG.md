# Changelog

This changelog documents the changes to the versioned software product.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Versions in this document should match those
[published to Sonatype Maven Central Repository][].

## Next

(No changes yet).

## 11.0.0 - 2020-11-06

+ Uses uPortal-app-framework 18.0.0,
  which stops integrating with Google Analytics directly
  and instead integrates with Google Analytics via Google Tag Manager.

## 10.3.2 - 2020-10-13

+ Uses [uPortal-app-framework 17.0.3][], which updates a couple Web Components.

## 10.3.1

(Goofy release - skip it.)

## 10.3.0 - 2020-09-01

+ Excludes the widget context menu on the widget rendered on the details page
  about an app directory entry.

Uses uPortal-app-framework 17.0.1,
which changes parts of the notifications UI to use Web Components.

## 10.2.2 - 2020-07-22

+ Update releasing steps of uPortal-home app
+ Fix `portlet-icon` directive to support `iconUrl`
  (the now preferred URL-to-an-SVG-file way of referencing icons).
  so that app directory details pages show the entry icon rather than defaulting
  to showing a star icon.
+ Remove "popularity" sorting option when browsing app directory entries,
  since users are no longer able to rate entries.
+ Tell users how many entries match
  when filtering when browsing the app directory

+ Uses uPortal-app-framework 16.0.2, which

+ replaces current Profile functionality with the myuw-profile Web Component
+ downgrades angular-resource to 1.5.8 from 1.7.8

## 10.2.1 - 2020-04-08

Uses uPortal-app-framework 14.0.1, which

+ includes accessibility improvement of Submit Search button

## 10.2.0 - 2020-04-02

Uses uPortal-app-framework 14.0.0, which

+ replaces current Search functionality with the myuw-search Web Component

## 10.1.2 - 2020-03-09

Uses uPortal-app-framework 13.1.2, which

+ fixes a CSS issue with display of the new myuw-help dialog

## 10.1.1 - 2020-03-06

Uses uPortal-app-framework 13.1.1, which

+ removes a problematic un-needed `myuw-compact-card` import
+ upgrades the myuw-help Web Component

## 10.1.0 - 2020-02-07

Uses [uPortal-app-framework 13.1.0][], which adds help dialog launcher to
the top app bar.

## 10.0.0 - 2020-01-07

+ Removes embedded rest-proxy. Local implementations of uPortal-home needing a
  proxy should deploy a proxy alongside rather than within uPortal-home.
+ Always shows suggestions for recovering from search not finding what the user
  needs, instead of only showing these options when there were no search
  results. (There might be results, but those results may not have met the user
  need).

Uses uPortal-app-framework 13.0.0.

## 9.2.0 - 2019-06-07

Upgrades to uPortal-app-framework 12.2.0 from 12.1.0. Highlights:

+ Adds `remote-user` widget type
+ Adds `suppressLaunchButton` `list-of-links` widget configuration option

## 9.1.0 - 2019-05-13

### Fixes in 9.1.0

+ Generates static content div identifier by fname rather than by
  not-reliably-unique nodeId #876
+ Fixes widget grid not displaying properly in Firefox #881

### Dependency upgrades in 9.1.0

Upgrades to uPortal-app-framework 12.1.0 from 12.0.0. Highlights:

+ myuw-banner feature
+ `widgetConfig.launchUrl` support
+ fix for uniqueness of widget HTML element ids
+ improved loading splash screen
+ fix reducing duplicate session expiration dialogs

## 9.0.0 - 2019-02-26

Breaking change: messages of type `announcement` no longer have any effect.
`/features` no longer routed.

Via [uPortal-app-framework 12.0.0][]:

+ Tells IE users about recommended browsers during bootstrapping.
+ `list-of-links` widget appears more consistent across browsers and screen
  sizes
+ `action-items` widget degrades to basic widget when configured with just one
  indicator and that one indicator is failing.

### Removed

+ `/features` route (#871) and, by adopting uPortal-app-framework 12, removed
  mascot "announcements" more generally.

### Fixed

+ Removed rate app button from `exclusive` and `static` templates #868
+ Removed references to ratings from marketplace pages. #870
+ Changed label on UI control for switching home page between expanded and
  compact widget modes, to make this feature more recognizable to and
  understandable by users. New label is "Change tile size"; was
  "Toggle expanded widgets". Also updates the associated `aria-label`. #866
+ Removed watch configuration from `cssVars`, because it made loading slow in
  IE11. Delays init by one second, because trying to run it directly after the
  bootstrapping is too early for IE on the first render. #872

## 8.3.6 - 2018-11-19

+ Using uportal-app-framework 11.0.0
+ Add css-vars-ponyfill for CSS Variables support #859
+ Revert "Removing unneeded session logic" #858

## 8.3.5 - 2018-09-19

+ Using uportal-app-framework 10.3.0
+ Removing unneeded session logic #856

## 8.3.4 - 2018-09-12

### Updated

+ Using uportal-app-framework 10.2.0

## 8.3.3 - 2018-08-07

+ Trimmed excess spaces off the `fname` attribute in widget view that is no longer trimmed by angularjs (#851)

## 8.3.2 - 2018-08-01

+ Compact widgets no longer disappear when reordering via click-and-drag (#848)

## 8.3.1 - 2018-07-26

+ Using uportal-app-framework 10.1.0

## 8.3.0 - 2018-07-13

### Changed

+ App directory and person directory search result tabs now reflect more nuance
  about the state of their respective searches in the result tab badges. (#827)
+ $rootScope.GuestMode removed in favor of more locally scoped variables (#836)
+ Widget removal button is now a menu item to conform to [upstream changes][uportal-app-framework #786] (#840)

### Fixed

+ Removes app directory search results count badge. Intended as temporary
  mitigation for bug wherein the badge did not reliably show a correct count.
  (#843)
+ Successfully launch searches into today.wisc.edu from Madison's theme (#829)
+ Fix compact mode layout changes not persisting when using click+drag (#838)

### Deprecated

**Web search integration is deprecated.** This integration is not actually used
by `uPortal-home` adopters actively involved in maintaining this open source
software product, so there's risk for this feature to go un-loved and
un-maintained. Removing it clarifies expectations. The web search integration
will still be in the source history so when the feature comes up again (fair to
expect it will), it will still be feasible to get whatever goodness can be had
from working from the legacy implementation of this abandoned feature.
**Engagement to implement and maintain this feature going forward is welcome.**
It's not that this feature is unwelcome, it's just that it's not currently real.
(#830)

## 8.2.1 - 2018-06-08

+ Hide app directory search loading indicator when search returns zero results
  (#826)
+ Suggest ways to recover from a search with zero results (#828)
+ Gracefully handle case where directory search JSON URL is bad, as is the case
  in naive localhost demo against stub data (#825)

## 8.2.0 - 2018-05-22

+ Removed side navigation link to unused "New Features" page (#814)
+ "About" page now actually has information about MyUW (#814)

### Added

+ Side navigation link to new "Version information" page (#814)

## 8.1.2 - 2018-04-17

+ Support for Font Awesome icons (the `faIcon` parameter in `portlet-definition`
  entity files) is formally DEPRECATED, with Material icons (`mdIcon`) preferred
  instead. Documentation is updated to reflect this preference and deprecation.
  Support for Font Awesome icons will be removed in some future release. (#801)

### Fixed in 8.1.2

+ Adjusted "Undo" action toasts to better support rapid widget deletion (#812)
+ Prioritized matching `title`s in search results (#809)
+ `.gitignore` `.vscode` (#788)

## 8.1.1 - 2018-03-30

+ Tweaked "Undo" action toasts to better conform to [material guidelines](https://material.io/guidelines/components/snackbars-toasts.html#) (#808)
+ Updated app-framework to 9.0.2

## 8.1.0 - 2018-03-30

+ Removing widget from home screen now displays a toast allowing UNDO action
  before saving changes (#805)
+ App search results now order by matching titles first, then matching
  descriptions/keywords (#809)
+ Fixed bug that sometimes caused the wrong widget to be removed from user's
  layout (#804)

### Dependency upgrades

+ Updated app-framework to 9.0.1

## 8.0.0 - 2018-03-21

+ Sort widget layout by keyboard -- arrow keys when the widget has focus will
  move it left or right (#795)
+ Added `public-myuw` to localhost mock app directory to demonstrate
  `list-of-links` widget sourcing its links from a URL rather than from direct
  configuration. (#792)
+ Replaced bootstrap in widget layout with CSS-grid and flex fallback (#795)
+ Replaced jQuery UI Sortable with angular-drag-and-drop-lists (#795)
+ Removed defective (always zero) search results total badge (#797)
+ Alphabetically sort by `title` not `name` in app directory browse (#791)
+ Made `relatedPortlets` arrays empty in `entries.json` (#787)

## 7.2.0 - 2018-01-11

+ update to latest 8.0.0 release of uportal-app-framework
+ resolve requireJS build flakiness (#757)

## 7.1.0 - 2017-12-06

+ Implement `uportal-app-framework` `7.0.0`'s new sidebar navigation #730
+ Use frame-page directive for all views #739, #742 (supports upgrade to
  `uportal-app-framework` `7.0.0` with its new side navigation feature.)
+ fix: support deep link to details page about an app #732, #735
+ fix: use `mdColors` to get primary color in app directory #723
+ fix: Calculate rel on marketplace anchors #725

## 7.0.3 - 2017-10-10

Uses [uPortal-app-framework 6.0.4](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uportal-app-framework-maven-6.0.4).

### Bug Fixes

+ Fix clipping app options on small screens #713
+ Separate remove button into own controller #718

## 7.0.2 - 2017-10-02

Uses [uPortal-app-framework 6.0.3](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uportal-app-framework-maven-6.0.3).

## 7.0.1 - 2017-09-29

+ Updating to [uPortal-app-framework 6.0.2](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uportal-app-framework-maven-6.0.2)

## 7.0.0 - 2017-09-27

+ Changing name from angularjs-portal to uPortal-home

## 6.7.0 - 2017-09-26

+ [Add from feature button](https://github.com/uPortal-Project/uportal-home/pull/692)
+ [Remove "categories" from app directory](https://github.com/uPortal-Project/uportal-home/pull/695)
+ [Remove google domain search](https://github.com/uPortal-Project/uportal-home/pull/689)
+ [Clean up category remnants](https://github.com/uPortal-Project/uportal-home/pull/698)
+ [Fix auto-redirect introduced in 6.6.0](https://github.com/uPortal-Project/uportal-home/pull/703)

#### Build Changes

+ [Use uportal-app-framework](https://github.com/uPortal-Project/uportal-home/pull/701)

## 6.6.0 - 2017-09-01

### Code maintenance

+ [Update requirejs-text to new version](https://github.com/uPortal-Project/uportal-home/pull/665)
+ [Remove phantomjs and possible security risk](https://github.com/uPortal-Project/uportal-home/pull/653)
+ [Stop assuming application deployed at /web on web server](https://github.com/uPortal-Project/uportal-home/pull/641)
+ [Allow the subheader to be more configurable and in an easier to implement](https://github.com/uPortal-Project/uportal-home/pull/676)
+ [Update configuration to use new messages model](https://github.com/uPortal-Project/uportal-home/pull/674)
+ [Allow widgets to be removable even when in maintenance mode](https://github.com/uPortal-Project/uportal-home/pull/663)
+ [Fix bug where show all directory results button doesn't do anything](https://github.com/uPortal-Project/uportal-home/pull/637)
+ [Add support and detection for using layout.json v4.3](https://github.com/uPortal-Project/uportal-home/pull/634)

## 6.5.0 - 2017-05-04

### New Features

+ [Portlet icon directive prefers md-icons if available](https://github.com/uPortal-Project/uportal-home/pull/622)
+ [Uses a new api `layout.json` to retrieve a users layout](https://github.com/uPortal-Project/uportal-home/pull/624)
+ [Updates to App-Framework v4.1.0](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.1.0)

## 6.4.2 - 2017-04-13

[Upgrades to use latest 4.0.3 release of App-Framework](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.0.3)

## 6.4.1 - 2017-04-13

[Adds back in compact mode for user's layouts](https://github.com/uPortal-Project/uportal-home/pull/614)
[Upgrades to the latest App Framework 4.0.2](https://github.com/uPortal-Project/uportal-app-framework)

## 6.4.0 - 2017-04-13

Bug fixes and routine maintenance, including upgrading to the latest [App Framework version 4.0.1](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.0.1).

### Bug Fixes

+ [Fix missing ratings in search results](https://github.com/uPortal-Project/uportal-home/pull/606)
+ [Fix bug when showing 0 search results](https://github.com/uPortal-Project/uportal-home/pull/606)
+ [Adds back widget styling that was removed in the App Framework upgrade](https://github.com/uPortal-Project/uportal-home/pull/613)

### Maintenance

+ [Upgrade to the latest App Framework](https://github.com/uPortal-Project/uportal-home/pull/612)

## 6.3.0 - 2017-03-21

### Code Cleanup

+ [Refactors Widget Types](https://github.com/uPortal-Project/uportal-home/pull/580)
  + [Widget Documentation](http://uportal-project.github.io/uportal-home/widgets.html) stating that custom widgets will be typed as `custom`. Listing custom widget types as `generic` still works for backwards compatibility.
+ [Updates license in package.json to Apache 2.0](https://github.com/uPortal-Project/uportal-home/pull/585/files)
+ [Removes unneeded lti-launch widget type](https://github.com/uPortal-Project/uportal-home/pull/594)

## 6.2.2 - 2017-03-09

+ Upgrades to [App-Framework version 3.1.3](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/v3.1.3) which adds a fix for UW-Lacrosse UI

## 6.2.1 - 2017-03-02

Updates the version of App-Framework to use version 3.1.1

## 6.2.0 - 2017-02-21

+ Adds the ability for weather widgets to show temperature in Kelvin <https://github.com/uPortal-Project/uportal-home/pull/578>

## 6.1.0 - 2017-02-02

+ Utilizes maintenance mode attribute being sent in layout feeds <https://github.com/uPortal-Project/uportal-home/pull/565>, <https://github.com/uPortal-Project/uportal-home/pull/567>, <https://github.com/uPortal-Project/uportal-home/pull/568>
+ Adds LTI-launch as a widget type <https://github.com/uPortal-Project/uportal-home/pull/562>
+ Fixes display bug in LOL widgets with greater than five links <https://github.com/uPortal-Project/uportal-home/pull/566>

## 6.0.0 - 2016-12-20

### RSS widget type configuration change

Breaking configuration change:

Whereas previously the `widgetURL` for RSS type widgets was the URL of an RSS feed, with this release the `widgetURL` for RSS type widgets is a JSON feed, such as that generated by the new [rssToJson microservice](https://github.com/UW-Madison-DoIT/rssToJson).

Adopters will need to update the `portlet-definition`s of any RSS type widgets.

### App-Framework upgrade

This release overlays on [App-Framework v3.0.3](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-3.0.3), picking up a fix for the Google Analytics integration.

See also:

+ the [6.0.0 milestone](https://github.com/uPortal-Project/uportal-home/milestone/5?closed=1).

[uportal-app-framework #786]: https://github.com/uPortal-Project/uportal-app-framework/pull/786
[uPortal-app-framework 12.0.0]: https://github.com/uPortal-Project/uportal-app-framework/blob/master/CHANGELOG.md#1200---2019-02-25
[uPortal-app-framework 13.1.0]: https://github.com/uPortal-Project/uportal-app-framework/blob/master/CHANGELOG.md#1310---2020-02-07
[uPortal-app-framework 17.0.3]: https://github.com/uPortal-Project/uportal-app-framework/blob/master/CHANGELOG.md#1703---2020-10-02

[published to Sonatype Maven Central Repository]: https://search.maven.org/artifact/org.apereo.uportal/uportal-home-parent

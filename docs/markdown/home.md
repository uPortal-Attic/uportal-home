# AngularJS-Portal Documentation

This documentation describes the features and implementation details of [`angularjs-portal`](https://github.com/UW-Madison-DoIT/angularjs-portal), the new home of [MyUW](https://it.wisc.edu/services/myuw/). `angularjs-portal` is based on [`uw-frame`](https://github.com/UW-Madison-DoIT/uw-frame) (which has [its own documentation](http://uw-madison-doit.github.io/uw-frame/)).

## Email lists

AngularJS-portal is an optional add-on for Apereo uPortal. As such it is appropriate to discuss developing AngularJS-portal on [uportal-dev@][] and adopting AngularJS-portal on [uportal-user@][].

AngularJS-portal is a project of MyUW. As such it is appropriate do discuss all things AngularJS-portal in the [MyUW Developers Google Group][].

## Home Page Features

The home page presents widgets in a remembered order. Logged in users can add to, remove from, and re-order this list.

Under the hood, the home page "layout" is implemented using uPortal's `DLM` as a personalized layout fragment, so MyUW delivers (and updates) a default set and ordering of home page content that is filtered to the viewing user's permissions.

The home page renders widgets in either of two user-selectable modes:

+ [Expanded mode](#/md/expanded) - Widgets are larger and may present dynamic content. Widgets with no dynamic content present their icon as a big click surface.
+ [Compact mode](#/md/compact) - Widgets are smaller and are all simply big click surfaces. Useful for mobile viewing and attractive to minimalists.

Developers can rapidly prototype widgets using the [Widget Creator](https://tools.my.wisc.edu/widget-creator/#/default).

## App Directory Features

See [app directory documentation](#/md/app-directory).

+ Sort by rating or alphabetically
+ Filter by category
+ View details about an app, with the details pages deep-linkable
+ Launch the app, including launching directly a portal-external URL for the app where configured.

## Search Features

See [search documentation](#/md/search).

Search over:

+ App directory entries
+ (optional) the web, using Google Custom Search integration
+ (optional) a directory of people, using directory search integration.

## Integration with uPortal
+ Overview
+ Customizations/Setup
+ [Silent Login Configuration](#/md/silent-login) - Configure angularjs-portal to do a login before bootstrapping angular.

[MyUW Developers Google Group]: https://groups.google.com/forum/#!forum/myuw-developers
[uportal-dev@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-dev
[uportal-user@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-user

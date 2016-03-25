### AngularJS-Portal Documentation

This documentation describes the features and implementation details of [`angularjs-portal`](https://github.com/UW-Madison-DoIT/angularjs-portal), the new home of [MyUW](https://it.wisc.edu/services/myuw/). `angularjs-portal` is based on [`uw-frame`](https://github.com/UW-Madison-DoIT/uw-frame) (which has [its own documentation](http://uw-madison-doit.github.io/uw-frame/)).

#### Home Page Features

The home page presents widgets in a remembered order. Logged in users can add to, remove from, and re-order this list.

Under the hood, the home page "layout" is implemented using uPortal's `DLM` as a personalized layout fragment, so MyUW delivers (and updates) a default set and ordering of home page content that is filtered to the viewing user's permissions.

The home page renders widgets in either of two user-selectable modes:

+ [Expanded mode](#/md/expanded) - Widgets are larger and may present dynamic content. Widgets with no dynamic content present their icon as a big click surface.
+ [Compact mode](#/md/compact) - Widgets are smaller and are all simply big click surfaces. Useful for mobile viewing and attractive to minimalists.

Developers can rapidly prototype widgets using the [Widget Creator](https://tools.my.wisc.edu/widget-creator/#/default).

#### Marketplace Features
+ Filtering by category
+ Details page
+ Deep Linking
+

#### Search Features
+ App entries from uPortal
+ Google Custom Search formats
+ Directory search results

#### Integration with uPortal
+ Overview
+ Customizations/Setup

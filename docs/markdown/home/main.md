## Features

### Home page
---
#### Persistent layout of widgets:
+ The home page presents widgets in a remembered order. Logged in users can add to, remove from, and re-order this list.
+ Under the hood, the home page layout is implemented using uPortal's `DLM` as a personalized layout fragment, so MyUW delivers (and updates) a 
default set and ordering of home page content that is filtered to the viewing user's permissions.

#### Toggleable view modes:
+ [Expanded mode](#/md/expanded): Widgets are larger and may present dynamic content. Widgets with no dynamic content present their icon as a big click surface.
+ [Compact mode](#/md/compact): Widgets are smaller and are all simply big click surfaces. Useful for mobile viewing and attractive to minimalists.
    
+ [Preset and custom widget types](#/md/widgets)
+ Configurable launch text for widgets ([see best practices guidance here](#/md/widget-launch-button))
+ [Widget creator](https://public.my.wisc.edu/web/widget-creator): For rapidly prototyping widgets

### [App directory](#/md/app-directory)
---
+ Browse a marketplace of apps
+ Sort alphabetically or by rating
+ Filter by category
+ View details about an app on its deep-linkable details page
+ Launch the app (including directly launching a portal-external URL for the app when configured)

### [Search](#/md/search)
---

AngularJS-portal's search can be used to search:

+ App directory entries
+ (optional) The web, using Google Custom Search integration
+ (optional) A directory of people, using directory search integration

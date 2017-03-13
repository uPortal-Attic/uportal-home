This documentation describes [AngularJS-Portal](https://github.com/UW-Madison-DoIT/angularjs-portal), the free and open source alternative front end for [uPortal][], used in e.g. [MyUW](https://it.wisc.edu/services/myuw/). AngularJS-Portal is based on [uw-frame](https://github.com/UW-Madison-DoIT/uw-frame) (which has [its own documentation](http://uw-madison-doit.github.io/uw-frame/)).

[AngularJS-Portal is an Apereo Incubating project](apereo-incubation.md) in the uPortal ecosystem.

[![Apereo Incubating badge](https://img.shields.io/badge/Apereo-Incubating-blue.svg)](https://www.apereo.org/content/projects-currently-incubation)

## Features

### Home page

#### Persistent layout of widgets
The home page presents widgets in a remembered order. Logged in users can add to, remove from, and re-order this list.

Under the hood, the home page layout is implemented as a personalized layout fragment in [uPortal][]'s `DLM`, so AngularJS-Portal delivers (and updates) a
default set and ordering of home page content that is filtered to the viewing user's permissions.

#### Toggleable view modes

Widgets show on the home page in either a minimalist "compact mode" or a rich "expanded mode". AngularJS-Portal takes a guess at the best default mode for a given browser and users can toggle the mode, with their preference stored in browser local storage.

+ [Expanded mode](expanded.md)
+ [Compact mode](compact.md)

#### Developing expanded modes for widgets

+ [Preset and custom widget types](widgets.md)
+ [Configurable launch text for widgets](widget-launch-button.md)
+ [Widget creator](https://public.my.wisc.edu/web/widget-creator)

### [App directory](app-directory.md)

Browse a directory of apps, sort them alphabetically or by rating, and filter them by category. You can also directly launch the app or view the details about an app on its deep-linkable details page.

### [Search](search.md)

Search app directory entries, the web (with Google Custom Search integration), or a directory of people (with directory search integration).

## Integration with uPortal
+ [Silent Login Configuration](silent-login.md)


[uPortal]: http://jasig.github.io/uPortal/

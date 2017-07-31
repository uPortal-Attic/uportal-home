Questions? [Get in touch][uportal-user@].

This documentation describes [AngularJS-Portal](https://github.com/UW-Madison-DoIT/angularjs-portal), the free and open source alternative front end for [uPortal][], used in e.g. [MyUW](https://it.wisc.edu/services/myuw/). AngularJS-Portal is based on [uw-frame](https://github.com/UW-Madison-DoIT/uw-frame) (which has [its own documentation](http://uw-madison-doit.github.io/uw-frame/)).

[AngularJS-Portal is an Apereo Incubating project](apereo-incubation.md) in the uPortal ecosystem.

[![Apereo Incubating badge](https://www.apereo.org/sites/default/files/Incubation%20Logos/incubating%20w%20logo%2015MAR17.png)](https://www.apereo.org/content/projects-currently-incubation)

Many [contributors](contributors.md) make this project possible.

## Presentations and screenshots

See [presentations](presentations.md).

## Demoing and implementing

You can partially demonstrate `uPortal-home` without a backing server, using provided stub example data. See the root `README.md` for how; start with that simplest possible local demo.

Of course for a more sophisticated demo or to adopt for real you will need to [configure your `uPortal-home` to work with a `uPortal` instance](with-uportal.md).

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

#### More about widgets

+ [Widget type documentation](http://uw-madison-doit.github.io/uw-frame/make-a-widget.html)
+ [Widget creator](https://test.my.wisc.edu/widget-creator/home)

### [App directory](app-directory.md)

Browse a directory of apps, sort them alphabetically or by rating, and filter them by category. You can also directly launch the app or view the details about an app on its deep-linkable details page.

### [Search](search.md)

Search app directory entries, the web (with Google Custom Search integration), or a directory of people (with directory search integration).

## Integration with uPortal
+ [Silent Login Configuration](silent-login.md)

## Developing

+ [On releasing](releasing.md)


[uPortal]: http://jasig.github.io/uPortal/
[uportal-user@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-user

This documentation describes the features and implementation details of [`angularjs-portal`](https://github.com/UW-Madison-DoIT/angularjs-portal), the new home of [MyUW](https://it.wisc.edu/services/myuw/). `angularjs-portal` is based on [`uw-frame`](https://github.com/UW-Madison-DoIT/uw-frame) (which has [its own documentation](http://uw-madison-doit.github.io/uw-frame/)).

## Features

### Home page

#### Persistent layout of widgets:
The home page presents widgets in a remembered order. Logged in users can add to, remove from, and re-order this list.

Under the hood, the home page layout is implemented using uPortal's `DLM` as a personalized layout fragment, so MyUW delivers (and updates) a 
default set and ordering of home page content that is filtered to the viewing user's permissions.

#### Toggleable view modes:
+ [Expanded mode](expanded.md)
+ [Compact mode](compact.md)
    
#### More cool stuff:
+ [Preset and custom widget types](widgets.md)
+ [Configurable launch text for widgets](widget-launch-button.md)
+ [Widget creator](https://public.my.wisc.edu/web/widget-creator)

### [App directory](app-directory.md)

Browse a marketplace of apps, sort them alphabetically or by rating, filter them by category. You can also directyly launch the app or view the details about an app on its deep-linkable details page.

### [Search](search.md)

Search app directory entries, the web (with Google Custom Search integration, or a directory of people (with directory search integration).

## Integration with uPortal
+ [Silent Login Configuration](silent-login.md)

## Email lists

Use the following Google Groups to discuss AngularJS-portal:

[uportal-dev@][]: Discuss development of AngularJS-portal in the uPortal context 

[uportal-user@][]: Discuss adoption of AngularJS-portal in the uPortal context

[MyUW Developers Google Group][]: Discuss all things AngularJS-portal in the MyUW context

## Learn more

+ [MyUW page on it.wisc.edu][MyUW service page]
+ [EDUCAUSE 2016 presentation][]

[MyUW Developers Google Group]: https://groups.google.com/forum/#!forum/myuw-developers
[uportal-dev@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-dev
[uportal-user@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-user

[MyUW service page]: https://it.wisc.edu/services/myuw/
[EDUCAUSE 2016 presentation]: https://goo.gl/AdFXF2

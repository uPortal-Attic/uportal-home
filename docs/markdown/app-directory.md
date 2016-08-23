# The App Directory

## App directory philosophy

`AngularJS-portal` uses the app directory to scale beyond the limitations of stuffing content into boxes on tabs in an old-school portal. Instead, users are encouraged to search over a directory potentially containing more stuff than would have fit on tabs.

This reduces noise and opportunity cost of adding content to the portal. Content that is only interesting to a smaller population can hang out in the directory, ready to be referenced, found, and used, but not bothering anyone who does not go looking for it.

## Anatomy of a directory entry

Technical, app directory entries *are* uPortal portlet registry entries, and so can be modeled and imported using uPortal `portlet-definition` "entities". The XML snippets in this documentation hint as to how this is done.

### Naming the content

#### `title` and `name`

Applications directory entries track two names for each app. Usually these names are the same.

```xml
<portlet-definition ...>
  <title>Preferred Name Administration</title>
  <name>Preferred Name Administration</name>
  ...
```

Sometimes they are different.

```xml
<portlet-definition ...>
  <title>HR, Payroll and Benefits News</title>
  <name>UW System HR, Payroll and Benefits News</name>
  ...
```

The difference is `title` displays to end users whereas `name` displays in certain administrative tooling. This allows multiple apps with the same user-facing title but different names, implementing a single concept with multiple entries for different audiences.

`title` will display to end users as

 * the name of the app when browsing the app directory
 * the name of the app in search results
 * the name of the app when viewing the details page for the app
 * the title on the widget tile, if the user adds the app to their home
 * the title when rendering the app, if the app is a portlet
 
whereas `name` will not display to end users.

`name` will display to administrators in the `Portlet Administration` tooling.

#### `fname`

The functional name ("fname") is a short human-readable string uniquely identifying the content, used in URLs addressing the content.

```xml
<portlet-definition ... >
  <fname>uw-system-hr-payroll-benefits-news</fname>
  ...
```

 * `/web/exclusive/{fname}` will render the content. (Currently not all portlet content works well rendered in this way, but that should be fixed someday.)
 * `/web/apps/details/{fname}` will render the details page about the content.

Historically (and technically, currently) `/portal/p/{fname}` would render the content, if the content is a portlet, but this uses the old rendering pipeline that should eventually be replaced by rendering in the new `/web/exclusive/{fname}` way.

Technically all application directory entries are portlets, so technically the URL to render the content will work for all directory entries -- but for frame-based apps, the `/{frame-based-app-context-name}` path (e.g., `https://my.wisc.edu/AdvisingGateway`) will provide a better experience when directing users to the app.

See also [KB article on referencing content in MyUW][].

### Describing the content

Beyond the names and URL path identifier, application directory entries in MyUW have several fields that inform the directory entry presentation.

#### Description

```xml    
<desc>View and update your personal information, including your primary/legal name, office and home addresses.</desc>
```

Description text displays 

 * as the description of the search result item in the search results display
 * as the description of the item in the browse view on the directory of apps
 * as the tooltip upon hovering on the (i) icon on the app's widget
 * on the app's details page

#### Icon

App directory entries optionally have an icon.

```xml
<parameter><name>faIcon</name><value>fa-user</value></parameter>
```

These can be any of the [Font Awesome icons][].

#### Categories

Each app can be in zero or more categories. Categories can also contain other categories.

```xml
<category>Personal Information</category>
```

Categories are an available filter for browsing the directory of apps and users can jump to that filter with a category selected from the details page of an app.

Categories drive the random selection of "related apps" shown in the app directory entry details page.

Permissions can be granted over whole categories of apps, and historically were, but MyUW is evolving to stop doing this and instead grant permissions directly on individual app directory entries.

#### Screenshots

Optionally, application directory entries can include screenshots.

```xml
<portlet-preference>
  <name>screen_shot1</name>
  <value>/images/screenshotImages/my-courses/courseList.png</value>
</portlet-preference>
<portlet-preference>
  <name>screen_shot1_caption</name>
  <value>View your course list.</value>
</portlet-preference>
<portlet-preference>
  <name>screen_shot2</name>
  <value>/images/screenshotImages/my-courses/courseGrid.png</value>
</portlet-preference>
<portlet-preference>
  <name>screen_shot2_caption</name>
  <value>View your course schedule in a grid view.</value>
</portlet-preference>
```

Screenshot captions should be sentence-cased. Sentences, even.

Screenshots should be managed in the [MyUW images GitLab repo][MyUWImages GitLab repo], with the significant advantage that (tagged releases of) this repo are deployed alongside MyUW and so have availability with MyUW, reducing the chance of a marred app details page experience when an externally referenced image is unavailable. 

### Optional external URL

Optionally an application directory entry can specify an "alternative" URL. This is alternative to using the JSR-286 Portlet associated with the app directory entry.

```xml
<parameter>
  <name>alternativeMaximizedLink</name>
  <value>https://uwmadison.box.com</value>
</parameter>
<parameter>
  <name>target</name>
  <value>_blank</value>
</parameter>
```

Where the external URL is specified, AngularJS-portal will prefer "Launch"ing to the external URL rather than launching to the internal portlet.

### Permissions

There are three kinds of permissions one can have over an entry in the app directory.

`SUBSCRIBE` grants permission to *use* the application: to add its widget to your layout, to launch it. Where the backing application is a Portlet in uPortal's portlet container, `SUBSCRIBE` implements coarse-grained access control such that the portlet container will only render the portlet for users with this permission.

`SUBSCRIBE` is granted in a `portlet-definition` entity file via `<group>` elements.

```xml
<group>Users - Box</group>
```

`BROWSE` is intended to grant permission to *know about* the application, to see its application directory entry.

`BROWSE` is granted in a `portlet-definition entity file via `<permission>` elements.

```xml
<permissions>
  <permission system="UP_PORTLET_SUBSCRIBE" activity="BROWSE">
    <group>Everyone</group>
  </permission>
</permissions>
```

`MANAGE` is a powerful administrative permission intended to grant ability to administer the app. Users with `MANAGE` permission over an app and access to the `Portlet Administration` app in MyUW can edit the `portlet-definition`s for apps they manage.  Users with `MANAGE` permission can also view the raw ratings and reviews for an app (rather than only the aggregated average rating).

```xml
<permissions>
  <permission system="UP_PORTLET_SUBSCRIBE" activity="MANAGE">
    <group>Duly Authorized University Staff</group>
  </permission>
</permissions>
```

The groups referenced, as implemented for UW-Madison, are often ultimately [Manifest][] groups.

### Optional widget

Optionally, an app directory entry can have an associated widget, either a configuration of a widget type or an entirely custom widget.

See [documentation about expanded widgets](#/md/expanded).

### Keywords

App directory "search" is really filtering, and currently filters over the name, description, and keywords.

```xml
<portlet-preference>
  <name>keywords</name>
  <value>dropbox</value>
  <value>UW Box</value>
  <value>drop box</value>
</portlet-preference>
```

Keywords are not displayed in the user interface to typical users (though there is a beta settings flag to display them, e.g. for troubleshooting purposes).

So keywords end up being a way to increase search matching for content without expanding the description. Typical typoes might also be modeled as keywords so that these will match the content.

See [documentation about search](#/md/search).

### Comments

In the implementation details, it turns out application directory entries are currently XML text files.

This means that arbitrary internal-facing comments can be modeled as XML comments in those files. These won't affect the user-facing application directory. Still, this can be a useful way to keep around notes about why an application directory is configured the way it is or even who its stakeholders are.

## Ratings and reviews

Users with `BROWSE` permission over an app directory entry can see the end-user-facing aspects of that directory entry, including the average rating and number of ratings for the entry.

Users with `BROWSE` permission over an app directory entry can also register their own rating and review.

Users with `MANAGE` permission over an app directory entry can exercise the JSON API to read the reviews associated with that entry.

## App directory implementation details

Currently, the AngularJS-portal app directory *is* the uPortal portlet registry.

This means that the app directory can be viewed and edited via the Portlet Manager tooling in uPortal and that app directory entries are uPortal "entities" bulk loaded via entity import.

## See also

Application directory entries are currently uPortal `portlet-definition` entities.

 * [XSD for `portlet-definition` XML][]

[KB article on referencing content in MyUW]: https://kb.wisc.edu/myuw/page.php?id=52650
[XSD for `portlet-definition` XML]: https://github.com/Jasig/uPortal/tree/master/uportal-war/src/main/resources/xsd/io/portlet-definition
[Font Awesome icons]: https://fortawesome.github.io/Font-Awesome/icons/
[MyUWImages GitLab repo]: https://git.doit.wisc.edu/myuw/MyUWImages
[Manifest]: https://it.wisc.edu/services/manifest/

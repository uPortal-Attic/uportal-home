# The App Directory

## App directory philosophy

`AngularJS-portal` uses the app directory to scale beyond the limitations of stuffing content into boxes on tabs in an old-school portal. Instead, users are encouraged to search over a directory potentially containing more stuff than would have fit on tabs.

This reduces noise and opportunity cost of adding content to the portal. Content that is only interesting to a smaller population can hang out in the directory, ready to be referenced, found, and used, but not bothering anyone who does not go looking for it.

## Anatomy of a directory entry

### Names

* name
* title
* fname

### Description

 * Icon
 * Description
 * Categories
 * Screenshots

### Optional external URL

Optionally an application directory entry can specify an "alternative" URL. This is alternative to using the JSR-286 Portlet associated with the app directory entry.

Where the external URL is specified, AngularJS-portal will prefer "Launch"ing to the external URL rather than launching to the internal portlet.

### Permissions

There are three kinds of permissions one can have over an entry in the app directory.

`SUBSCRIBE` grants permission to *use* the application: to add its widget to your layout, to launch it. Where the backing application is a Portlet in uPortal's portlet container, `SUBSCRIBE` implements coarse-grained access control such that the portlet container will only render the portlet for users with this permission.

`SUBSCRIBE` is granted in a `portlet-definition` entity file via `<group>` elements.

`BROWSE` is intended to grant permission to *know about* the application, to see its application directory entry.

`BROWSE` is granted in a `portlet-definition entity file via `<permission>` elements.

`MANAGE` is a powerful administrative permission intended to grant ability to administer the app. Users with `MANAGE` permission over an app and access to the `Portlet Administration` app in MyUW can edit the `portlet-definition`s for apps they manage. 

### Optional widget

Optionally, an app directory entry can have an associated widget, either a configuration of a widget type or an entirely custom widget.

See [documentation about expanded widgets](#/md/expanded).

### Keywords

App directory "search" is really filtering, and currently filters over the name, description, and keywords.

Keywords are not displayed in the user interface to typical users (though there is a beta settings flag to display them).

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

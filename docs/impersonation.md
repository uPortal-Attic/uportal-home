# Attribute swapping and impersonation in uPortal-home

## What is impersonation?

Impersonation and attribute swapping are uPortal features enabling privileged
users to pretend to be other users or to pretend to have some user attributes
different from their "real" identity.

Some uPortal implementations use these impersonation and attribute swapping
features in some deployment tiers. Some don't.

Where impersonation or attribute swapping are implemented, these features may be
used to support e.g.

* Development
* Troubleshooting
* Testing and quality assurance

## What is special about uPortal-home and impersonation?

### uPortal-home client-side caching

One key to using impersonation or attribute swapping effectively is to adopt
the pretended identity before caching content as the original identity.

uPortal-home and its app framework cache information live in the page and in
browser session storage. You may need to clear the relevant browser session
storage and refresh the page to more fully experience the portal as the assumed
identity.

### Caches may populate sooner through message and widget side effects

uPortal-home may trigger other cache population. Widgets and messages
(notifications and announcements) that rely upon portlet resource URLs for
their JSON may cause portlets to cache data as the identity
active when the widget was rendered or message was resolved.

This may mean that users need to bookmark URLs that actuate the uPortal
rendering pipeline rather than `uPortal-home` (e.g.
`/uPortal/p/user-administration`) and initiate their uPortal sessions with those
bookmarked URLs taking care to not visit any pages rendered by `uPortal-home`
before activating the attribute swapping or impersonation features.

### Impersonation and attribute swapping may only apply selectively

Typically, impersonation and attribute swapping has effect only inside the
uPortal monolith and not e.g. at the Shibboleth SP layer, and so will not apply
to e.g. `rest-proxy`s or other JSON services that `uPortal-home` may call that
get their identity from the context (e.g. headers set by `MOD_SHIB`) rather than
from uPortal APIs.

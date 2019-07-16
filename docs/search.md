# Search in uPortal-home

## Search philosophy

uPortal-home uses search to scale beyond the limitations of stuffing content into boxes on tabs in an old-school portal. Instead, users are encouraged to search over a directory potentially containing more stuff than would have fit on tabs.

## What you can Search

You can search the directory of apps.

If configured, you can also search a directory of people.

Deprecated: Web search integration.

### Search the app directory

Search over the app directory, with the results filtered to what the user can both `BROWSE` and `SUBSCRIBE`.

(May need to revisit presentation of apps the user can `BROWSE` but not `SUBSCRIBE`, in MyUW's case once `BROWSE` permission data is cleaner and more meaningful.)

#### App directory entry search optimization

Dirty secret: this isn't actually search! This is filtering. The implementation simply matches the search term against

+ app names
+ app descriptions
+ keywords

The matching is case-insensitive, but otherwise requires an exact prefix match.  That means that if the user types "goat" that'll match the word "goats", but if the user types "goats" that will not match the word "goat".

### Search an external directory of people

TODO: Document expectations of this integration.

This is optional. If you don't configure it, the directory results section and tab simply do not display.

### Search the Web

**Deprecated.** No `uPortal-home` adopter actively involved in the maintenance
of this open source software product relies upon this feature, so you should
already be skeptical that it works and is maintained. Will be removed in a
future release to more clearly set the expectation that you cannot rely upon
this feature. This feature is nonetheless probably a great idea and if you want
it don't hesitate to get involved in developing and maintaining this
integration. :)

This is optional. If you don't configure it, the Web results section and tab simply do not display.

## Recovering from failed search

Searches that fail to yield any results will display configured failed search recovery options, like submitting feedback or contacting a help desk or searching particular other external sites.

## Multi-tenancy and search

Search is configured in `web-config.js`:

```json
...
.value('SEARCH_CONFIG', [
  {
    "group" : "UW-Madison",
    "directorySearchURL" : "/aries/proxy/wiscdirectory",
    "googleSearchURL" : "/web/api/proxy/wiscedusearch?v=1.0&rsz=10&start=0&cx=02:22m",
    "webSearchURL" : "http://www.wisc.edu/search/?q=",
    "domainResultsLabel" : "Wisc.edu",
    "kbSearchURL" : "https://kb.wisc.edu/search.php?q=",
    "eventsSearchURL" : "https://today.wisc.edu/events/search?search[term]=",
    "helpdeskURL" : "https://kb.wisc.edu/helpdesk/"
  },
  {
    "group" : "UW System-River Falls",
    "googleSearchURL" : "/web/api/proxy/uwrfsearch?key=A&rsz=10&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=41&cx=06:88&googlehost=www.google.com&nocache=11&",
    "webSearchURL" : "https://www.uwrf.edu/AboutUs/SearchResults.cfm?q=",
    "domainResultsLabel" : "UWRF.edu",
    "helpdeskURL" : "https://kb.wisc.edu/helpdesk/"
  },
  {
    "group" : "Everyone",
    "helpdeskURL" : "https://kb.wisc.edu/helpdesk/"
  }

])
...
```

You declare one or more search configurations.  A search configuration has a `group`. The first search configuration matching a user's groups will apply to that user's uPortal-home experience.

Within each search configuration, you can set:

+ `group` (required) : A user must be a member of this group for the search configuration to apply. (Use `Everyone` to match, well, everyone.)

Directory searching (optional):

+ `directorySearchURL`: JSON web service for directory search results (TODO: say something more useful about this)

Web searching (optional; declare all or none):

+ `googleSearchURL` : JSON web service for Web search. **DEPRECATED.**
+ `webSearchURL` : human-facing URL for launching the search query into a full Web search experience. Search query will be appended.
+ `domainResultsLabel` : Your Web search doesn't search the whole Web. That's what the browser address bar is for, after all. So what does it search? This label characterizes that for the user.

Zero-results search recovery (individually optional):

+ `kbSearchURL` : Human-facing URL for launching a knowledge base search, shown only as a zero-results search recovery option. Search query will be appended.
+ `eventsSearchURL` : Human-facing URL for launching an events search, shown only as a zero-results search recovery option. Search query will be appended.
+ `helpdeskURL` : Human-facing URL for launching help desk website, shown only as a zero-results search recovery option.

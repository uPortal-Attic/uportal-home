# What are these files?

(This is not comprehensive documentation on how to configure uPortal Home -- see the documentation site both for this project and [for the `uPortal-app-framework` project][uPortal-app-framework configuration docs] it overlays upon. Rather, this is directory-local reminder of what these files are.)

## `override.js`

Configuration of the uPortal-app-framework for use in this application. `uPortal-home` is itself a uPortal-app-framework application so it needs to configure the framework same as other applications and it additionally configures some home-specific stuff. The out of the box version of `override.js` should work for localhost development.

## `master-override.js`
This file doesn't itself do anything. It's just an example. It's the configuration that you'd put in `override.js` to configure for use with vanilla uPortal.

## `web-config.js`

uPortal-home configuration about being uPortal-home (rather than the `override.js` about being a part of uPortal-app-framework.)

## `login-config.js`

Configuration specific to `uPortal-home` delegating to uPortal for user login. See [documentation](http://uw-madison-doit.github.io/angularjs-portal/silent-login.html).

[uPortal-app-framework configuration docs]: http://uportal-project.github.io/uportal-app-framework/configuration.html

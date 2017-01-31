# Silent login

We needed a way to bootstrap a session in [uPortal][] before fetching data from `/portal/api/*` so we came up with this silent login prestep.

To configure this, override the `js/login-config.js` file and plug in your login URL that will return JSON saying "success". This works really well with Shibboleth since the login should have already happened, this just calls the standard uPortal login code, but since we are saying `silent=true` it'll just return JSON with the username instead of trying to redirect the browser to the uPortal home screen.

To learn more look at `main.js` in `src/main/webapp`.

[uPortal]: http://jasig.github.io/uPortal/

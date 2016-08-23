We needed a way to bootstrap a session in portal before fetching things from `/portal/api/*` so we came up with this silent login prestep.

If you want to configure this, override the `js/login-config.js` file and plug in your login URL that will return JSON saying "success". This works really well with shib since the login should have already happened, this just calls the standard uPortal login code, but since we are saying `silent=true` it'll just return JSON with the username instead of try to redirect the browser to the uPortal home screen.

If you want to learn more look at `main.js` in `src/main/webapp`.

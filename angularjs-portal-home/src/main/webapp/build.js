/*
 * This is an example build file that demonstrates how to use the build system for
 * require.js.
 *
 * THIS BUILD FILE WILL NOT WORK. It is referencing paths that probably
 * do not exist on your machine. Just use it as a guide.
 *
 *
 */

({
    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.
    baseUrl: "./",

    //By default all the configuration for optimization happens from the command
    //line or by properties in the config file, and configuration that was
    //passed to requirejs as part of the app's runtime "main" JS file is *not*
    //considered. However, if you prefer the "main" JS file configuration
    //to be read for the build so that you do not have to duplicate the values
    //in a separate configuration, set this property to the location of that
    //main JS file. The first requirejs({}), require({}), requirejs.config({}),
    //or require.config({}) call found in that file will be used.
    //As of 2.1.10, mainConfigFile can be an array of values, with the last
    //value's config take precedence over previous values in the array.
    mainConfigFile: './main.js',

    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: "../../../target/web/",

    //As of RequireJS 2.0.2, the dir above will be deleted before the
    //build starts again. If you have a big build and are not doing
    //source transforms with onBuildRead/onBuildWrite, then you can
    //set keepBuildDir to true to keep the previous dir. This allows for
    //faster rebuilds, but it could lead to unexpected errors if the
    //built code is transformed in some way.
    keepBuildDir: true,

    //Used to inline i18n resources into the built file. If no locale
    //is specified, i18n resources will not be inlined. Only one locale
    //can be inlined for a build. Root bundles referenced by a build layer
    //will be included in a build layer regardless of locale being set.
    locale: "en-us",

    //How to optimize all the JS files in the build output directory.
    //Right now only the following values
    //are supported:
    //- "uglify": (default) uses UglifyJS to minify the code. Before version
    //2.2, the uglify version was a 1.3.x release. With r.js 2.2, it is now
    //a 2.x uglify release.
    //- "uglify2": in version 2.1.2+. Uses UglifyJS2. As of r.js 2.2, this
    //is just an alias for "uglify" now that 2.2 just uses uglify 2.x.
    //- "closure": uses Google's Closure Compiler in simple optimization
    //mode to minify the code. Only available if running the optimizer using
    //Java.
    //- "closure.keepLines": Same as closure option, but keeps line returns
    //in the minified files.
    //- "none": no minification will be done.
    optimize: "uglify",

    //Introduced in 2.1.2: If using "dir" for an output directory, normally the
    //optimize setting is used to optimize the build bundles (the "modules"
    //section of the config) and any other JS file in the directory. However, if
    //the non-build bundle JS files will not be loaded after a build, you can
    //skip the optimization of those files, to speed up builds. Set this value
    //to true if you want to skip optimizing those other non-build bundle JS
    //files.
    skipDirOptimize: false,

    //Introduced in 2.1.2 and considered experimental.
    //If the minifier specified in the "optimize" option supports generating
    //source maps for the minified code, then generate them. The source maps
    //generated only translate minified JS to non-minified JS, it does not do
    //anything magical for translating minified JS to transpiled source code.
    //Currently only optimize: "uglify2" is supported when running in node or
    //rhino, and if running in rhino, "closure" with a closure compiler jar
    //build after r1592 (20111114 release).
    //The source files will show up in a browser developer tool that supports
    //source maps as ".js.src" files.
    generateSourceMaps: false,

    //Introduced in 2.1.1: If a full directory optimization ("dir" is used), and
    //optimize is not "none", and skipDirOptimize is false, then normally all JS
    //files in the directory will be minified, and this value is automatically
    //set to "all". For JS files to properly work after a minification, the
    //optimizer will parse for define() calls and insert any dependency arrays
    //that are missing. However, this can be a bit slow if there are many/larger
    //JS files. So this transport normalization is not done (automatically set
    //to "skip") if optimize is set to "none". Cases where you may want to
    //manually set this value:
    //1) Optimizing later: if you plan on minifying the non-build bundle JS files
    //after the optimizer runs (so not as part of running the optimizer), then
    //you should explicitly this value to "all".
    //2) Optimizing, but not dynamically loading later: you want to do a full
    //project optimization, but do not plan on dynamically loading non-build
    //bundle JS files later. In this case, the normalization just slows down
    //builds, so you can explicitly set this value to "skip".
    //Finally, all build bundles (specified in the "modules" or "out" setting)
    //automatically get normalization, so this setting does not apply to those
    //files.
    normalizeDirDefines: "skip",

    //Inlines the text for any text! dependencies, to avoid the separate
    //async XMLHttpRequest calls to load those dependencies.
    inlineText: true,

    //Allow "use strict"; be included in the RequireJS files.
    //Default is false because there are not many browsers that can properly
    //process and give errors on code for ES5 strict mode,
    //and there is a lot of legacy code that will not work in strict mode.
    useStrict: true,

    //Finds require() dependencies inside a require() or define call. By default
    //this value is false, because those resources should be considered dynamic/runtime
    //calls. However, for some optimization scenarios, it is desirable to
    //include them in the build.
    //Introduced in 1.0.3. Previous versions incorrectly found the nested calls
    //by default.
    findNestedDependencies: true,

    //If set to true, any files that were combined into a build bundle will be
    //removed from the output folder.
    removeCombined: false,


    //Sets the logging level. It is a number. If you want "silent" running,
    //set logLevel to 4. From the logger.js file:
    //TRACE: 0,
    //INFO: 1,
    //WARN: 2,
    //ERROR: 3,
    //SILENT: 4
    //Default is 0.
    logLevel: 0,

    optimizeCss: 'none',
})

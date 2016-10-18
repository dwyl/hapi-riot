'use strict';

var Path = require('path');
var Riot = require('riot');
var fs = require('fs');

var DEFAULTS = { removeCache: process.env.NODE_ENV !== 'production' };

/*
 * Riot does not Automatically resolve and require nested tags.
 * so loadTags requires all files in the template's directory
 * QUESTION: do we need to require recursively? discuss: https://git.io/viqjY
 */
function loadTags (filename) {
  var viewdir = filename.slice(0, filename.lastIndexOf('/'));

  return fs.readdirSync(viewdir).map(function (file) {
    var filepath = Path.join(viewdir, file);

    if (filepath !== filename && !require.cache[filepath]) {
      require(filepath); //eslint-disable-line
    }

    return filepath;
  });
}

/*
 * during development we want to "un-require" tags to ensure
 * that changes made in components are re-loaded
 */
function unCache (cache) {
  return Array.isArray(cache) && cache.forEach(function (file) {
    delete require.cache[require.resolve(file)];
  });
}


/*
 * Vision expects this format a compile object that returns a runtime method.
 * template is the template name e.g: 'home' or 'dashboard'
 * context is the object (2nd argument) passed in to the reply.view method!
 */
function compile (template, compileOpts) {
  var baseOpts = Object.assign(DEFAULTS, compileOpts); // are we using this?

  return function render (context, renderOpts) {
    var mergedOpts = Object.assign(baseOpts, renderOpts);
    var compiledFileRoute = mergedOpts.compiledFileRoute;
    console.log('MERGED OPTIONS', mergedOpts);
    console.log('CONTEXT', context);
    var CACHE = loadTags(mergedOpts.filename);
    var View = require(mergedOpts.filename); //eslint-disable-line
    var output = '<!DOCTYPE html><html><head/><body><div id="riot_content">'
      + Riot.render(View, context)
      + '</div><script src="https://cdn.jsdelivr.net/riot/2.6/riot.min.js"></script><script src='
      + compiledFileRoute
      + '></script><script>setTimeout(function () {riot.mount("#riot_content", "index",'
      + JSON.stringify(context)
      + ')}, 3000)</script></body></html>'
    ;
    /*
     * Delete the view and layout Tags from the require cache
     * so we don't need to restart the app to see view changes.
     * Skipped By default when NODE_ENV=production`.
     */
    if (mergedOpts.removeCache) {
      unCache(CACHE);
    }

    return output;
  };
}


module.exports = { compile: compile };

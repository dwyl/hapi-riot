'use strict';

var Path = require('path');
var Riot = require('riot');
var fs = require('fs');

var DEFAULTS = { removeCache: process.env.NODE_ENV !== 'production' };

var layoutCache = {};
var tagsLoaded = null; // when null all tags in view directory will be loaded

/*
 * Riot does not Automatically resolve and require nested tags.
 * so loadTags requires all files in the template's directory
 * QUESTION: do we need to require recursively? discuss: https://git.io/viqjY
 */
function loadTags (filename) {
  var viewdir;

  if (tagsLoaded) {
    return; // early return since have already made the requires
  }

  viewdir = filename.slice(0, filename.lastIndexOf('/'));
  tagsLoaded = fs.readdirSync(viewdir).map(function (file) {
    var filepath = Path.join(viewdir, file);

    if (filepath !== filename && !require.cache[filepath]) {
      require(filepath); //eslint-disable-line
    }

    return filepath;
  });
}

function loadLayout (filePath) {
  layoutCache[filePath] = layoutCache[filePath]
    || fs.readFileSync(filePath, 'utf8')
  ;

  return layoutCache[filePath];
}

/*
 * during development we want to "un-require" tags to ensure
 * that changes made in components are re-loaded
 */
function unCache () {
  if (Array.isArray(tagsLoaded)) {
    tagsLoaded.forEach(function (file) {
      delete require.cache[require.resolve(file)];
    });
  }
  tagsLoaded = null;
  layoutCache = {};
}

/*
 * Vision expects this format a compile object that returns a runtime method.
 * template is the template name e.g: 'home' or 'dashboard'
 * context is the object (2nd argument) passed in to the reply.view method!
 */
function compile (template, compileOpts) {
  var baseOpts = Object.assign(DEFAULTS, compileOpts);

  return function render (context, renderOpts) {
    var layoutFilePath, layoutFileName, content, View;
    var mergedOpts = Object.assign(baseOpts, renderOpts);

    loadTags(mergedOpts.filename);
    View = require(mergedOpts.filename); //eslint-disable-line
    content = Riot.render(View, context)
    + '\n<script src="https://cdn.jsdelivr.net/riot/2.6/riot.min.js" ></script>'
    + '\n<script src="/compiled.js" ></script>'
    + '\n<script>\nriot.mount("*",' + JSON.stringify(context) + ')\n</script>'
    ;
    /*
     * Delete the view and layout Tags from the require cache
     * so we don't need to restart the app to see view changes.
     * Skipped By default when NODE_ENV=production`.
     */
    if (mergedOpts.removeCache) {
      unCache();
    }

    if (mergedOpts.layout) {
      layoutFileName = mergedOpts.layout === true
        ? 'layout.html'
        : mergedOpts.layout
      ;
      layoutFilePath = Path.join(mergedOpts.layoutPath, layoutFileName);

      return loadLayout(layoutFilePath).replace('<<<RIOT>>>', content);
    }

    return content;
  };
}


module.exports = { compile: compile };

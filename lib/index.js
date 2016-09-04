'use strict';
var Path = require('path');
var Riot = require('riot');
var fs = require('fs');

var DEFAULTS = {
  doctype: '<!DOCTYPE html>',
  removeCache: process.env.NODE_ENV !== 'production'
};
/**
 * Riot does not Automatically resolve and require nested tags.
 * so loadTags requires all files in the template's directory
 * QUESTION: do we need to require recursively? discuss: https://git.io/viqjY
 */
function loadTags (filename) {
  var viewdir = filename.slice(0, filename.lastIndexOf('/'));
  return fs.readdirSync(viewdir).map(function (file) {
    var filepath = Path.join(viewdir, file);
    if (filepath !== filename && !require.cache[filepath]) {
      require(filepath);
    }
    return filepath;
  });
}

/**
 * during development we want to "un-require" tags to ensure
 * that changes made in components are re-loaded
 */
function unCache (cache) {
  return Array.isArray(cache) && cache.forEach(function (file) {
    delete require.cache[require.resolve(file)];
  });
}

/**
 * Vision expects this format a compile object that returns a runtime method.
 * template is the template name e.g: 'home' or 'dashboard'
 * context is the object (2nd argument) passed in to the reply.view method!
 */
var compile = function compile(template, compileOpts) {

  compileOpts = Object.assign(DEFAULTS, compileOpts); // are we using this?

  return function runtime(context, renderOpts) {

    renderOpts = Object.assign(compileOpts, renderOpts);
    var CACHE = loadTags(renderOpts.filename);
    var View = require(renderOpts.filename);
    var output = renderOpts.doctype;
    output += Riot.render(View, context);
    /*
     * Delete the view and layout Tags from the require cache
     * so we don't need to restart the app to see view changes.
     * Skipped By default when NODE_ENV=production`.
     */
    if (renderOpts.removeCache) {
      // Do we need a layout option?
      // if (renderOpts.layout) {
      //   delete require.cache[require.resolve(layoutPath)];
      // }
      unCache(CACHE);
    }

    return output;
  };
};


module.exports = {
  compile: compile
};

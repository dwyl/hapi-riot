'use strict';
var Hoek = require('hoek');
var Path = require('path');
var Riot = require('riot');
var fs = require('fs');

var DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    removeCache: process.env.NODE_ENV !== 'production',
    layout: undefined,
    layoutPath: undefined
};

function load (filename) {
  var viewdir = filename.slice(0, filename.lastIndexOf('/'));
  var files = fs.readdirSync(viewdir);
  console.log('files', files);
  files.forEach(function(file) {
    var filepath = Path.join(viewdir, file);
    console.log(filepath);
    if (filepath !== filename && !require.cache[filepath]) {
      console.log('require:', filepath);
      require(filepath);
    }
  });
  return;
}

var compile = function compile(template, compileOpts) {

    console.log('__dirname', __dirname);

    console.log('template:', template);
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');

    console.log('compileOpts (BEFORE)', compileOpts);
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    console.log('compileOpts (AFTER)', compileOpts);
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');

    return function runtime(context, renderOpts) {

        console.log('context:', context);
        console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');

        console.log('renderOpts (BEFORE)', renderOpts);
        console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');
        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        console.log('renderOpts (BEFORE)', renderOpts);
        console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');

        load(renderOpts.filename);

        var View = require(renderOpts.filename);

        var output = renderOpts.doctype;
        output += Riot.render(View, context);
/*
        let layoutPath;

        if (renderOpts.layout) {
            layoutPath = Path.join(renderOpts.layoutPath, renderOpts.layout);
            let Layout = require(layoutPath);
            // support for es6 default export semantics
            Layout = Layout.default || Layout;

            const LayoutElement = React.createFactory(Layout);

            const viewOutput = ReactDOMServer[renderOpts.renderMethod](ViewElement(context));

            output += ReactDOMServer[renderOpts.layoutRenderMethod](LayoutElement(context, viewOutput));
        }
        else {
            output += ReactDOMServer[renderOpts.renderMethod](ViewElement(context));
        }
*/
        /*
         * Transpilers tend to take a while to start up. Here we delete the
         * view and layout modules from the require cache so we don't need to
         * restart the app to see view changes. Skipped By default when
         * `NODE_ENV=production`.
         */
        if (renderOpts.removeCache) {

            if (renderOpts.layout) {
                var layoutModule = require.resolve(layoutPath);
                delete require.cache[layoutModule];
            }

            var module = require.resolve(renderOpts.filename);
            delete require.cache[module];
        }

        return output;
    };
};


module.exports = {
    compile: compile
};

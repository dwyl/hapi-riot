'use strict';
const Hoek = require('hoek');
const Path = require('path');
const Riot = require('riot');

const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    removeCache: process.env.NODE_ENV !== 'production',
    layout: undefined,
    layoutPath: undefined,
    layoutRenderMethod: 'renderToStaticMarkup'
};

const compile = function compile(template, compileOpts) {

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

        let View = require(renderOpts.filename);
        // support for es6 default export semantics
        // View = View.default || View;


        let output = renderOpts.doctype;
        output += Riot.render(require('../example/views/index.tag'));
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
                const layoutModule = require.resolve(layoutPath);
                delete require.cache[layoutModule];
            }

            const module = require.resolve(renderOpts.filename);
            delete require.cache[module];
        }

        return output;
    };
};


module.exports = {
    compile: compile
};

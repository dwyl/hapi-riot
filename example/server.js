'use strict';
const Hapi = require('hapi');
const Path = require('path');
const Vision = require('vision');
const HapiReactViews = require('../lib');


// require('babel-core/register')({
//     presets: ['react', 'es2015']
// });


const server = new Hapi.Server();
var port = process.env.PORT || 8000;
server.connection({ port: port });
server.register(Vision, (err) => {

    if (err) {
        console.log('Failed to load vision.');
    }

    server.views({
        engines: {
            tag: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'views',
        // compileOptions: {
        //     layoutPath: Path.join(__dirname, 'views'),
        //     layout: 'layout'
        // }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {

            reply.view('index', { title: 'Home Page' });
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/about',
    //     handler: (request, reply) => {
    //
    //         reply.view('about', { title: 'About Page' });
    //     }
    // });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});

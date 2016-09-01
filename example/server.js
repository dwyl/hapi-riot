'use strict';
const Hapi = require('hapi');
const Path = require('path');
const Vision = require('vision');
const HapiRiotViews = require('../lib');

const server = new Hapi.Server();
var port = process.env.PORT || 8000;
server.connection({ port: port });
server.register(Vision, (err) => {

    if (err) {
      console.log('Failed to load vision.');
    }

    server.views({
      engines: {
        tag: HapiRiotViews
      },
      relativeTo: __dirname,
      path: 'views',
      compileOptions: {
        // test: 'true',
        // layoutPath: Path.join(__dirname, 'views'),
        // layout: 'layout'
      }
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        var items = [
          { title: 'Learn Riot', status: done },
          { title: 'Investigate ' }
        ]
        reply.view('index', { title: 'My Amazing Title!', greeting: 'Hello!' });
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

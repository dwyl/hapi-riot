'use strict';
const Hapi = require('hapi');
const Path = require('path');
const Vision = require('vision');
const HapiRiotViews = require('../../lib');

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
    compileOptions: { // keeping these here till we add "Universal"
      // test: 'true',
      // layoutPath: Path.join(__dirname, 'views'),
      // layout: 'layout'
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index', { title: 'My Amazing Title!' });
      // reply('hello');
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

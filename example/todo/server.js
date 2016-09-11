'use strict';
var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert')
var HapiRiotViews = require('../../lib/index.js');

var server = new Hapi.Server();
var port = process.env.PORT || 8000;

// obviously this be per-user in a Data Store
var state = [
  { title: 'Avoid excessive caffeine', done: true },
  { title: 'Hidden item',  hidden: true },
  { title: 'Be nice to people', done: true  },
  { title: 'Learn how to use Riot.js' }
]

server.connection({ port: port });
server.register(Vision, (err) => {
  assert(!err); // Halt start if Vision fails to load.

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
      var opts = {
        title: 'My Amazing Title!',
      }
      reply.view('index', opts);
    }
  });

  server.route({
      method: 'POST',
      path: '/save',
      handler: (request, reply) => {
        console.log('pay', request.payload);
        if(request.payload.input) {
          console.log('new: ', {title: request.payload.input})
          state.push({title: request.payload.input});
        }
        reply.view('index', {items: state });
      }
  });

  server.start((err) => {
    assert(!err); // Throw error if server fails to start
    console.log('Server is listening at ' + server.info.uri);
  });
});

module.exports = server;

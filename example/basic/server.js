'use strict';

var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert');
var Path = require('path');
var Inert = require('inert');

var HapiRiotViews = require('../../lib/index.js');

var server = new Hapi.Server();
var port = process.env.PORT || 8000;

server.connection({ port: port });

server.register([Vision, Inert], function (err) {
  assert(!err); // Halt start if Vision fails to load.

  server.views({
    engines: { tag: HapiRiotViews },
    relativeTo: __dirname,
    path: 'views',
    compileOptions: {
      layoutPath: Path.join(__dirname, 'layout'),
      layout: true,
      compiledFileRoute: '/bundle.js'
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index', { title: 'My Amazing Title!' });
    }
  });

  server.route({
    method: 'GET',
    path: '/hello/{yourname*}',
    handler: function (request, reply) {
      reply.view('hello', { name: request.params.yourname || 'World' });
    }
  });

  server.route({
    method: 'GET',
    path: '/bundle.js',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, 'bundle.js'));
    }
  });

  server.start(function (error) {
    assert(!error); // Throw error if server fails to start
    console.log('Server is listening at ' + server.info.uri); // eslint-disable-line
  });
});

module.exports = server;

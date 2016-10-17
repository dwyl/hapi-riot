'use strict';

var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert');
var HapiRiot = require('../../lib/index.js');
var Inert = require('inert');
var Path = require('path');

var server = new Hapi.Server();
var port = process.env.PORT || 8000;

server.connection({ port: port });

server.register([Vision, Inert], function (err) {
  assert(!err); // Halt start if Vision fails to load.

  server.views({
    engines: { tag: HapiRiot },
    relativeTo: __dirname,
    path: 'views',
    compileOptions: {}
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index', { counter: 5 });
    }
  });

  server.route({
    method: 'GET',
    path: '/riot.js',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, 'compiled.js'));
    }
  });

  server.start(function () {
    console.log('Server is listening at ' + server.info.uri); // eslint-disable-line
  });
});

module.exports = server;

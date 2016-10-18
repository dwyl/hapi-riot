'use strict';

var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert');
var Inert = require('inert');
var Path = require('path');

var HapiRiot = require('../../lib/index.js');


var server = new Hapi.Server();
var port = process.env.PORT || 8000;

server.connection({ port: port });

server.register([Vision, Inert], function (err) {
  assert(!err); // Halt start if Vision fails to load.

  server.views({
    engines: { tag: HapiRiot },
    relativeTo: __dirname,
    compileOptions: {
      layoutPath: Path.join(__dirname, 'layout'),
      layout: 'not_default.html'
    },
    path: 'views'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index', { counter: 5, title: 'Try it' });
    }
  });

  server.route({
    method: 'GET',
    path: '/compiled.js',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, 'compiled.js'));
    }
  });

  server.start(function () {
    console.log('Server is listening at ' + server.info.uri); // eslint-disable-line
  });
});

module.exports = server;

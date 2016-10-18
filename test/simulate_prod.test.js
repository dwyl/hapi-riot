'use strict';

var test = require('tape');
var decache = require('decache');
var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert');


test('Simulate Production', function (t) {
  var server = new Hapi.Server();

  server.connection(0);

  decache('../lib/index.js');

  server.register(Vision, function (err) {
    assert(!err); // Halt start if Vision fails to load.
    t.plan(2);

    server.views({
      engines: { tag: require('../lib/index.js') }, //eslint-disable-line
      relativeTo: __dirname,
      path: 'views',
      compileOptions: { removeCache: false } // i.e. cache all views
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply.view('index', { title: 'My Amazing Title!' });
      }
    });
    // TEST HERE
    server.inject({ url: '/' }, function (response) {
      var expected = 'My Amazing Title!';

      t.ok(
        response.result.indexOf(expected) > -1,
        'Result contains ' + expected
      );
    });

    server.inject({ url: '/' }, function (response) {
      var expected = 'My Amazing Title!';

      t.ok(
        response.result.indexOf(expected) > -1,
        'Uses cache ok'
      );
    });
  });
});

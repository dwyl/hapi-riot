'use strict';

var test = require('tape');
var decache = require('decache');
var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert');

var HapiRiot = require('../lib/index.js');

test('Simulate Production', function (t) {
  var server = new Hapi.Server();

  server.connection(0);

  server.register(Vision, function (err) {
    // console.log('ERR >>>> ', err);
    assert(!err); // Halt start if Vision fails to load.
    decache('../lib/index.js');

    server.views({
      engines: { tag: HapiRiot },
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
      server.stop(t.end);
    });
  });
});

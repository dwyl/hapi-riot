'use strict';
var test = require('tape');
var decache = require('decache');
var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert')

test('Simulate Production', function (t) {

  var server = new Hapi.Server();
  server.connection(0);

  server.register(Vision, (err) => {
    // console.log('ERR >>>> ', err);
    assert(!err); // Halt start if Vision fails to load.
    decache('../lib/index.js');

    server.views({
      engines: {
        tag: require('../lib/index.js')
      },
      relativeTo: __dirname,
      path: 'views',
      compileOptions: {
        removeCache: false // i.e. cache all views
      }
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply.view('index', { title: 'My Amazing Title!' });
      }
    });

    // TEST HERE
    var options = { url: '/' };
    server.inject(options, (response) => {
      console.log(response.result);
      var expected = 'My Amazing Title!';
      t.ok(response.result.indexOf(expected) > -1, 'Result contains ' + expected);
      t.end(server.stop( function () {}));
    });

  });
});

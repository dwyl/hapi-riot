/*
var test = require('tape');
var decache = require('decache');
decache('../lib/index.js');
decache('../example/basic/server.js');
process.env.PORT = Math.ceil(Math.random() * 10000);
process.env.NODE_ENV = 'production'; // simulate production (cache enabled)


test.only('Simulate Production', function (t) {

  'use strict';
  var Hapi = require('hapi');
  var Vision = require('vision');
  var assert = require('assert')
  var HapiRiotViews = require('../lib/index.js');

  var server = new Hapi.Server();
  server.connection(0);
  server.register(Vision, (err) => {
    console.log('ERR >>>> ', err);
    assert(!err); // Halt start if Vision fails to load.

    server.views({
      engines: {
        tag: HapiRiotViews
      },
      relativeTo: __dirname,
      path: 'views'
    });
  });

  var context = { title: 'No View.' };
  server.render('index', context, (err, output) => {
    console.log(err, output);
    t.end(prodserver.stop( function () {}));
  });
  // prodserver.inject(options, function(response) {
  //   console.log(response.result);
  //   // var expected = '<p>Hello Production!</p>';
  //   // t.ok(response.result.indexOf(expected) > -1, 'Hello Production!');
  //   t.end(prodserver.stop( function () {}));
  // });
});
*/

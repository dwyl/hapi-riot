'use strict';

var test = require('tape');

var server = require('../example/basic/server.js');

test('render the homepage', function (t) {
  var options = { url: '/' };

  server.inject(options, function (response) {
    var expected = 'My Amazing Title!';

    t.ok(
      response.result.indexOf(expected) > -1,
      'Home Page Component Rendered!'
    );
    server.stop(t.end);
  });
});

test('Renderer returns rendered "Hello {name}" Component', function (t) {
  var options = { url: '/hello/Sunshine' };

  server.inject(options, function (response) {
    var expected = '<p>Hello Sunshine!</p>';

    t.ok(response.result.indexOf(expected) > -1, 'Hello Sunshine!');
    server.stop(t.end);
  });
});

test('Renderer returns rendered "Hello {name}" Component', function (t) {
  var options = { url: '/hello' };

  server.inject(options, function (response) {
    var expected = '<p>Hello World!</p>';

    t.ok(response.result.indexOf(expected) > -1, 'Hello World!');
    server.stop(t.end);
  });
});

// TODO: add error test (when view.tag does not exist)
// test.only('it returns 500 error when the path misses', (t) => {
//
//   var context = { title: 'No View.' };
//   server.render('fail', context, (err, output) => {
//     t.end(server.stop( function () {}));
//   });
// });

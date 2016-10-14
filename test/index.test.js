'use strict';

var test = require('tape');
var path = require('path');

var HapiRiot = require('../lib/index.js'); // yes, the /index.js can be omitted

var server = require('../example/basic/server.js');

test('Renderer has compile method', function (t) {
  t.equal(typeof HapiRiot, 'object', 'HapiRiot is an Object');
  t.equal(typeof HapiRiot.compile, 'function', 'HapiRiot has a compile method');
  t.end();
});

test('Manually test the compile method (witout a server)', function (t) {
  var filename = path.join(__dirname, 'views', 'index.tag');
  // yes, the fomat of the .compile method is a curry...
  var actual = HapiRiot.compile(0, { filename: filename })(
    { title: 'Beautiful!' }
  );
  var expected = '<h1>Hello Beautiful!</h1>';

  t.comment('>>> filename: ', filename);
  t.ok(actual.indexOf(expected) > -1, 'Hello Beautiful!');
  t.end();
});

test('render the homepage', function (t) {
  var options = { url: '/' };

  server.inject(options, function (response) {
    var expected = 'My Amazing Title!';

    t.comment(' - - - - - - - - - - - - - - - - - -');
    t.comment(response.result);
    t.comment(' - - - - - - - - - - - - - - - - - -');
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

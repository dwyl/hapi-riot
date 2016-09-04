var test = require('tape');
var hapiriot = require('../lib/index.js'); // yes, the /index.js can be omitted

test('Renderer has compile method', function (t) {
  t.equal(typeof hapiriot, 'object', 'hapiriot is an Object');
  t.equal(typeof hapiriot.compile, 'function', 'hapiriot has a compile method');
  t.end();
});

var server = require('../example/basic/server.js');

// test('server has start method', (t) => {
//   server
//   t.equal(typeof server, 'object')
//   t.end();
// });

test('render the homepage', function (t) {
  var options = {
    url: '/'
  }

  server.inject(options, function(response) {
    console.log(' - - - - - - - - - - - - - - - - - -');
    console.log(response.result);
    console.log(' - - - - - - - - - - - - - - - - - -');
    var expected = 'My Amazing Title!';
    t.ok(response.result.indexOf(expected) > -1, 'Home Page Component Rendered!');
    t.end(server.stop( function () {}));
  });
});

test('Renderer returns rendered "Hello {name}" Component', function (t) {
  var options = {
    url: '/hello/Sunshine'
  }

  server.inject(options, function(response) {
    var expected = '<p>Hello Sunshine!</p>';
    t.ok(response.result.indexOf(expected) > -1, 'Hello Sunshine!');
    t.end(server.stop( function () {}));
  });
});

test('Renderer returns rendered "Hello {name}" Component', function (t) {
  var options = {
    url: '/hello'
  }

  server.inject(options, function(response) {
    var expected = '<p>Hello World!</p>';
    t.ok(response.result.indexOf(expected) > -1, 'Hello World!');
    t.end(server.stop( function () {}));
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

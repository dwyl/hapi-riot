var test = require('tape');
var hapiriot = require('../lib/index.js'); // yes, the /index.js can be omitted
var basicserver = require('../example/basic/server.js');

test('Renderer has compile method', function (t) {
  t.equal(typeof hapiriot, 'object', 'hapiriot is an Object');
  t.equal(typeof hapiriot.compile, 'function', 'hapiriot has a compile method');
  t.end();
});

// test.only('Renderer has compile method', function (t) {
//   var res = hapiriot.compile({filename: 'index'});
//   console.log(res.toString());
//   t.equal(typeof hapiriot.compile, 'function', 'hapiriot has a compile method');
//   t.end();
// });


test('render the homepage', function (t) {
  var options = {
    url: '/'
  }

  basicserver.inject(options, function(response) {
    console.log(response.result);
    var expected = 'My Amazing Title!';
    t.ok(response.result.match(expected), 'Home Page Component Rendered!');
    t.end(basicserver.stop( function () {}));
  });
});

test('Renderer returns rendered "Hello {name}" Component', function (t) {
  var options = {
    url: '/hello/Sunshine'
  }

  basicserver.inject(options, function(response) {
    var expected = '<p>Hello Sunshine!</p>';
    t.ok(response.result.indexOf(expected) > -1, 'Hello World!');
    t.end(basicserver.stop( function () {}));
  });
});

test('Renderer returns rendered "Hello {name}" Component', function (t) {
  var options = {
    url: '/hello/Sunshine'
  }

  basicserver.inject(options, function(response) {
    var expected = '<p>Hello Sunshine!</p>';
    t.ok(response.result.indexOf(expected) > -1, 'Hello World!');
    t.end(basicserver.stop( function () {}));
  });
});




// TODO: add error test (when view.tag does not exist)
// test.only('it returns 500 error when the path misses', (t) => {
//
//   var context = { title: 'No View.' };
//   basicserver.render('fail', context, (err, output) => {
//     t.end(basicserver.stop( function () {}));
//   });
// });

var test = require('tape');
var hapiriot = require('../lib/index.js'); // yes, the /index.js can be omitted

var basicserver = require('../example/basic/server.js');

test('Renderer has compile method', function (t) {
  t.equal(typeof hapiriot, 'object', 'hapiriot is an Object');
  t.equal(typeof hapiriot.compile, 'function', 'hapiriot has a compile method');
  t.end();
});

test('Renderer returns rendered "Hello" Component', function (t) {
  var options = {
    url: '/hello/Sunshine'
  }

  basicserver.inject(options, function(response) {
    var expected = '<p>Hello Sunshine!</p>';
    t.ok(response.result.indexOf(expected) > -1, 'Hello World!');
    t.end(basicserver.stop( function () {

    }));
  });
});


// TODO: add error test (when view.tag does not exist)

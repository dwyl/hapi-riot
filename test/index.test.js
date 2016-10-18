'use strict';

var test = require('tape');
var path = require('path');

var HapiRiot = require('../lib/index.js'); // yes, the /index.js can be omitted

test('Renderer has compile method', function (t) {
  t.equal(typeof HapiRiot, 'object', 'HapiRiot is an Object');
  t.equal(typeof HapiRiot.compile, 'function', 'HapiRiot has a compile method');
  t.end();
});

test('Manually test the compile method (witout a server)', function (t) {
  var filename = path.join(__dirname, 'views', 'index.tag');
  // yes, the format of the .compile method is a curry...
  var actual = HapiRiot.compile(0, { filename: filename })(
    { title: 'Beautiful!' }
  );
  var include1 = '<h1>Hello Beautiful!</h1>';
  var include2 = 'riot.mount';

  t.ok(actual.indexOf(include1) > -1, 'Hello Beautiful!');
  t.ok(actual.indexOf(include2) > -1, 'script added to hydrate js');
  t.end();
});

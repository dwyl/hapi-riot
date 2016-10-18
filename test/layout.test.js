'use strict';

var test = require('tape');

var server = require('../example/counter/server.js');

test('render with different layout', function (t) {
  var options = { url: '/' };

  server.inject(options, function (response) {
    var expected = 'Different Layout';

    t.ok(
      response.result.indexOf(expected) > -1,
      'Different layout html given and correctly produced'
    );
    server.stop(t.end);
  });
});

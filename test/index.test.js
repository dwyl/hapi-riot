var test = require('tape');
var hapiriot = require('../lib/index.js'); // yes, the /index.js can be omitted

test('Renderer', function (t) {
  t.equal(typeof hapiriot, 'object', 'hapiriot is an Object');
  t.equal(typeof hapiriot.compile, 'function', 'hapiriot has a compile method');
  t.end();
});

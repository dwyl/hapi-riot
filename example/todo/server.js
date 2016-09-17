'use strict';
var Hapi = require('hapi');
var Vision = require('vision');
var assert = require('assert');
var level = require('level'); // https://github.com/Level/level
var db = level(__dirname + '/db');
var HapiRiotViews = require('../../lib/index.js');

var server = new Hapi.Server();
var port = process.env.PORT || 8000;

// obviously this be per-user in a Data Store
var state = [
  { title: 'Avoid excessive caffeine', done: true },
  { title: 'Hidden item',  hidden: true },
  { title: 'Be nice to people', done: true  },
  { title: 'Learn how to use Riot.js' }
]

server.connection({ port: port });
server.register(Vision, (err) => {
  assert(!err); // Halt start if Vision fails to load.

  server.views({
    engines: {
      tag: HapiRiotViews
    },
    relativeTo: __dirname,
    path: 'views',
    compileOptions: { // keeping these here till we add "Universal"
      // test: 'true',
      // layoutPath: Path.join(__dirname, 'views'),
      // layout: 'layout'
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      db.get('todolist', function (err, value) {
        console.log("db.get('todolist') err", err, "value:", value);
        var opts = value ? JSON.parse(value) : {};
        opts.title = 'My Todo List';
        opts.items = opts.items || [];
        opts.items.push({title: 'totes done', done: true });
        reply.view('index', opts);
      })
    }
  });

  server.route({
      method: 'POST',
      path: '/save',
      handler: (request, reply) => {
        console.log('request.payload', request.payload);
        db.get('todolist', function (err, value) {
          console.log("db.get('todolist') err", err, "value:", value);
          var opts = value ? JSON.parse(value) : {};
          opts.title = 'My Todo List';
          opts.items = opts.items || [];
          if(request.payload.input) {
            console.log('new: ', {title: request.payload.input})
            opts.items.push({title: request.payload.input});
          }
          db.put('todolist', JSON.stringify(opts), function (err) {
            opts.items.push({title: 'totes done', done: true });
            console.log("db.put('todolist') err", err);
            reply.view('index', opts);
          });
        });
      }
  });

  server.start((err) => {
    assert(!err); // Throw error if server fails to start
    console.log('Server is listening at ' + server.info.uri);
  });
});

module.exports = server;

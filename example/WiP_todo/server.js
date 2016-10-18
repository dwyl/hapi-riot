'use strict';

var Hapi = require('hapi');
var Vision = require('vision');
var Inert = require('inert');
var assert = require('assert');
var level = require('level'); // https://github.com/Level/level
var path = require('path');
var db = level(path.join(__dirname, '/db'));

var HapiRiot = require('../../lib/index.js');

var server = new Hapi.Server();
var port = process.env.PORT || 8000;

server.connection({ port: port });
server.register([Vision, Inert], function (err) {
  assert(!err); // Halt start if Vision fails to load.

  server.views({
    engines: { tag: HapiRiot },
    relativeTo: __dirname,
    path: 'views',
    compileOptions: {
      layoutPath: path.join(__dirname, 'layout'),
      layout: true,
      compiledFileRoute: '/bundle.js'
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      db.get('todolist', function (_, value) {
        var opts = value ? JSON.parse(value) : {};

        opts.items = opts.items || [];
        opts.path = '/all';
        reply.view('index', opts);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/save',
    handler: function (request, reply) {
      // console.log(' - - - - - - - - - - - - - - - - - ');
      // console.log('request.payload', request.payload);
      // console.log(' - - - - - - - - - - - - - - - - - ');

      db.get('todolist', function (_, value) {
        // console.log("db.get('todolist') err", err, "value:", value);
        var titles;
        var done = [];
        var opts = value ? JSON.parse(value) : {};

        opts.title = 'My Todo List';
        opts.items = opts.items || [];
        // prevent duplicate items
        titles = opts.items.map(function (item) {
          return item.title;
        });

        if (request.payload.input
          && titles.indexOf(request.payload.input) === -1
        ) {
          opts.items.push({
            title: request.payload.input,
            id: opts.items.length
          });
        }
        // mark totdo items as done
        if (request.payload) {
          Object.keys(request.payload).forEach(function (k) {
            if (k.indexOf('isdone') > -1) {
              done.push(parseInt(k.split('isdone-')[1], 10));
            }
          });

          opts.items = opts.items.map(function (item) {
            if (item && done.indexOf(item.id) > -1) {
              item.done = true;
            }

            return item;
          });
        }
        db.put('todolist', JSON.stringify(opts), function () {
          /* opts.items.push({
            title: 'Write Server-Side-Rendered todo-list example in Riot.js',
            done: true
          }); */
          opts.path = '/all';
          reply.view('index', opts);
        });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/active',
    handler: function (request, reply) {
      db.get('todolist', function (_, value) {
        var opts = value ? JSON.parse(value) : {};

        opts.items = opts.items || [];
        opts.items = opts.items.filter(function (item) {
          return !item.done;
        });
        opts.path = request.path;
        reply.view('index', opts);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/done',
    handler: function (request, reply) {
      db.get('todolist', function (_, value) {
        var opts = value ? JSON.parse(value) : {};

        opts.items = opts.items || [];
        opts.items.push({
          title: 'Write Server-Side-Rendered todo-list example in Riot.js',
          done: true
        });
        opts.items = opts.items.filter(function (item) {
          return item.done;
        });
        console.log('request.path', request.path); // eslint-disable-line
        opts.path = request.path;
        reply.view('index', opts);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/bundle.js',
    handler: function (request, reply) {
      reply.file(path.join(__dirname, 'bundle.js'));
    }
  });

  server.start(function (error) {
    assert(!error); // Throw error if server fails to start
    console.log('Server is listening at ' + server.info.uri); // eslint-disable-line
  });
});

module.exports = server;

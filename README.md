# `hapi-riot`

Helps you ***Render Riot Components Server-side*** in your Hapi.js Web Application.

[![Build Status](https://travis-ci.org/dwyl/hapi-riot.svg?branch=master)](https://travis-ci.org/dwyl/hapi-riot)
[![codecov](https://codecov.io/gh/dwyl/hapi-riot/branch/master/graph/badge.svg)](https://codecov.io/gh/dwyl/hapi-riot)
[![Code Climate](https://codeclimate.com/github/dwyl/hapi-riot/badges/gpa.svg)](https://codeclimate.com/github/dwyl/hapi-riot)
[![dependencies Status](https://david-dm.org/dwyl/hapi-riot/status.svg)](https://david-dm.org/dwyl/hapi-riot)
[![devDependencies Status](https://david-dm.org/dwyl/hapi-riot/dev-status.svg)](https://david-dm.org/dwyl/hapi-riot?type=dev)

## _Why?_

We _really_ like the _simplicity_ of Riot.js.  
If you want to know _why_ we think Riot.js is (_much_) "_better_"
than _other_ "_View Libraries_" or "_Frameworks_",
please see:


## _What?_

Server-side rendering of Riot Components using the Vision Plugin.

## _How_?

### Install

```sh
npm install hapi vision hapi-riot --save
```

### Use it

```js
server.register(Vision, (err) => {

  if (err) {
    console.log('Failed to load vision.');
  }

  server.views({ // initialise
    engines: {
      tag: require('hapi-riot') // file should be .tag
    },
    relativeTo: __dirname, // assuming your
    path: 'views' // by convention we put our tags in /views dir
  });

  server.route({ // define the route
    method: 'GET',
    path: '/',
    handler: (request, reply) => { // render the view:
      reply.view('index', { title: 'My Amazing Title!');
    }
  });
}
```

> More/Complete examples are in the `/examples` directory.  
> If you need more, just ask! https://github.com/dwyl/hapi-riot/issues


## _Optional_ `compileOptions` (_That Simplify Your Life_!)

We have added a few _features_ to _simplify_ our own projects.  
These are _documented_ below, but are not meant to be fit for _everyone_.
None are enabled by _default_ so if you "just" want to render simple
Riot Components as your Hapi Views, follow the simple example.

### Doctype (_default_)

Riot does not like it when you include "unbalanced" tags.
So, instead of *manually* including the `DOCTYPE` declaration at the top
of your tag it gets "_injected_" at the top of the rendered view
by `hapi-riot`.


### `removeCache`

While you are _developing_ your app you typically don't want
your views to be _cached_, however, when you deploy your app
by setting `NODE_ENV=production` views will be cached.

If for _any_ reason you _want_ to cache your views during development,
or if you need to debug production on your localhost,
set the `compileOptions.removeCache: false` like this:

```js
server.views({ // initialise
  engines: {
    tag: require('hapi-riot') // file should be .tag
  },
  relativeTo: __dirname, // assuming your
  path: 'views', // by convention we put our tags in /views dir
  compileOptions: {
    removeCache: false
  }
});
```

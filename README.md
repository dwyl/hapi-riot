# hapi-riot

[![Build Status](https://travis-ci.org/dwyl/hapi-riot.svg?branch=master)](https://travis-ci.org/dwyl/hapi-riot)
[![codecov](https://codecov.io/gh/dwyl/hapi-riot/branch/master/graph/badge.svg)](https://codecov.io/gh/dwyl/hapi-riot)
[![Code Climate](https://codeclimate.com/github/dwyl/hapi-riot/badges/gpa.svg)](https://codeclimate.com/github/dwyl/hapi-riot)
[![dependencies Status](https://david-dm.org/dwyl/hapi-riot/status.svg)](https://david-dm.org/dwyl/hapi-riot)
[![devDependencies Status](https://david-dm.org/dwyl/hapi-riot/dev-status.svg)](https://david-dm.org/dwyl/hapi-riot?type=dev)

Render Riot Components Server-side in your Hapi Web Application.

## _Why?_

We _really_ like the _simplicity_ of Riot.js.  
If you want to know _why_ we think Riot.js is (_much_) "_better_"
than _other_ "_View Libraries_" or "_Frameworks_",
please see:


## _What?_

Server-side rendering of Riot Components using the Vision Plugin.

> **Note**: we have added a few _features_ to simplify our own projects.  
These are _documented_ below, but are not meant to be fit for _everyone_.
None are enabled by _default_ so if you "just" want to render simple
Riot Components as your Hapi Views, follow the simple example.

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


## _Optional_ `compileOptions` (_That Simplify Your Life_!)

# `hapi-riot`

***Render Riot Components Server-side*** in your Hapi.js Web Application.  
<small>(_supports progressive enhancement on the client so it **Works Everywhere All The Time<sup>TM</sup>**_)</small>

[![Build Status](https://travis-ci.org/dwyl/hapi-riot.svg?branch=master)](https://travis-ci.org/dwyl/hapi-riot)
[![codecov](https://codecov.io/gh/dwyl/hapi-riot/branch/master/graph/badge.svg)](https://codecov.io/gh/dwyl/hapi-riot)
[![Code Climate](https://codeclimate.com/github/dwyl/hapi-riot/badges/gpa.svg)](https://codeclimate.com/github/dwyl/hapi-riot)
[![dependencies Status](https://david-dm.org/dwyl/hapi-riot/status.svg)](https://david-dm.org/dwyl/hapi-riot)
[![devDependencies Status](https://david-dm.org/dwyl/hapi-riot/dev-status.svg)](https://david-dm.org/dwyl/hapi-riot?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/hapi-riot/issues)

## _Why?_

We _love_ the _simplicity_ of Riot.js.  
Riot has the "_features_" we _need_ and none of the _complexity_ we don't want.  
Riot's clean syntax results in components with ***less code*** than _other_  
"_View Libraries_" or "_Frameworks_" see: http://riotjs.com/compare/

Writing less code means you (_the developer/designer_) _**get more done**_,  
have _**less to maintain**_ and the _people using your app_  
have to download fewer bytes thus _**saves time/bandwidth**_.

It's a win-win for _everyone_.

### Why _Server-Side_ Rendering Matters ?

If you render your app on the client/device at least
**_1%_ of your people will see a _blank page_** (no app).  
The people who won't _see_ your app are _**your potential users/customers**_ who
for one reason or another don't have the _latest device/browser_,
don't have the most _reliable_ internet connection
or have _dissabled JavaScript_ in their browser for [_**security reasons**_](http://programmers.stackexchange.com/questions/26179/why-do-people-disable-javascript).

### The Page _Loads Faster_...

Pages rendered on the server can send the _absolute minimum_ markup to the client.
This means the "_time to first paint_" is **_always_ faster** than loading a client-side framework
and rendering a page on the client. So, your app/site _is_ and _feels_ faster to people.

### Why aren't all apps built this way?

Good question! _Most_ developers are lazy. They _deny_ the _existence_ of
older browsers/devices as the "minority" convinced that it's "_more work_"
than they _need_ to do.

We are on a _quest_ to _change_ the perception that _universal_ rendering is
"_more difficult_" and help people write code that _**Works Everywhere All The Time<sup>TM</sup>**_

#### Read More

+ The 1% figure - https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/
+ Why you _should_ support JS disabled: http://www.punkchip.com/why-support-javascript-disabled/


## _What?_

Server-side rendering of Riot Components using the [_Vision_](https://github.com/hapijs/vision) Plugin.


> Note if you are totally new to Hapi.js see:
[https://github.com/dwyl/**learn-hapi**](https://github.com/dwyl/learn-hapi)  
> And/or if you are new to Riot.js check out:
[https://github.com/dwyl/**learn-riot**](https://github.com/dwyl/learn-riot)


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

> Note: More/Complete examples are in the `/examples` directory.  
> If you stuck or need any help just ask! https://github.com/dwyl/hapi-riot/issues


## _Optional_ `compileOptions` (_That Simplify Your Life_!)

We have added a few _features_ to _simplify_ our own projects.  
These are _documented_ below, but are not meant to be fit for _everyone_.
None are enabled by _default_ so if you "just" want to render simple
Riot Components as your Hapi Views, follow the simple example.

### `doctype` (_default_)

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



## Lessons Learned & "Gotchas"

### 1. Don't leave tag files empty!

e.g: if you create a new tag `views/bye.tag` and _forget_ to
write some `html` code inside it you will see a _stranage_ error
when you attempt to render it or _any other existing tag_!

When you create a new tag add _something_ to it immediately. e.g: `views/bye.tag`
```js
<bye>
  <h1> Goodbye {opts.name}! </h1>
</bye>
```

If you leave a tag empty you will see a strange error.

### 2. `console.log` in your `.tag` file ...

(This is _fairly_ obvious, once you think about it)
if you write a `console.log('your message')` and render it on the server,
it will log out in your server's `stdout` (_i.e. your terminal_).

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

`hapi-riot` is a views engine to be used with the [_Vision_](https://github.com/hapijs/vision) Plugin. It provide server-side rendering of Riot Components giving rendered html and attaching scripts to rehydrate tags with javascript if possible.


> Note if you are totally new to Hapi.js see:
[https://github.com/dwyl/**learn-hapi**](https://github.com/dwyl/learn-hapi)  
> And/or if you are new to Riot.js check out:
[https://github.com/dwyl/**learn-riot**](https://github.com/dwyl/learn-riot)


## _How_?

### 1. Install

```sh
npm install hapi vision hapi-riot --save
```

### 2. Compile

Right now we have left you to do the compiling of your tags. You can choose to do this as you like but the most simple way is to write the following into your cmd line:
```
riot path/to/your/views/folder output/file/path.js
```
For example: `riot example/lib/views bundle.js` -> this will compile your
views and the output the results into a file called `bundle.js` in the root of
your project. It will be a combination of the contents of all of your `.tag`
files.

> Note for development try adding a watch flag `riot -w example/lib/views bundle.js` to prevent having to compile each time

Right now we expect all tags to be compiled into one file.

### 3. Set up route to compiled file

`hapi-riot` is just a view engine. You'll need to add a route to your server that can handle requests to your
compiled file, made by **hapi-riot**. Add the following route:

```js
server.route({
  method: 'GET',
  // this is the same as what you supplied to the view engine in step 4
  path: '/your_compiled_file_route.js',
  handler: function (request, reply) {
    // this is what you specified when compiling in step 2
    reply.file(Path.join(__dirname, 'your_compiled_output_file.js'));
  }
});
```

> Note above uses [inert](https://github.com/hapijs/inert) to serve up static files.

### 4. Configure Vision Plugin with Hapi-Riot

You can configure the views engine by passing it `compileOptions`

```js
server.views({ // initialise
  engines: {
    tag: require('hapi-riot') // file should be .tag
  },
  relativeTo: __dirname,
  path: 'views', // by convention we put our tags in /views dir
  compileOptions: { // of this form, see below for meanings
    removeCache,
    compiledFileRoute, // REQUIRED same as step 3
    layoutPath,
    layout
  }
});

```

We have added a few _features_ to _simplify_ our own projects but are not meant to be fit for _everyone_.


#### `compiledFileRoute` **REQUIRED** *default: '/bundle.js'*

This is the oath you specified in step 3 to include javascript within your tags. `hapi-riot`
will then inject a link to your compiled file into your output which makes the
specified methods in your tags available.

#### `removeCache` *default: `process.env.NODE_ENV === 'production'`*

While you are _developing_ your app you typically don't want
your views to be _cached_, however, when you deploy your app
by setting `NODE_ENV=production` views will be cached. If for _any_ reason you _want_ to cache your views during development set the value as true;

#### `layoutPath` *REQUIRED if layout defined*

The place where your layouts are kept.

> Note: path does not make use of the relativeTo param given to vision plugin

#### `layout` *default: undefined*

Can either be set to `true` in which case we will look for a `layout.html` file or you can specify which ever file you'd like. Can be overridden from `reply.view` to have multiple layouts.

Specifying a layout allows you to provide a core html page for your riot content where you can include style sheets, other html content and other base scripts. We will inject the riot content into a place holder `<<<RIOT>>>` which much be present in the file.

An example would be

```
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="stylesheet.css"/>
  <head>
  <body>
    <<<RIOT>>>
  </body>
</html>
```


### 5. Use

With vision plugin configured and an `index.tag` compiled and place in right directory we should be able to to server side render a page!
```
<index>
  <h1>{opts.title}</h1>
</index>
```

```
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => { // render the view:
      reply.view('index', { title: 'My Amazing Title!' });
    }
  });
```

## Examples

Run ```npm start``` to see a basic example.

More/Complete examples are in the [/example directory](https://github.com/dwyl/hapi-riot/tree/master/example).  

If you stuck or need any help just [ask](https://github.com/dwyl/hapi-riot/issues)!


## Lessons Learned & "Gotchas"

### 1. At compiling step make sure your bundle.js is in .gitignore

Add to your `.gitignore` any bundled code in compile step to keep your git history clean.

### 2. `console.log` in your `.tag` file ...

(This is _fairly_ obvious, once you think about it)
if you write a `console.log('your message')` and render it on the server,
it will log out in your server's `stdout` (_i.e. your terminal_).

### 3. tag files used as views should be non empty and appropriately wrapped

When you create a new tag add _something_ to it immediately. e.g: `views/custom.tag`
```js
<custom>
  <h1> Content </h1>
</custom>
```

If you leave a tag empty you will see a strange error when rendering.

To know which tag to mount we perform ``` template.split('>')[0].slice(1) ``` hence the script mounting your tag on client may be wrong unless you conform to having an appropriate wrapping custom element.

Also good for them to match filename but less important.

### 4. When writing your layout html make sure to add right place holder

We will be doing a simple find and replace on the characters `<<<RIOT>>>` so make sure there are no conflicts and included in the right place. You can obviously add more html above and below if you so choose.

### 5. If not setting the layout param in compile options make sure you have a layout.html file

If want to use default by using `layout: true` make sure you have a file named `layout.html` in the layout folder path given

### 6. Scripts and style stripped out of initial render

`Riot.render` removes all js and styles. We will reload the tag instance but initially you may lose any styles created with a `<style>` tag or scripts belonging to tag. Issue for styles [here](https://github.com/dwyl/hapi-riot/issues/11) .

We therefore recommend to include all static styles into style sheets and link up as normal from you document head.

### 7. Tag files can't be nested in views folder

When rendering on server we require in all files one level deep from the views folder hence any nesting of files may cause problems. Issue [here](https://github.com/dwyl/hapi-riot/issues/3)

### 8. layoutPath and layout different to top level Vision params

We've mimicked the setup for how other view engines use layouts but were having problems passing them as first order params. Make sure you pass these into compileOptions to avoid bugs especially if you have previously worked with handlebars.
Issue [here](https://github.com/dwyl/hapi-riot/issues/20)

## Questions and Suggestions

We hope you find this module useful! We really want to make the process of server side rendering with progessive enhancement as simple as possible.

If you need something cleared up, have any requests or want to offer any improvements then please [create an issue](https://github.com/dwyl/labels/issues/new) or better yet a PR!

 **Note** We are aware that not all riot/vision features may be supported yet. This module will need a few iterations so please suggest missing features to be implemented as you use it and we can hopefully work together to solve it.

riot.tag2('footer', '<p><small>Copyright @dwyl {new Date().getFullYear()}</small></p>', '', '', function(opts) {
});

riot.tag2('head', '<meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="description" content="a basic page"> <title>{opts.title}</title>', '', '', function(opts) {
});

riot.tag2('hello', '<p>Hello {opts.name}!</p>', '', '', function(opts) {
});

riot.tag2('html', '<head title="{opts.title}"></head> <body> <h1>Hello World {time} ... {title}</h1> <p>{state}</p> <footer></footer> <input type="hidden" id="state" value="{state}"> </body>', '', '', function(opts) {
    this.time = Date.now();
    this.title = opts.title;
    this.state = JSON.stringify({title: opts.title });
});

console.log('hello riot!');

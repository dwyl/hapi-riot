riot.tag2('footer', '<p><small>Copyright @dwyl {new Date().getFullYear()}</small></p>', '', '', function(opts) {
});

riot.tag2('hello', '<p>Hello {opts.name}!</p>', '', '', function(opts) {
});

riot.tag2('index', '<h1>Hello World {time} ... {title}</h1> <footer></footer>', '', '', function(opts) {
    this.time = Date.now();
    this.title = opts.title;
});

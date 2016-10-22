riot.tag2('index', '<label>{title}</label> <button onclick="{changeName}">{\'Counter: \' + counter}</button>', '', '', function(opts) {
    this.counter = opts.counter;

    this.changeName = function() { this.counter += 1 }.bind(this)
});

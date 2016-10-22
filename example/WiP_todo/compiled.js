riot.tag2('footer', '<span id="todo-count"><strong>{remaining}</strong> item left</span> <ul id="filters"> <li><a href="/" class="{selected: selected(\'/all\')}">All</a></li> <li><a href="/active" class="{selected: selected(\'/active\')}">Active</a></li> <li><a href="/done" class="{selected: selected(\'/done\')}">Completed</a></li> </ul> <button id="clear-completed">Save</button>', '', 'id="footer"', function(opts) {
    this.remaining = opts.items.filter(function(i){return !i.done }).length;
    this.selected = function(path) {
      return opts.path.indexOf(path) > -1
    }
});

riot.tag2('index', '<section id="todoapp"> <form method="POST" action="save" onsubmit="{add}"> <header id="header"><h1>todos</h1> <input id="new-todo" placeholder="What needs to be done?" name="input" onkeyup="{edit}" value="{text}"> </header> <section id="main"> <input id="toggle-all" type="checkbox"> <ul id="todo-list"> <li each="{items.filter(whatShow)}" class="{completed: done}"> <div class="view"> <input name="isdone-{id}" type="checkbox" class="toggle" __checked="{done}" onclick="{parent.toggle}"> <label>{title}</label> <button class="destroy"></button> </div> <input class="edit"> </li> </ul> </section> <footer items="{items}" path="{opts.path}"></footer> </form> </section>', '', '', function(opts) {
    this.items = opts.items;
    this.edit = function(e) {
      this.text = e.target.value
    }.bind(this)

    this.add = function(e) {
      e.preventDefault();
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = '';
      }
    }.bind(this)

    this.removeAllDone = function(e) {
      this.items = this.items.filter(function(item) {
        return !item.done
      })
    }.bind(this)

    this.whatShow = function(item) {
      return !item.hidden
    }.bind(this)

    this.onlyDone = function(item) {
      return item.done
    }.bind(this)

    this.toggle = function(e) {
      var item = e.item
      item.done = !item.done
      return true
    }.bind(this)
});

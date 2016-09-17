<footer id="footer">
  <span id="todo-count"><strong>{remaining}</strong> item left</span>
  <ul id="filters">
    <li><a href="/" class="{selected: selected('/all')}">All</a></li>
    <li><a href="/active" class="{selected: selected('/active')}">Active</a></li>
    <li><a href="/done" class="{selected: selected('/done')}">Completed</a></li>
  </ul>
  <button id="clear-completed">Clear completed</button>
  <script>
    // console.log('opts:', opts)
    this.remaining = opts.items.filter(function(i){return !i.done }).length;
    this.selected = function(path) {
      // console.log('opts.path:', opts.path, '  path:', path, opts.path.indexOf(path) > -1);
      return opts.path.indexOf(path) > -1
    }
  </script>
</footer>

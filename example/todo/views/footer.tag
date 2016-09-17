<footer id="footer">
  <span id="todo-count"><strong>{remaining}</strong> item left</span>
  <ul id="filters">
    <li><a href="/" class="selected">All</a></li>
    <li><a href="/active" class="">Active</a></li>
    <li><a href="/done" class="">Completed</a></li>
  </ul>
  <button id="clear-completed">Clear completed</button>
  <script>
    console.log('opts.items', opts)
    this.remaining = opts.items.filter(function(i){return !i.done }).length;
  </script>
</footer>

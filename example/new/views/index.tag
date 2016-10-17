<index>
  <label>{title}</label>
  <button onclick="{changeName}">{ 'Counter: ' + counter }</button>
  <script>
    this.counter = opts.counter;

    changeName() { this.counter += 1 }
  </script>
</index>

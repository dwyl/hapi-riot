<index>
  <section id="todoapp">
    <form method='POST' action='save' onsubmit={ add }>
    <header id="header"><h1>todos</h1>
      <input id="new-todo" placeholder="What needs to be done?" name="input" onkeyup={ edit } value={ text }>
    </header>

      <section id="main">
        <input id="toggle-all" type="checkbox">
        <ul id="todo-list">
          <li each={ items.filter(whatShow) } class={ completed: done } >
            <div class="view">
              <input name="isdone-{id}" type="checkbox" class="toggle" checked={ done } onclick={ parent.toggle }>
              <label >{ title }</label>
              <button class="destroy"></button>
            </div>
            <input class="edit">
          </li>
        </ul>
      </section>
      <footer items={items} path={opts.path}></footer>
    </form>
  </section>

  <script>
    this.items = opts.items;
    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      e.preventDefault();
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = '';
      }
    }

    removeAllDone(e) {
      this.items = this.items.filter(function(item) {
        return !item.done
      })
    }

    // an two example how to filter items on the list
    whatShow(item) {
      return !item.hidden
    }

    onlyDone(item) {
      return item.done
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }
  </script>
</index>

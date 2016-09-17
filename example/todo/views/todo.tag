<todo>

<section id="todoapp">
  <form method='POST' action='save' onsubmit={ add }>
  <header id="header"><h1>todos</h1>
    <input id="new-todo" placeholder="What needs to be done?" name="input" onkeyup={ edit }>
  </header>

    <section id="main">
      <input id="toggle-all" type="checkbox">
      <ul id="todo-list">
        <li class={ completed: done } each={ items.filter(whatShow) }>
          <div class="view">
            <input type="checkbox" class="toggle" checked={ done } onclick={ parent.toggle }>
              <label>{ title }</label>
              <button class="destroy"></button>
          </div>
          <input class="edit">
        </li>
      </ul>
    </section>

    <!-- <button>Add #{ items.filter(whatShow).length + 1 }</button> -->

    <!-- <button disabled={ items.filter(onlyDone).length == 0 } onclick={ removeAllDone }>Save</button> -->
  </form>
  <footer items={items} path={opts.path}></footer>
</section>





  <script>
    this.items = opts.items;
    console.log('opts.items', opts.items);
    console.log('todo.tag opts.path', opts.path);
    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        this.items.push({ title: this.text })
        this.text = this.input.value = ''
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

</todo>

<html>
  <head title={ opts.title }></head>
  <body>
    <h1>Hello World { time } ... { title }</h1>
    <footer></footer>
    <input type='hidden' id='state' value={state}>
    <p>{state}</p>
    <h2>{ typeof opts }</h2>
    <h2>{ keys.join('--') + ' done' }</h2>
  </body>
  <script>
    this.time = Date.now();
    this.title = opts.title;
    this.state = JSON.stringify({title: opts.title, });
  </script>
</html>

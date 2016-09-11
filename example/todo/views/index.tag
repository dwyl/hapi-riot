<html>
  <head title={ opts.title }></head>
  <body>
    <h1>Hello World { time } ... { title }</h1>
    <p>{state}</p>
    <todo></todo>
    <footer></footer>
    <input type='hidden' id='state' value={state}>
  <script>
    this.time = Date.now();
    this.title = opts.title;
    this.state = JSON.stringify({title: opts.title });
  </script>
  </body>
</html>

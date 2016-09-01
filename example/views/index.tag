<html>
  <head title={ opts.title }></head>
  <body>
    <h1>Hello World { time } ... { title }</h1>
    <footer></footer>
    <input type='hidden' id='state' value={state}>
  </body>
  <script>
    this.time = Date.now();
    this.title = opts.title;
    var state = {};
    Object.keys(opts).forEach(function(k){
      state[k] = opts[k];
    });
    console.log(state);
    this.state = JSON.stringify({title: 'my title'});
  </script>
</html>

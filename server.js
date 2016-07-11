var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
var path = require('path');

app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
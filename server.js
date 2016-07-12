var express = require('express');

var app = express();
var mongoose = require('mongoose');
var path = require('path');
var Pokemon = require('./pokemonModel');

//required for deployment
var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:pokemon';
mongoose.connect(mongoUri);

app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});


//api
app.get('/api/pokemon', function (req, res) {
  res.json([{name:'Honeybell'}]);
  // Pokemon.find({}, function(err, result) {
  //   res.send(200, result);
  //   return result
  // })
});

app.post('/api/pokemon', function (req, res) {
  console.log(req);
  res.json(req)
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
var express = require('express');

var app = express();
var mongoose = require('mongoose');
var path = require('path');
var Pokemon = require('./pokemonModel');
var bodyParser = require('body-parser');

//required for deployment
var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/pokemonList';
mongoose.connect(mongoUri);

app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});


//dummy database
var data = [{"name":'Honeybell'},{"name":"sujin"}];
//api
app.get('/api/pokemon', function (req, res) {
  res.json(data);
   // Pokemon.find({}, function(err, result) {
   //  console.log(result)
   //   res.send(200, result);
   //   //return result
   // })
});

app.post('/api/pokemon', function (req, res) {
  console.log('req b',req.body);
  data.push(req.body);
  console.log('data' , data)
  res.send(201)
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

module.exports = app;
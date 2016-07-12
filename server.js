var express = require('express');

var app = express();
var mongoose = require('mongoose');
var path = require('path');

var bodyParser = require('body-parser');

//required for deployment
var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1/pokemonList';
mongoose.connect(mongoUri);

var Pokemon = require('./pokemonModel');

app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

//api
app.get('/api/pokemon', function (req, res) {
  Pokemon.find({}, function(err, result) {
    res.json(result);
  })
});

app.post('/api/pokemon', function (req, res) {
  Pokemon.findOne({name:req.body.name}, function(err, found) {
    console.log(found);
    if(!found) {
      Pokemon({name: req.body.name}).save(function(err, result){
      res.sendStatus(201);
      });
    }else{
      res.sendStatus(200);
    }
  });
})

app.listen(port, function (err) {
  if (err) {
    throw err;
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

module.exports = app;
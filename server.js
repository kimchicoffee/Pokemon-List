var express = require('express');

var app = express();
var mongoose = require('mongoose');
var path = require('path');
var Pokedex = require('pokedex-promise-v2');
var bodyParser = require('body-parser');


//required for deployment
var port = process.env.PORT || 3001;
var mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1/pokemonList';
mongoose.connect(mongoUri);


var Pokemon = require('./pokemonModel');
var P = new Pokedex();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/api/pokemons', function (req, res) {
  Pokemon.find({}, function(err, result) {
    res.json(result);
  })
});

app.post('/api/pokemons', function (req, res) {
  var name = req.body.name;
  P.getPokemonByName(name)
  .then(function(pokemon) {
    Pokemon.findOne({name:name}, function(err, result) {
      if(!result) {
        Pokemon({name:name, weight:pokemon.weight, height:pokemon.height}).save(function(err,result) {
          res.sendStatus(201);
        })
      }else{
        res.json(pokemon.name);
      }
    })
  })
  .catch(function(error) {
    console.log('There was an ERROR: ', error);
    res.sendStatus(404);
  });
});

app.post('/api/pokemons/delete', function (req, res) {
  Pokemon.remove({_id: req.body._id}, function(err) {
    if (err) {
      console.error('error is', err);
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

module.exports = app;
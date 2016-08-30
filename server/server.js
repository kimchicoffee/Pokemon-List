var express = require('express');

var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var pokemonCtrl = require('./pokemon.controller.js');


//required for deployment
var port = process.env.PORT || 3001;
var mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1/pokemonList';
mongoose.connect(mongoUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client'));

//api routes
app.get('/api/pokemons', pokemonCtrl.getAll);
app.get('/api/pokemons/:name', pokemonCtrl.getOnePokemon);
app.put('/api/pokemons/star', pokemonCtrl.starPokemon);
app.post('/api/pokemons', pokemonCtrl.addPokemon);
app.post('/api/pokemons/delete', pokemonCtrl.removePokemon);

app.listen(port, function (err) {
  if (err) {
    throw err;
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

module.exports = app;
var bluebird = require('bluebird');
var Pokedex = require('pokedex-promise-v2');
var Pokemon = require('./pokemon.model');
var P = new Pokedex();

module.exports.getAll = function (req, res) {
  Pokemon.find({}, function(err, result) {
    res.json(result);
  });
};

module.exports.addPokemon = function (req, res) {
  var name = req.body.name;
  P.getPokemonByName(name)
  .then(function(pokemon) {
    Pokemon.findOne({name:name}, function(err, result) {
      if(!result) {
        Pokemon({name:name, weight:pokemon.weight, height:pokemon.height}).save(function(err,result) {
          res.sendStatus(201);
        })
      }else{
        res.sendStatus(200);
      }
    })
  })
  .catch(function(error) {
    console.log('There was an ERROR: ', error);
    res.sendStatus(404);
  });
};

module.exports.removePokemon = function (req, res) {
  Pokemon.remove({_id: req.body._id}, function(err) {
    if (err) {
      console.error('error is', err);
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
};
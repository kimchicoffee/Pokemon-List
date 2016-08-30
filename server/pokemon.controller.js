var bluebird = require('bluebird');
var Pokedex = require('pokedex-promise-v2');
var Pokemon = require('./pokemonModel');
var P = new Pokedex();

module.exports.getAll = function (req, res) {
  Pokemon.find({}, function(err, result) {
    res.json(result);
  });
};

module.exports.getOnePokemon = function (req, res) {
  var name = req.params.name;
  Pokemon.findOne({name:name}, function(err, result) {
    res.json(result);
  });
};

module.exports.starPokemon = function (req, res) {
  Pokemon.findOneAndUpdate({_id: req.body._id}, {$set:{star:!req.body.star}}, function(err,result){
    if(err) {
      console.log('err');
    }
    //resource updated successfully
    res.sendStatus(204);
  })
};

module.exports.addPokemon = function (req, res) {
  var name = req.body.name.toLowerCase();
  P.getPokemonByName(name)
  .then(function(pokemon) {
    console.log('pokemon is', pokemon);
    Pokemon.findOne({name:name}, function(err, result) {
      if(err){
        res.sendStatus(500);
      }
      if(result) {
        res.sendStatus(200);
      }else{
        Pokemon({name:name, weight:pokemon.weight, height:pokemon.height, image:pokemon.sprites.front_default, star:false}).save(function(err,result) {
          if(err) {
            res.sendStatus(500);
          }else{
            res.sendStatus(201);
          }
        })
      }
    });
  })
  .catch(function(error) {
    console.log('There was an ERROR: ', error);
    res.status(404);
    res.send(error);
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
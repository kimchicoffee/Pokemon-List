var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
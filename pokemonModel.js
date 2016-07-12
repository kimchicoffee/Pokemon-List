var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
  name: String,
  count: Number
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
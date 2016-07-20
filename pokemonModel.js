var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  height: Number
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
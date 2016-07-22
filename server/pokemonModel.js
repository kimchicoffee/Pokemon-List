var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  height: Number,
  image: String
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
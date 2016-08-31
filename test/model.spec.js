var expect = require('chai').expect;
var mongoose = require('mongoose');
var Pokemon = require('../server/pokemonModel');

describe('Pokemon Model', function() {
  it('should be a Mongoose model', function() {
    expect(new Pokemon()).to.be.instanceOf(mongoose.Model);
  });
});
angular.module('app', []) // register firebase as a module in application
.controller('MainController', function ($scope, Pokemons) {
  $scope.pokemons = Pokemons.pokemons;
  $scope.addPokemon = function () {
    Pokemons.addPokemon($scope.newPokemon);
  }
}).factory('Pokemons', function($http) {
  var pokemons = [{name:'sujin'}];
  var addPokemon = function (newPokemon) {
    pokemons.push({ name: newPokemon});
  };
  return {pokemons : pokemons,
    addPokemon : addPokemon
  }
})
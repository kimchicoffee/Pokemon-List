angular.module('app', [])
.controller('MainController', function ($scope, PokemonsFactory) {
  var getAll = function () {
    PokemonsFactory.getAll()
    .then(function(pokemons) {
      $scope.pokemons = pokemons;
    });
  };

  $scope.addPokemon = function () {
    PokemonsFactory.addPokemon($scope.newPokemon)
    .then(function () {
      getAll();
    });
  };

  getAll();

}).factory('PokemonsFactory', function ($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/pokemon'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addPokemon = function (pokemon) {
    return $http({
      method: 'POST',
      url: '/api/pokemon',
      data: pokemon
    })
    .then(function (resp) {
      return resp;
    });
  };

  var removePokemon = function (pokemon) {
    return $http({
      method: 'DELETE',
      url: '/api/pokemon',
      data: pokemon
    }).then(function (resp) {
      return resp;
    });
  };

  return {
    addPokemon : addPokemon,
    getAll: getAll
  }
});
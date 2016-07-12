angular.module('app', []) // register firebase as a module in application
.controller('MainController', function ($scope, PokemonsFactory) {

  PokemonsFactory.getAll()
  .then(function(pokemons) {
    $scope.pokemons = pokemons;
  });

  // $scope.addPokemon = function () {
  //   PokemonsFactory.addPokemon($scope.newPokemon);
  // }

}).factory('PokemonsFactory', function ($http) {
  //var pokemons = [{name:'sujin'}];
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/pokemon'
    })
    .then(function (resp) {
      console.log(resp.data);
      return resp.data;
    });
  }
  var addPokemon = function (newPokemon) {
    return $http({
      method: 'POST',
      url: '/api/pokemon',
      data: newPokemon
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    addPokemon : addPokemon,
    getAll: getAll
  }
});
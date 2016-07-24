angular.module('app')
  .controller('pokemonCtrl', function ($scope, PokemonFactory) {
    var getOnePokemon = function() {
      PokemonFactory.getOnePokemon()
      .then(function(pokemon) {
        $scope.pokemon = pokemon;
      });
    };
    getOnePokemon();
  })
  .factory('PokemonFactory', function ($stateParams,$http) {
    var getOnePokemon = function() {
      return $http({
        method: 'GET',
        url: '/api/pokemons/' + $stateParams.name
      })
      .then(function (resp) {
        return resp.data;
      });
    };
    return {getOnePokemon:getOnePokemon}
  });
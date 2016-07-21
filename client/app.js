angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
  $stateProvider
    .state('pokemon',{
      url: '/pokemons',
      templateUrl: 'pokemon.html',
      controller: 'MainController'
    });
  $urlRouterProvider
    .otherwise('/');
})
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

  $scope.removePokemon = function (pokemons,index) {
    var deletedPokemon = pokemons.splice(index,1);
    PokemonsFactory.removePokemon(deletedPokemon[0])
    .then(function () {
      getAll();
    });
  }

  getAll();

}).factory('PokemonsFactory', function ($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/pokemons'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addPokemon = function (pokemon) {
    return $http({
      method: 'POST',
      url: '/api/pokemons',
      data: pokemon
    })
    .then(function (resp) {
      return resp;
    });
  };

  var removePokemon = function (pokemon) {
    return $http({
      method: 'POST',
      url: '/api/pokemons/delete',
      data: pokemon
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getAll : getAll,
    addPokemon : addPokemon,
    removePokemon : removePokemon
  }
});
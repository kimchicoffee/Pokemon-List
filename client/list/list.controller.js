angular.module('app')
  .controller('listCtrl', function ($scope, PokemonsFactory) {
  var getAll = function () {
    PokemonsFactory.getAll()
    .then(function(pokemons) {
      $scope.pokemons = pokemons;
    });
  };

  $scope.reverse = false;
  $scope.propertyName = 'name';
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
    $scope.propertyName = propertyName;
  };

  $scope.addPokemon = function () {
    PokemonsFactory.addPokemon($scope.newPokemon)
    .then(function (data) {
      if(data.status === 201) {
        $scope.message = $scope.newPokemon.name+ " is succesfully added in your pokemon list!";
      }
      else if(data.status === 200) {
        $scope.message = $scope.newPokemon.name+ " is already in your list!";
      }
      else if(data.status === 404) {
        $scope.message = "Sorry, there is no such pokemon named "+$scope.newPokemon.name+" in pokedex!";
      }else if(data.status === 500){
        $scope.message = "Sorry, there is something wrong with your request";
      }
      getAll();
    });
  };

  $scope.removePokemon = function (pokemons,index) {
    var deletedPokemon = pokemons.splice(index,1);
    PokemonsFactory.removePokemon(deletedPokemon[0])
    .then(function () {
      getAll();
    });
  };

  $scope.starPokemon = function (pokemon) {
    console.log('pokemon name is ', pokemon.name)
    PokemonsFactory.starPokemon(pokemon);
  };

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
    //console.log('pokemon is', pokemon);
    return $http({
      method: 'POST',
      url: '/api/pokemons',
      data: pokemon
    })
    .then(function (resp) {
      return resp;
    }, function error(resp) {
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

  var starPokemon = function (pokemon) {
    return $http({
      method: 'PUT',
      url: '/api/pokemons/' + pokemon,
      data: pokemon
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getAll : getAll,
    addPokemon : addPokemon,
    removePokemon : removePokemon,
    starPokemon : starPokemon
  }
});
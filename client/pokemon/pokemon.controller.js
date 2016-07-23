angular.module('app')
  .controller('pokemonCtrl', function ($scope, PokemonFactory) {
    var getOnePokemon = function() {
      PokemonFactory.getOnePokemon()
      .then(function(pokemon) {
        $scope.pokemon = pokemon;
        var mapOptions = {
          zoom: 4,
          center: new google.maps.LatLng(40.0000, -98.0000),
          mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
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
angular.module('app')
  .controller('pokemonCtrl', function ($scope, PokemonFactory) {
    var getOnePokemon = function() {
      PokemonFactory.getOnePokemon()
        .then(function(pokemon) {
        $scope.pokemon = pokemon;
        var mapProp = {
        center:new google.maps.LatLng(42.3601,-71.060093),
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        new google.maps.Map(document.getElementById("googleMap"),mapProp);
        console.log('map is created')
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
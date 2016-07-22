angular.module('app')
  .controller('pokemonCtrl', function ($scope, $stateParams) {
    $scope.pokemon = $stateParams.name;
  })
  // .factory('PokemonFactory', function ($stateParams) {
  //   // var getOnePokemon = function() {
  //   //   return $http({
  //   //     method: 'GET',
  //   //     url: '/api/pokemons'
  //   //   })
  //   //   .then(function (resp) {
  //   //     return resp.data;
  //   //   });
  //   // };
  // });
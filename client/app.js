angular.module('app', [])
.controller('MainController', function ($scope) {
  $scope.pokemons = [{name:'sujin'}];
  $scope.addPokemon = function () {
    $scope.pokemons.push({ name: $scope.newPokemon, })
  }
})
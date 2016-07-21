angular.module('app')
  .controller('pokemonCtrl', function ($scope, $stateParams) {
    $scope.pokemon = $stateParams.name;
  })
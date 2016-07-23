angular.module('app', ['ui.router','uiGmapgoogle-maps'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
  $stateProvider
    .state('list',{
      url: '/',
      templateUrl: 'list/list.html',
      controller: 'listCtrl'
    })
    .state('pokemon',{
      url: '/pokemons/:name',
      templateUrl: 'pokemon/pokemon.html',
      controller: 'pokemonCtrl'
    });
  $urlRouterProvider
    .otherwise('/');
});
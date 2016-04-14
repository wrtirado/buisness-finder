;(function () {
  'use strict'
  angular.module('mapigatorApp', ['controllers', 'ui.router'])
    .config(routerConfig)

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']

  function routerConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: "mapController as mapCtrl"
      })
      .state('addBuisness', {
        url: '/addBuisness',
        templateUrl: '/html/addBuisness.html',
        controller: "mapController as mapCtrl"
      })
      .state('map', {
        url: '/map',
        templateUrl: '/html/map.html',
        controller: "mapController as mapCtrl"
      })
      $urlRouterProvider.otherwise('/')
  }
}())

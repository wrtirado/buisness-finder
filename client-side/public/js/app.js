;(function () {
  'use strict'
  angular.module('mapigatorApp', ['controllers', 'ui.router', 'myFactory', 'ngMap', 'authService', 'loginCtrl'])
    .config(routerConfig)

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider']

  function routerConfig ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor')

    $stateProvider
      .state('logIn', {
        url: '/',
        templateUrl: '/html/log-in.html'
      })
      .state('signUp', {
        url: '/signUp',
        templateUrl: '/html/sign-up.html'
      })
      .state('addBusiness', {
        url: '/addBusiness',
        templateUrl: '/html/addBusinesses.html',
        controller: "mapController as mapCtrl"
      })
      .state('map', {
        url: '/map',
        templateUrl: '/html/map.html',
        controller: "mapController as mapCtrl"
      })
      .state('success', {
        url: '/success',
        templateUrl: '/html/addBusinessSuccess.html',
        controller: "mapController as mapCtrl"
      })

      $urlRouterProvider.otherwise('/')
  }
}())

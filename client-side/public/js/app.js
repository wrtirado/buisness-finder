//#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#//
//#                                         #//
//# Title: Main App Page                    #//
//# Description: This is where I set up my  #//
//#      main module that my app usses      #//
//#                                         #//
//#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#//
;(function () { // <-- If you're feeling iffy use and iify
  'use strict'
  angular.module('mapigatorApp', ['controllers', 'ui.router', 'myFactory', 'ngMap', 'authService', 'loginCtrl'])
    .config(routerConfig)

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'] // <-- Using $inject to protect this controller from minification

  function routerConfig ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor') // <-- using the interceptor to check authentication

//#=-=-=-=                           =-=-=-=#//
//
  //This is where I am setting up my states Using
  //ui-router
                                             //
//#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#//
    $stateProvider
      .state('logIn', { // <-- Main page you see when you open the website
        url: '/',
        templateUrl: '/html/log-in.html',
        controller: "mapController as mapCtrl"
      })
      .state('signUp', { // <-- The page that mobile users will get sent to if they choose the sign up button
        url: '/signUp',
        templateUrl: '/html/sign-up.html',
        controller: "mapController as mapCtrl"
      })
      .state('addBusiness', { // <-- The page where people can add a business to the database
        url: '/addBusiness',
        templateUrl: '/html/addBusinesses.html',
        controller: "mapController as mapCtrl"
      })
      .state('map', { // <-- The main map page that displays the filtered businessess, as well as a marker on the map for that business
        url: '/map',
        templateUrl: '/html/map.html',
        controller: "mapController as mapCtrl"
      })
      .state('success', { // <-- The page people see once they add a business
        url: '/success',
        templateUrl: '/html/addBusinessSuccess.html',
        controller: "mapController as mapCtrl"
      })

      $urlRouterProvider.otherwise('/') // <-- If anyone picks a url endpoint that doesn't exist, they will get routed back to the login page
  }
}())

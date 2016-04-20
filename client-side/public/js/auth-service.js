(function() {
  'use strict';
  angular.module('authService', [])
    .factory('Auth', function($http, $p, AuthToken){})
    .factory('AuthInterceptor', function($q, AuthToken){})
    .factory('AuthToken', function($window){})

    function Auth($http, $q, AuthToken){
      var authFactory = {}

      authFactory.login = function(name, email, password){
        return $http.post('/api/v1/signIn', {name: name, email: email, password: password})
                .then(function(data){
                  AuthToken.setToken(data.token)
                  return data
                })
      }

      authFactory.logout = function(){
        AuthToken.setToken()
      }

      authFactory.isLoggedIn = function(){
        if(AuthToken.getToken()){
          return true
        }
        else{return false}
      }

      authFactory.getUser = function(){
        if(AuthToken.getToken()){
          return $http.get('/api/v1/me')
        }
        else{
          return $q.reject({message: 'User has no token'})
        }
      }

      return authFactory
    }

    function AuthToken($q, AuthToken) {
      var authTokenFactory = {}

        authTokenFactory.getToken = function(){
          return $window.localStorage.getItem('token')
        }

        authTokenFactory.setToken = function (token){
          if (token){
            $window.localStorage.setItem('token', token)
          }
          else {
            $window.localStorage.removeItem('token')
          }
        }
      return authTokenFactory
    }

    function authInterceptorFactory ($window) {
      var AuthInterceptorFactory = {}

      interceptorFactory.request = function(config){
        var token = AuthToken.getToken()

        if(token){
          config.headers['x-access-token'] = token
        }
        return config
      }
      interceptorFactory.responseError = function(response){
        if(response.status == 403){
          $location.path('/')
        }
        return $q.reject(response)
      }


      return AuthInterceptorFactory
    }

}());

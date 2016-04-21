(function() {
  'use strict';
  angular.module('authService', [])
    .factory('Auth', Auth)
    .factory('AuthInterceptor', AuthInterceptor)
    .factory('AuthToken', AuthToken)

    function Auth($http, $q, AuthToken){
      var authFactory = {}

      authFactory.login = function(email, password){
        return $http.post('/api/v1/signIn', {email: email, password: password})
                .then(function(data){
                  console.log("Sign in data =====", data);
                  AuthToken.setToken(data.data.token)
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

    function AuthToken($window) {
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

    function AuthInterceptor ($location, $q, AuthToken) {
      var AuthInterceptorFactory = {}

      AuthInterceptorFactory.request = function(config){
        var token = AuthToken.getToken()

        if(token){
          config.headers['x-access-token'] = token
        }
        return config
      }
      AuthInterceptorFactory.responseError = function(response){
        if(response.status == 403){
          $location.path('/')
        }
        return $q.reject(response)
      }


      return AuthInterceptorFactory
    }

}());

(function() {
    'use strict';

    angular.module('loginCtrl', [])
        .controller('loginController', loginController)

    loginController.$inject = ['Auth', '$location', '$rootScope', '$state']

    function loginController(Auth, $location, $rootScope, $state) {
        var lCtrl = this

        lCtrl.loggedIn = Auth.isLoggedIn()
        lCtrl.onMap = false
        $rootScope.$on('$stateChangeSuccess', function(){
          lCtrl.loggedIn = Auth.isLoggedIn()
          console.log("State Changed!=========== Am I logged in?",lCtrl.loggedIn);
          if($state.current.name === 'map'){
            lCtrl.onMap = true
          }
          else{lCtrl.onMap = false}
          if($state.current.name != 'signUp' || $state.current.name != 'logIn'){
            console.log("state check");
            if(lCtrl.loggedIn){
              Auth.getUser()
                .then(function(response){
                  lCtrl.loggedInUser = JSON.parse(response.data)

                  console.log("Data from /me route", typeof lCtrl.loggedInUser)
                })
              }else{
                $location.path('/')
              }
            }
        })

        lCtrl.doLogin = function(){
          console.log("doLogin method running=========")
          Auth.login(lCtrl.loginData.email, lCtrl.loginData.password)
            .then(function(response){
              if(response.status === 200){
                console.log("in login if statement--------")
                $location.path('/map')
              }
              else{
                lCtrl.error = response.message
              }
            })
        }

        lCtrl.doLogout = function(){
          Auth.logout()
          lCtrl.user = ''
          $location.path('/')
        }

    }
}());

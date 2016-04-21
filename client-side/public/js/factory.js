;
(function() {
  'use strict'
  angular.module('myFactory', [])
    .factory('businessFactory', businessFactory)

  businessFactory.$inject = ['$http']

  function businessFactory($http) {
    var businessData = {},
      apiUrl = 'api/v1/businesses'

    businessData.getAll = function() {
      console.log('getting all businesses')
      return $http.get(apiUrl)
    }

    businessData.create = function(business) {
      console.log('2 - client: Calling the http verb \'post\', and as a result is crossing the divide over to the server side. More specifically, it is looking at where I defined the api_routes, and where this specific route is pointing within the mapigatorController!', business)
      var result = $http.post(apiUrl, business)
      console.log('5 - client: running inside the factory.js file')
      return result
    }

    businessData.getSingle = function(id) {
      console.log('getting single business data:', id)
      return $http.get(apiUrl + '/' + id)
    }

    businessData.destroy = function(id) {
      console.log('2 - client: Calling the http verb \'delete\', and as a result is crossing the divide over to the server side. More specifically, it is looking at where I defined the api_routes, and where this specific route is pointing within the mapigatorController!')
      var result = $http.delete(apiUrl + '/' + id)
      console.log('5 - client: running inside the factory.js file')
      return result
    }

    businessData.update = function(id, business) {
      console.log('2 - client: Calling the http verb \'put\', and as a result is crossing the divide over to the server side. More specifically, it is looking at where I defined the api_routes, and where this specific route is pointing within the mapigatorController!')
      var result = $http.put(apiUrl + '/' + id, business)
      console.log('6 - recieving the response from the res.send in the mapigatorController');
      return result
    }
    return businessData
  }

  // user factory for http requests
  function userFactory($http) {
    var userData = {},
    apiUrl = 'api/v1/users'

    userData.create = function(user) {
      var result = $http.post(apiUrl, user)
      return result
    }

    return userData
  }
}())

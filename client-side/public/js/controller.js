(function() {
  'use strict';

  angular.module('controllers', [])
    .controller('mapController', mapController)

  mapController.$inject = ['businessFactory']

  function mapController(businessFactory) {
    var mapCtrl = this


    businessFactory.getAll()
      .then(function(response) {
        console.log('Array of businesses from api', response.data)
        mapCtrl.businesses = response.data

      })

    mapCtrl.addBusiness = function(business) {
      console.log('1 - Client: ng-click for adding a business: calling the funciton witing the front end factory')
      businessFactory.create(business)
        .then(function(res) {
          console.log('6 - client: running inside the controller.js file --- end communication between client and server', res)
        })
    }

    mapCtrl.showSingleBusiness = function(id) {
      businessFactory.getSingle(id)
        .then(function(res) {
          console.log("grabbed single record", res)
        })
    }

    mapCtrl.deleteBusiness = function(id) {
      console.log('1 - Client: ng-click for deleting a business: calling the funciton witing the front end factory')
      businessFactory.destroy(id)
        .then(function(res) {
          console.log("Deleted Business")
        })
      businessFactory.getAll()
        .then(function(response) {
          console.log('6 - client: running inside the controller.js file --- end communication between client and server')
          mapCtrl.businesses = response.data
        })
    }

    mapCtrl.updateBusiness = function(business) {
      console.log('1 - Client: ng-click for updating a business: calling the funciton witing the front end factory')
      businessFactory.update(business._id, business)
        .then(function(res) {
          console.log('7 - recieving the response from the http request end communication between client and server')
        })
    }

    mapCtrl.initModals = function() {
      $('.modal-trigger').leanModal() // Initialize the modals
    }
    mapCtrl.setCurrentR = function(business) {
      mapCtrl.currentR = business // Initialize the modals
    }
  }
}());

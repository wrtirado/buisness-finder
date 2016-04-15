(function() {
  'use strict';

angular.module('controllers', [])
    .controller('mapController', mapController)

function mapController(){
  var mapCtrl = this


      businessFactory.getAll()
        .then(function(response) {
          console.log('Array of businesses from api', response.data)
          restCtrl.businesses = response.data

        })

      restCtrl.addBusiness = function(business) {
        console.log('1 - Client: ng-click for adding a business: calling the funciton witing the front end factory')
        businessFactory.create(business)
          .then(function(res) {
            console.log('6 - client: running inside the controller.js file --- end communication between client and server', res)
          })
      }

      restCtrl.showSingleBusiness = function(id) {
        businessFactory.getSingle(id)
          .then(function(res) {
            console.log("grabbed single record", res)
          })
      }

      restCtrl.deleteBusiness = function(id) {
        console.log('1 - Client: ng-click for deleting a business: calling the funciton witing the front end factory')
        businessFactory.destroy(id)
          .then(function(res) {
            console.log("Deleted Business")
          })
        businessFactory.getAll()
          .then(function(response) {
            console.log('6 - client: running inside the controller.js file --- end communication between client and server')
            restCtrl.businesses = response.data
          })
      }

      restCtrl.updateBusiness = function(business) {
        console.log('1 - Client: ng-click for updating a business: calling the funciton witing the front end factory')
        businessFactory.update(business._id,business)
          .then(function(res) {
            console.log('7 - recieving the response from the http request end communication between client and server')
          })
      }

      restCtrl.initModals = function() {
        $('.modal-trigger').leanModal() // Initialize the modals
      }
      restCtrl.setCurrentR = function(business) {
        restCtrl.currentR = business// Initialize the modals
      }













}
}());

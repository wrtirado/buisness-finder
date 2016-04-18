(function() {
  'use strict';

  angular.module('controllers', [])
    .controller('mapController', mapController)

  mapController.$inject = ['businessFactory', 'NgMap']

  function mapController(businessFactory, NgMap) {
    var mapCtrl = this
// Seting up ng-Map
    NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
  });

    mapCtrl.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBO-LboVyW-B4forwoDfDsVYNw8blYlEu0&callback=initMap"

    mapCtrl.newBusiness = {
      glutenFree : false,
      dairyFree : false,
      vegan : false,
      handicapAccessible : false,
      freeWifi : false,
      kidFriendly : false,
    }

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

    // mapCtrl.initModals = function() {
    //   $('.modal-trigger').leanModal() // Initialize the modals
    // }
    // mapCtrl.setCurrentR = function(business) {
    //   mapCtrl.currentR = business // Initialize the modals
    // }

    // functions for setting true and false of checkboxes
    mapCtrl.glutenCheck = function(){
      if (mapCtrl.newBusiness.glutenFree = false){
        mapCtrl.newBusiness.glutenFree = true
      }
      else{
        mapCtrl.newBusiness.glutenFree = false
      }
      return mapCtrl.newBusiness.glutenFree
    }

    mapCtrl.dairyCheck = function(){
      if (mapCtrl.newBusiness.dairyFree = false){
        mapCtrl.newBusiness.dairyFree = true
      }
      else{
        mapCtrl.newBusiness.dairyFree = false
      }
      return mapCtrl.newBusiness.dairyFree
    }

    mapCtrl.veganCheck = function(){
      if (mapCtrl.newBusiness.vegan = false){
        mapCtrl.newBusiness.vegan = true
      }
      else{
        mapCtrl.newBusiness.vegan = false
      }
      return mapCtrl.newBusiness.vegan
    }

    mapCtrl.handicapCheck = function(){
      if (mapCtrl.newBusiness.handicapAccessible = false){
        mapCtrl.newBusiness.handicapAccessible = true
      }
      else{
        mapCtrl.newBusiness.handicapAccessible = false
      }
      return mapCtrl.newBusiness.handicapAccessible
    }

    mapCtrl.wifiCheck = function(){
      if (mapCtrl.newBusiness.freeWifi = false){
        mapCtrl.newBusiness.freeWifi = true
      }
      else{
        mapCtrl.newBusiness.freeWifi = false
      }
      return mapCtrl.newBusiness.freeWifi
    }

    mapCtrl.kidCheck = function(){
      if (mapCtrl.newBusiness.kidFriendly = false){
        mapCtrl.newBusiness.kidFriendly = true
      }
      else{
        mapCtrl.newBusiness.kidFriendly = false
      }
      return mapCtrl.newBusiness.kidFriendly
    }
  }
}());

//#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#//
//#                                         #//
//# Title: Setting up the mapController     #//
//# Description: Set up for the main        #//
//#     mapController                       #//
//#                                         #//
//#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#//
(function() {
    'use strict';
    angular.module('controllers', [])
        .controller('mapController', mapController) //<-- creating the controller called mapController

    mapController.$inject = ['businessFactory', 'NgMap', '$state','userFactory', "$rootScope"] // <-- again, protecting against minification

    function mapController(businessFactory, NgMap, $state, userFactory, $rootScope) {
        var mapCtrl = this
        mapCtrl.newUser = {}
        mapCtrl.lat = 40.0170642
        mapCtrl.long = -105.220111
        mapCtrl.zoom = 17

            // Seting up ng-Map
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());

            // Function that will show custom markers on the map when the basic marker is clicked
            mapCtrl.showCustomMarker= function(evt, id) {
              console.log('args', arguments)

              console.log(map.customMarkers, evt, id)
            map.customMarkers[id].setVisible(true)
            map.customMarkers[id].setPosition(this.getPosition())
          }
          // Function that will close custom marker when the custom marker is clicked
          mapCtrl.closeCustomMarker= function(evt, id) {
            map.customMarkers[id].setVisible(false)
          }
          // Function that, whe the 'show on map' button is clicked, will center the map on that businesses marker
          mapCtrl.centerMapOnMarker = function(business) {
            mapCtrl.lat = business.lat
            mapCtrl.long = business.long
            mapCtrl.zoom = 17
          }

        })

        mapCtrl.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBO-LboVyW-B4forwoDfDsVYNw8blYlEu0&callback=initMap"

        mapCtrl.newBusiness = {
            options: []
        }

        businessFactory.getAll()
            .then(function(response) {
                console.log('Array of businesses from api', response.data)
                mapCtrl.businesses = response.data

            })

        mapCtrl.addOptions = function(event) {
            if (!event.target.checked) {
                console.log("Erasing Event")
                mapCtrl.newBusiness.options.splice(mapCtrl.newBusiness.options.indexOf(event.target.name), 1)
                console.log("Erased", mapCtrl.newBusiness.options)

            } else {

                console.log("Adding an option:", event.target.name)
                mapCtrl.newBusiness.options.push(event.target.name)
            }
        }

        mapCtrl.addBusiness = function(business) {
            console.log('1 - Client: ng-click for adding a business: calling the funciton within the front end factory', business)
            businessFactory.create(business)
                .then(function(res) {
                    console.log('6 - client: running inside the controller.js file --- end communication between client and server', res)
                    $state.go('success')
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

        mapCtrl.userSelectedBusinessOptions = []

        mapCtrl.includeOptions = function(event) {
          console.log("event being passed from includeOptions", event);
            var i = $.inArray(event.target.name, mapCtrl.userSelectedBusinessOptions)
            if (i > -1) {
                mapCtrl.userSelectedBusinessOptions.splice(i, 1)
            } else {

                mapCtrl.userSelectedBusinessOptions.push(event.target.name);
            }
        }

        mapCtrl.disableCheckbox = function(){
          console.log("running the disable function");
          setTimeout(function(){
            console.log("setting timeout");
            $('.filterCheckBox').attr('disabled', false)
          }, 650)
          $('.filterCheckBox').attr('disabled', true)
        }

        mapCtrl.isChecked = false
        mapCtrl.businessFilter = function(business) {
          console.log('userSelectedBusinessOptions', mapCtrl.userSelectedBusinessOptions)
          // if(event.currentTarget.checked === true){
          //   mapCtrl.isChecked = true
          // }
          // else{mapCtrl.isChecked = false}
            var selectedBusinessOptions = angular.copy(mapCtrl.userSelectedBusinessOptions)
            if (selectedBusinessOptions.length > 0) {

                var matchedOptionsInBizz = 0
                for (var i = 0; i < business.options.length; i++) {
                    if ($.inArray(business.options[i], selectedBusinessOptions) >= 0) {
                        matchedOptionsInBizz++
                    }
                }
                if (matchedOptionsInBizz >= selectedBusinessOptions.length ){
                  return business
                }
                else {
                  return false
                }
            }else{

              return business
            }
        }
        // Begin functionality for the users schema


        mapCtrl.addUser = function(){
          console.log("Sending user data to api", mapCtrl.newUser)
          userFactory.create(mapCtrl.newUser)
              .then(function(res){
                $state.go('logIn')
              })
        }



    }
}());

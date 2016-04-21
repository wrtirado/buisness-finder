(function() {
    'use strict';

    angular.module('controllers', [])
        .controller('mapController', mapController)

    mapController.$inject = ['businessFactory', 'NgMap', '$state','userFactory']

    function mapController(businessFactory, NgMap, $state,userFactory) {
        var mapCtrl = this
        mapCtrl.newUser = {}
        
            // Seting up ng-Map
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
        });

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
            var i = $.inArray(event.target.name, mapCtrl.userSelectedBusinessOptions)
            if (i > -1) {
                mapCtrl.userSelectedBusinessOptions.splice(i, 1)
            } else {

                mapCtrl.userSelectedBusinessOptions.push(event.target.name);
            }

        }


        mapCtrl.businessFilter = function(business) {
            if (mapCtrl.userSelectedBusinessOptions.length > 0) {
                var matchedOptionsInBizz = 0
                for (var i = 0; i < business.options.length; i++) {
                  // console.log("Array Check:"+business.options[i]+"Result: "+ $.inArray(business.options[i], mapCtrl.userSelectedBusinessOptions)+" Compare Array:"+ mapCtrl.userSelectedBusinessOptions);
                    if ($.inArray(business.options[i], mapCtrl.userSelectedBusinessOptions) >= 0) {
                        matchedOptionsInBizz++
                    }
                }
                // console.log("OprionsCounter: "+ optionsCheckCounter + "business.length: "+  business.options.length);
                // console.log("checked array",mapCtrl.businessOptions);
                if (matchedOptionsInBizz >= mapCtrl.userSelectedBusinessOptions.length ){
                  return business
                }
                else {
                  return
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

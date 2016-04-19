(function() {
    'use strict';

    angular.module('controllers', [])
        .controller('mapController', mapController)

    mapController.$inject = ['businessFactory', 'NgMap', '$state']

    function mapController(businessFactory, NgMap, $state) {
        var mapCtrl = this
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

        mapCtrl.businessOptions = ['Gluten Free', 'Dairy Free', 'Vegan', 'Handicap Accessible', 'Free WiFi', 'Kid Friendly']

        mapCtrl.includeOptions = function(event) {
            var i = $.inArray(event.target.name, mapCtrl.businessOptions);
            if (i > -1) {
                console.log(mapCtrl.businessOptions)
                mapCtrl.businessOptions.splice(i, 1);
            } else {
                console.log(mapCtrl.businessOptions)
                mapCtrl.businessOptions.push(event.target.name);
            }
        }

        /* ************************************************************************** */
        /* Portfolio Filter ******************************************************************* */
        /* ************************************************************************** */

        mapCtrl.businessFilter = function(business) {
            if (mapCtrl.businessOptions.length > 0) {
                var optionsCheckCounter = 0
                for (var i = 0; i < business.options.length; i++) {
                    if ($.inArray(business.options[i], mapCtrl.businessOptions) < 0) {
                        optionsCheckCounter++
                    }
                }
                if (optionsCheckCounter <= business.options.length && optionsCheckCounter > 0){
                  return business
                }
                else {return}
            }
        }


        // mapCtrl.initModals = function() {
        //   $('.modal-trigger').leanModal() // Initialize the modals
        // }
        // mapCtrl.setCurrentR = function(business) {
        //   mapCtrl.currentR = business // Initialize the modals
        // }

        // functions for setting true and false of checkboxes

    }
}());

var db               = require('../models/mapigatorModel'),
    jwt              = require('jsonwebtoken'),
    secret           = "this is so secret"
    geocoderProvider = 'google'
    httpAdapter      = 'http'
    geocoder         = require('node-geocoder')(geocoderProvider, httpAdapter)



    geocoder.geocode('29 champs elysée paris', function(err, res) {
        console.log(res);
    })



module.exports = {
    mapiCtrl: {
        getAll: function(req, res) {
            console.log("getAll function gets called");
            db.Bizz.find({}, function(err, business) {
                console.log("finding all businesses");
                if (err) {
                    console.log(err)
                } else {
                    res.json(business)
                }
            })
        },
        create: function(req, res) {
            console.log('3 - serverSide: running inside the mapigatorController.js file', req.body)
            var business = new db.Bizz(req.body)
            console.log("3.1, business object gets passed into the Schema, and turns into - ", business)
            business.save(function(err, business) {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else {
                  geocoder.geocode(business.address, function(err, res) {
                      if(err){
                        consol.log(err)
                      }
                      else{
                        db.Bizz.findOneAndUpdate({ _id: business._id}, { $set:{ lat: res.latitude, long: res.longitude}}, function(error, business2){
                          if(error){
                            console.log(error)
                          }
                          else{console.log("successfuly updated lat and long", business2)}
                        })
                      }
                  })
                    console.log("4 - serverSide: running inside the mapigatorController.js file --- Business Created!!!")
                    res.json(business)
                }
            })
        },

        getSingle: function(req, res) {
            var id = req.params.id
            db.Bizz.findOne({
                _id: id
            }, function(err, business) {
                if (err) {
                    res.json(err)
                } else {
                    console.log("Getting a single Business");
                    res.json(business)
                }
            })
        },
        update: function(req, res) {
            console.log('3 - serverSide: update function gets called, runs the findOneAndUpdate method defined within express.')
            var id = req.params.id
            db.Bizz.findOneAndUpdate({
                _id: id
            }, req.body, function(err, business) {
                console.log('4 - serverSide: findOne express method is called, finds one business, and updates it.')
                res.json({
                    message: "Updated Business!"
                })
            })
        },
        destroy: function(req, res) {
            console.log('3 - serverSide: running inside the mapigatorController.js file')
            var id = req.params.id
            db.Bizz.remove({
                _id: id
            }, function(err) {
                if (err) res.json(err)
                console.log("4 - serverSide: running inside the mapigatorController.js file --- Business Deleted!!!")
                res.json({
                    message: "Deleted Business!"
                })
            })
        }
    },
    userCtrl: {
        create: function(req, res) {
            var user = new db.User(req.body)
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else {
                    res.json(user)
                }
            })
        },
        getAll: function(req, res) {
            db.User.find({}, function(err, user) {
                console.log("finding all businesses");
                if (err) {
                    res.json(err)
                } else {
                    res.json(user)
                }
            })
        },
        signIn: function(req, res) {
            console.log('Signing In')
            db.User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (err) {
                    res.jon(err)
                }
                // Check if user exists
                if (user) {
                    if (user.checkPassword(req.body.password)) {
                        var token = jwt.sign({
                            name: user.name,
                            email: user.email
                        },  secret, {
                            expiresInMinutes: 1440
                        });
                        // 4 - Send back a success message with the JWT
                        res.json({
                            success: true,
                            message: 'YOU get a token! YOU get a token! YOU get a token!',
                            token: token
                        })
                    } else {
                        res.json({
                            message: "Password Does Not Match"
                        })
                    }
                } else {
                    res.json({
                        message: "User Does Not Exist"
                    })
                }
            })
        }
    }
}

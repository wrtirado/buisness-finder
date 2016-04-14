var db = require('../models/mapigatorModel')

module.export {
  mapiCtrl:{
    getAll: function(req, res) {
      db.Business.find({}, function(err, business) {
        if (err) {
          res.json(err)
        } else {
          res.json(business)
        }
      })
    },
    create: function(req, res) {
      console.log('3 - serverSide: running inside the mapigatorController.js file')
      var restaurant = new db.Restaurant(req.body)
      restaurant.save(function(err, rest) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the restaurants_controller.js file --- Restaurant Created!!!", rest)
        res.json(rest)
      })
    },

    getSingle: function(req, res) {
      var id = req.params.id
        // var restaurant = restaurants.filter(function(r) {
        //   return r._id == id
        // })
      db.Business.findOne({
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
  }
}

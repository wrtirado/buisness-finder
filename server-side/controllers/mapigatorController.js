var Bizz = require('../models/mapigatorModel')
module.exports = {
  mapiCtrl:{
    getAll: function(req, res) {
      console.log("getAll function gets called");
      Bizz.find({}, function(err, business) {
        console.log("finding all businesses");
        if (err) {
          res.json(err)
        } else {
          res.json(business)
        }
      })
    },
    create: function(req, res) {
      console.log('3 - serverSide: running inside the mapigatorController.js file', req.body)
      var business = new Bizz(req.body)
      console.log("3.1, business object gets passed into the Schema, and turns into - ", business)
      business.save(function(err, business) {
        if (err){
          console.log(err)
          res.json(err)
        }
        console.log("4 - serverSide: running inside the mapigatorController.js file --- Business Created!!!")
        res.json(business)
      })
    },

    getSingle: function(req, res) {
      var id = req.params.id
      Bizz.findOne({_id: id}, function(err, business) {
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
      Bizz.findOneAndUpdate({_id: id}, req.body, function(err, business) {
        console.log('4 - serverSide: findOne express method is called, finds one business, and updates it.')
          res.json({message: "Updated Business!"})
        })
      },
      destroy: function(req, res) {
      console.log('3 - serverSide: running inside the mapigatorController.js file')
      var id = req.params.id
      Bizz.remove({_id: id}, function(err) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the mapigatorController.js file --- Business Deleted!!!")
        res.json({message: "Deleted Business!"})
      })
    }
  }
}

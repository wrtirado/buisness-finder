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
      var business = new db.Business(req.body)
      business.save(function(err, business) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the mapigatorController.js file --- Business Created!!!")
        res.json(business)
      })
    },

    getSingle: function(req, res) {
      var id = req.params.id
      db.Business.findOne({_id: id}, function(err, business) {
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
      db.Business.findOneAndUpdate({_id: id}, req.body, function(err, business) {
        console.log('4 - serverSide: findOne express method is called, finds one business, and updates it.')
          res.json(business)
        })
      },
      destroy: function(req, res) {
      console.log('3 - serverSide: running inside the mapigatorController.js file')
      var id = req.params.id
      db.Business.remove({_id: id}, function(err) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the mapigatorController.js file --- Business Deleted!!!")
        res.json({message: "Deleted Business!"})
      })
    }
  }
}

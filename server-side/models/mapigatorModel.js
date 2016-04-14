var
  mongoose = require('mongoose'),
  Shcema   = mongoose.Schema



var businessSchema = new Schema({
  name               : {type: String, required: true},
  address            : {type: String, required: true},
  glutenFree         : {type: Boolean, required: true},
  dairyFree          : {type: Boolean, required: true},
  vegan              : {type: Boolean, required: true},
  handicapAccessible : {type: Boolean, required: true},
  freeWifi           : {type: Boolean, required: true},
  kidFriendly        : {type: Boolean, required: true},
  description        : String,
  createdAt          : {type: Date, Default: Date.now}
})


module.exports = { // turning the variable restaurantSchema into a mongoose model, assigning it to the Restaurant key inside the module.exports object
  Business : mongoose.model('Business', businessSchema)
}

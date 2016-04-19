var
  mongoose           = require('mongoose'),
  Schema             = mongoose.Schema,
  businessSchema     = new Schema({
  name               : {type: String,  required: true},
  address            : {type: String,  required: true},
  options            : [],
  // glutenFree         : {type: Boolean, required: true, default: false},
  // dairyFree          : {type: Boolean, required: true, default: false},
  // vegan              : {type: Boolean, required: true, default: false},
  // handicapAccessible : {type: Boolean, required: true, default: false},
  // freeWifi           : {type: Boolean, required: true, default: false},
  // kidFriendly        : {type: Boolean, required: true, default: false},
  description        : String,
  createdAt          : {type: Date, default: Date.now}
})


module.exports = mongoose.model('test', businessSchema)// turning the variable restaurantSchema into a mongoose model, assigning it to the Restaurant key inside the module.exports object

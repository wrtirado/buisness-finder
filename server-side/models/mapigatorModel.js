var
  mongoose = require('mongoose'),
  Shcema   = mongoose.Schema



var businessSchema = new Schema({


})


module.exports = { // turning the variable restaurantSchema into a mongoose model, assigning it to the Restaurant key inside the module.exports object
  Business : mongoose.model('Business', businessSchema)
}

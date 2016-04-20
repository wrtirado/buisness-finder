var
  bcryptjs           = require('bcryptjs')
  mongoose           = require('mongoose'),
  Schema             = mongoose.Schema,
  businessSchema     = new Schema({
  name               : {type: String,  required: true},
  address            : {type: String,  required: true},
  options            : [],
  description        : String,
  createdAt          : {type: Date, default: Date.now}
}),

    userSchema         = new Schema({
    name      : {type: String, required: true},
    email     : {type: String, required: true},
    password  : {type: String, required: true},
    createdAt : {type: Date,    default: Date.now}
  })

userSchema.pre('save', function(next){
    var user = this
    if (!user.isModified('password')) return next()
    user.password = bcryptjs.hashSync(user.password, 8)

    next()
})

userSchema.methods.checkPassword = function(password){
  var user = this
  return bcryptjs.compareSync(password, user.password)
}

module.exports = {
  User : mongoose.model('User', userSchema),// turning the variable restaurantSchema into a mongoose model, assigning it to the Restaurant key inside the module.exports object
  Bizz : mongoose.model('Bizz', businessSchema)
}

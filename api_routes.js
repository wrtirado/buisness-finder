var
    apiRouter = require('express').Router(),
    jwt = require('jsonwebtoken'),
    secret = "this is so secret",
    ctrl = require('./server-side/controllers/mapigatorController')

apiRouter.route('/signIn')
    .post(ctrl.userCtrl.signIn)


apiRouter.route('/users')
    .post(ctrl.userCtrl.create)
    .get(ctrl.userCtrl.getAll)

apiRouter.use(function(req, res, next) {
  // 1 - let's check everywhere for the user's token
  var token = req.body.token || req.params.token || req.headers['x-access-token']

  //2 - If we find a token, we will use mySpecialSecret to try and decode it
  //    - if it can't be decoded, send the user an error that they don't have the right token

  if (token){
    jwt.verify(token, secret, function(err, decoded){
      if(err){
        return res.status(403).send({success:false, message:"can't authenticate token"})
      }
      else {
        req.decoded = decoded
        next()
      }
    })
  }
  else{
    return res.status(403).send({success: false, message: "no token provided"})
  }
})

apiRouter.route('/businesses')
    .get(ctrl.mapiCtrl.getAll)
    .post(ctrl.mapiCtrl.create)

apiRouter.route('/businesses/:id')
    .get(ctrl.mapiCtrl.getSingle)
    .put(ctrl.mapiCtrl.update)
    .delete(ctrl.mapiCtrl.destroy)

module.exports = apiRouter

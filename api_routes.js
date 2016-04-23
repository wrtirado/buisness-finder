var
    apiRouter = require('express').Router(),
    jwt = require('jsonwebtoken'),
    secret = "this is so secret",
    ctrl = require('./server-side/controllers/mapigatorController')

apiRouter.route('/signIn')
    .post(ctrl.userCtrl.signIn)


apiRouter.route('/users')
    .post(ctrl.userCtrl.create)


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
        console.log("decoding token", decoded);
        req.decoded = JSON.stringify(decoded)
        next()
      }
    })
  }
  else{
    return res.status(403).send({success: false, message: "no token provided"})
  }
})

apiRouter.route('/users')
    .get(ctrl.userCtrl.getAll)

apiRouter.route('/users/:id')
    .delete(ctrl.userCtrl.destroy)


apiRouter.route('/businesses')
    .get(ctrl.mapiCtrl.getAll)
    .post(ctrl.mapiCtrl.create)

apiRouter.route('/businesses/:id')
    .get(ctrl.mapiCtrl.getSingle)
    .put(ctrl.mapiCtrl.update)
    .delete(ctrl.mapiCtrl.destroy)

apiRouter.route('/me')
    .get(function (req, res){
      console.log("passed decoded info", req.decoded);
      res.json(req.decoded)
    })

module.exports = apiRouter

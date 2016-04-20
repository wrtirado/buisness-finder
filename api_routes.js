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
    // this is going to run EVERY TIME someone goes to a url that starts with /api
    // so we should probably check to see if they are logged in here
    // We'll do that in the next lesson
    // in the meantime, let's just console.log something, so we know it works
    console.log("someone is visiting our API, we should check to see if they are logged in")

    // ...and then we'll let the request continue on to our app:
    next()
})

apiRouter.route('/businesses')
    .get(ctrl.mapiCtrl.getAll)
    .post(ctrl.mapiCtrl.create)

apiRouter.route('/businesses/:id')
    .get(ctrl.mapiCtrl.getSingle)
    .put(ctrl.mapiCtrl.update)
    .delete(ctrl.mapiCtrl.destroy)

module.exports = apiRouter

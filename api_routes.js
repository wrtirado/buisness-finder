var
  apiRoutes = require('express').Router(),
  ctrl      = require('./server-side/cotrollers/mapigatorController')

  apiRouter.route('/businesses')
      .get(ctrl.mapiCtrl.getAll)
      .post(ctrl.mapiCtrl.create)


module.exports = apiRoutes

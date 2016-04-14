var
  apiRoutes = require('express').Router(),
  ctrl      = require('./server-side/cotrollers/mapigatorController')

  apiRouter.route('/businesses')
      .get(ctrl.mapiCtrl.getAll)
      .post(ctrl.mapiCtrl.create)

  apiRouter.route('/businesses/:id')
      .get(ctrl.mapiCtrl.getSingle)
      .put(ctrl.mapiCtrl.update)
      .delete(ctrl.mapiCtrl.destroy)

module.exports = apiRoutes

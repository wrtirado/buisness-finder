var
  apiRouter = require('express').Router(),
  ctrl      = require('./server-side/controllers/mapigatorController')
console.log('XXXXX',ctrl)
  apiRouter.route('/businesses')
      .get(ctrl.mapiCtrl.getAll)
      .post(ctrl.mapiCtrl.create)

  apiRouter.route('/businesses/:id')
      .get(ctrl.mapiCtrl.getSingle)
      .put(ctrl.mapiCtrl.update)
      .delete(ctrl.mapiCtrl.destroy)

module.exports = apiRouter

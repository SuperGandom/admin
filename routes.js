const requireAdmin = require('./middlewares/requireAdmin');
const requireSupport = require('./middlewares/requireSupport');
const requireAuth = require('./middlewares/requireAuth');
//***YYY */
const ctrlUser = require('./controllers/auth.controller');
const ctrlFile = require('./file');
const router = require('express').Router();
//user
router.post('/login', ctrlUser.login);
router.post('/uploadAvatar',[requireAuth], ctrlFile.uploadAvatar);
router.post('/resetPassword', [requireAuth], ctrlUser.resetPassword);
//system
router.post('/getEmployee', [requireAuth,requireAdmin],ctrlUser.getEmployee);
router.post('/createEmployee',[requireAuth,requireAdmin],ctrlUser.createEmployee);
router.post('/updateEmployee', [requireAuth,requireAdmin],ctrlUser.updateEmployee);
router.post('/delEmployee',[requireAuth,requireAdmin], ctrlUser.delEmployee);
//customer
router.post('/getCustomer', [requireAuth,requireSupport],ctrlUser.getCustomer);
router.post('/createCustomer',[requireAuth,requireSupport],ctrlUser.createCustomer);
router.post('/updateCustomer', [requireAuth,requireSupport],ctrlUser.updateCustomer);
router.post('/delCustomer',[requireAuth,requireSupport], ctrlUser.delCustomer);
module.exports = (app) => {
  app.use('/api', router);

  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message
    });
  });
};

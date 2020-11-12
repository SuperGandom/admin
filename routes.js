const router = require('express').Router();
//middelwares
const requireAdmin = require('./middlewares/requireAdmin');
const requireSupport = require('./middlewares/requireSupport');
const requireAuth = require('./middlewares/requireAuth');
//backend controllers
const ctrlUser = require('./controllers/admin.controller');
const ctrlProduct = require('./controllers/product.controller');
const ctrlOrder = require('./controllers/order.controller');
const ctrlFile = require('./file');
//admin login, upload avatar and password reset
router.post('/login', ctrlUser.login);
router.post('/uploadAvatar',[requireAuth], ctrlFile.uploadAvatar);
router.post('/resetPassword', [requireAuth], ctrlUser.resetPassword);
//Employee table CRUD
router.post('/getEmployee', [requireAuth,requireAdmin],ctrlUser.getEmployee);
router.post('/createEmployee',[requireAuth,requireAdmin],ctrlUser.createEmployee);
router.post('/updateEmployee', [requireAuth,requireAdmin],ctrlUser.updateEmployee);
router.post('/delEmployee',[requireAuth,requireAdmin], ctrlUser.delEmployee);
router.post('/importCsvEmployee',[requireAuth,requireAdmin], ctrlUser.importCsvEmployee);
//customer table CRUD
router.post('/getCustomer', [requireAuth,requireSupport],ctrlUser.getCustomer);
router.post('/createCustomer',[requireAuth,requireSupport],ctrlUser.createCustomer);
router.post('/updateCustomer', [requireAuth,requireSupport],ctrlUser.updateCustomer);
router.post('/delCustomer',[requireAuth,requireSupport], ctrlUser.delCustomer);
router.post('/importCsvCustomer',[requireAuth,requireSupport], ctrlUser.importCsvCustomer);
//Category Table CRUD of product page
router.post('/getCategory', [requireAuth,requireSupport],ctrlProduct.getCategory);
router.post('/createCategory',[requireAuth,requireSupport],ctrlProduct.createCategory);
router.post('/updateCategory', [requireAuth,requireSupport],ctrlProduct.updateCategory);
router.post('/delCategory',[requireAuth,requireSupport], ctrlProduct.delCategory);
router.post('/importCsvCategory',[requireAuth,requireSupport], ctrlProduct.importCsvCategory);
//Product Table CRUD of product page
router.post('/getProduct', [requireAuth,requireSupport],ctrlProduct.getProduct);
router.post('/createProduct',[requireAuth,requireSupport],ctrlProduct.createProduct);
router.post('/updateProduct', [requireAuth,requireSupport],ctrlProduct.updateProduct);
router.post('/delProduct',[requireAuth,requireSupport], ctrlProduct.delProduct);
router.post('/importCsvProduct',[requireAuth,requireSupport], ctrlProduct.importCsvProduct);
//order Table CRUD of product page
router.post('/getOrder', [requireAuth,requireSupport],ctrlOrder.getOrder);
router.post('/delOrder',[requireAuth,requireSupport],ctrlOrder.delOrder);
router.post('/editOrder', [requireAuth,requireSupport],ctrlOrder.editOrder);
router.post('/importCsvOrder',[requireAuth,requireSupport], ctrlOrder.importCsvOrder);
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

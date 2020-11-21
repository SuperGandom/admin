const router = require('express').Router();
//middelwares
const requireAdmin = require('./middlewares/requireAdmin');
const requireSupport = require('./middlewares/requireSupport');
const requireAuth = require('./middlewares/requireAuth');
//backend controllers
const ctrlUser = require('./controllers/admin');
const ctrlProduct = require('./controllers/product');
const ctrlBrand = require('./controllers/brand');
const ctrlCategory = require('./controllers/category');
const ctrlCustomerType = require('./controllers/customerType');
const ctrlMedia = require('./controllers/media');
const ctrlOrder = require('./controllers/order');
const ctrlStock = require('./controllers/stock');
const ctrlSupplier = require('./controllers/supplier');
const ctrlReport = require('./controllers/report');

const ctrlFile = require('./file');
//admin login, upload avatar and password reset
router.post('/login', ctrlUser.login);
router.post('/uploadAvatar',[requireAuth], ctrlFile.uploadAvatar);
router.post('/resetPassword', [requireAuth], ctrlUser.resetPassword);
//Employee table CRUD
router.post('/employ/get', [requireAuth,requireAdmin],ctrlUser.getEmployee);
router.post('/employ/create',[requireAuth,requireAdmin],ctrlUser.createEmployee);
router.post('/employ/update', [requireAuth,requireAdmin],ctrlUser.updateEmployee);
router.post('/employ/del',[requireAuth,requireAdmin], ctrlUser.delEmployee);
router.post('/employ/importCsv',[requireAuth,requireAdmin], ctrlUser.importCsvEmployee);
//customer table CRUD
router.post('/customer/get', [requireAuth,requireSupport],ctrlUser.getCustomer);
router.post('/customer/create',[requireAuth,requireSupport],ctrlUser.createCustomer);
router.post('/customer/update', [requireAuth,requireSupport],ctrlUser.updateCustomer);
router.post('/customer/del',[requireAuth,requireSupport], ctrlUser.delCustomer);
router.post('/customer/importCsv',[requireAuth,requireSupport], ctrlUser.importCsvCustomer);
//CustomerType
router.post('/customerType/get', [requireAuth,requireSupport],ctrlCustomerType.get);
router.post('/customerType/create',[requireAuth,requireSupport],ctrlCustomerType.add);
router.post('/customerType/update', [requireAuth,requireSupport],ctrlCustomerType.edit);
router.post('/customerType/del',[requireAuth,requireSupport], ctrlCustomerType.del);
router.post('/customerType/importCsv',[requireAuth,requireSupport], ctrlCustomerType.importCSV);
//Product
router.post('/product/get', [requireAuth,requireSupport],ctrlProduct.get);
router.post('/product/create',[requireAuth,requireSupport],ctrlProduct.add);
router.post('/product/update', [requireAuth,requireSupport],ctrlProduct.edit);
router.post('/product/del',[requireAuth,requireSupport], ctrlProduct.del);
router.post('/product/importCsv',[requireAuth,requireSupport], ctrlProduct.importCSV);
//Category
router.post('/category/get', [requireAuth,requireSupport],ctrlCategory.get);
router.post('/category/create',[requireAuth,requireSupport],ctrlCategory.add);
router.post('/category/update', [requireAuth,requireSupport],ctrlCategory.edit);
router.post('/category/del',[requireAuth,requireSupport], ctrlCategory.del);
router.post('/category/importCsv',[requireAuth,requireSupport], ctrlCategory.importCSV);
//Media
router.post('/media/get', [requireAuth,requireSupport],ctrlMedia.get);
router.post('/media/create',[requireAuth,requireSupport],ctrlMedia.add);
router.post('/media/update', [requireAuth,requireSupport],ctrlMedia.edit);
router.post('/media/del',[requireAuth,requireSupport], ctrlMedia.del);
router.post('/media/importCsv',[requireAuth,requireSupport], ctrlMedia.importCSV);
//Brand
router.post('/brand/get', [requireAuth,requireSupport],ctrlBrand.get);
router.post('/brand/create',[requireAuth,requireSupport],ctrlBrand.add);
router.post('/brand/update', [requireAuth,requireSupport],ctrlBrand.edit);
router.post('/brand/del',[requireAuth,requireSupport], ctrlBrand.del);
router.post('/brand/importCsv',[requireAuth,requireSupport], ctrlBrand.importCSV);
//Stock
router.post('/stock/get', [requireAuth,requireSupport],ctrlStock.get);
router.post('/stock/create',[requireAuth,requireSupport],ctrlStock.add);
router.post('/stock/update', [requireAuth,requireSupport],ctrlStock.edit);
router.post('/stock/del',[requireAuth,requireSupport], ctrlStock.del);
router.post('/stock/importCsv',[requireAuth,requireSupport], ctrlStock.importCSV);
//Supplier
router.post('/supplier/get', [requireAuth,requireSupport],ctrlSupplier.get);
router.post('/supplier/create',[requireAuth,requireSupport],ctrlSupplier.add);
router.post('/supplier/update', [requireAuth,requireSupport],ctrlSupplier.edit);
router.post('/supplier/del',[requireAuth,requireSupport], ctrlSupplier.del);
router.post('/supplier/importCsv',[requireAuth,requireSupport], ctrlSupplier.importCSV);
//order Table CRUD of product page
router.post('/order/get', [requireAuth,requireSupport],ctrlOrder.getOrder);
router.post('/order/delete',[requireAuth,requireSupport],ctrlOrder.delOrder);
router.post('/order/update', [requireAuth,requireSupport],ctrlOrder.editOrder);
router.post('/order/importCsv',[requireAuth,requireSupport], ctrlOrder.importCsvOrder);
//report
router.post('/report/get', [requireAuth,requireSupport],ctrlReport.get);
router.post('/report/create',[requireAuth,requireSupport],ctrlReport.add);
router.post('/report/update', [requireAuth,requireSupport],ctrlReport.edit);
router.post('/report/del',[requireAuth,requireSupport], ctrlReport.del);
router.post('/report/importCsv',[requireAuth,requireSupport], ctrlReport.importCSV);
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

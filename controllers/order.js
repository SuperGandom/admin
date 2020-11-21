const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');
const crypto = require('crypto');
const csvtojson = require('csvtojson');
const ctrlFile = require('../file');
const categoryDAO = require('../DAO/categoryDAO');
const reportDAO = require('../DAO/reportDAO');
const productDAO = require('../DAO/productDAO');
const orderDAO = require('../DAO/orderDAO');
//API to get order list
let getOrder = async (req, res) => {
  try {
    const result = await orderDAO.get({},{ order_at: -1 });
    res.status(200).json({ message: 'Success', result: result });
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err: error
    });

  };
}
//API to edit order list
let editOrder = async (req, res) => {
  try {
    const criteria = {
      _id: req.body._id
    }
    delete req.body._id;
    const result = await orderDAO.update(criteria, req.body, {});//update status of order data to delivered or rejected
    if (!result.errors) {
      if(req.body.status=="Rejected") {//when status is rejected, retrieve current stock of product
        const product = await productDAO.get({title:req.body.product});//get previous current stock of product
        const addQ = product[0].currentStock + req.body.quantity;//add rejected quantity of order
        productDAO.update({title:req.body.product},{currentStock:addQ},{});//update quantity
        const createBody = {
          orderName: req.body.name,
          customer: req.body.customer,
          product: req.body.product,
          category: product[0].category,
          quantity: req.body.quantity,
          price: req.body.total,
          brand: product[0].brand,
          supplier: product[0].supplier,
          customer: product[0].customer,
          order_at: req.body.order_at,
          status: "Rejected",
        }
        reportDAO.create(createBody);
      }
      else if(req.body.status=="Delivered") {//when status is Delivered, retrieve current stock of product
        const product = await productDAO.get({title:req.body.product});//get previous current stock of product
        const createBody = {
          orderName: req.body.name,
          customer: req.body.customer,
          product: req.body.product,
          category: product[0].category,
          quantity: req.body.quantity,
          price: req.body.total,
          brand: product[0].brand,
          supplier: product[0].supplier,
          customer: product[0].customer,
          order_at: req.body.order_at,
          status: "Delivered",
        }
        reportDAO.create(createBody);
      }
      res.status(200).json({ message: 'Success', result: result });
    }
    else res.status(401).json({ message: 'Failure', result: result })
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err: error
    });

  };
}
let delOrder = async (req, res) => {
  try {
    const { _id } = req.body;
    criteria = {
      _id: _id
    }
    const result = await orderDAO.deletes(criteria);
    if (!result.errors) res.status(200).json({ message: 'Success', result: result })
    else res.status(401).json({ message: 'Failure', result: result });
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err: error
    });

  };
}
//api to import csv file
let importCsvOrder = async (req, res) => {
  try {
    let csvDataBuffer = JSON.stringify(req.body);
    let csvData = JSON.parse(csvDataBuffer).data;
    let csvDataString = csvData.toString("utf8");
    const result = await csvtojson().fromString(csvDataString);
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const id = result[i]._id;
        delete result[i]._id;
        delete result[i].__v;
        const exist = await orderDAO.get({name:result[i].name},{})
        if( exist.length>0 ){
          await orderDAO.update({name:result[i].name},result[i],{})
        }else{
          if(!result[i].order_at) result[i].order_at=new Date().toISOString();
          if(!result[i].status) result[i].status="On Hold";
          if(!result[i].name) result[i].name=String(Date().now());

          const product = await productDAO.get({title:result[i].product});//get previous current stock of product
          const addQ = product[0].currentStock - result[i].quantity;//remove quantity of order
          if(addQ>0) {
            await  productDAO.update({title:result[i].product},{currentStock:addQ},{});//update quantity
            await orderDAO.create(result[i]);
          }
        }
      }
     return res.status(200).json({ message: 'Success'});
    }
    else res.status(401).json({ message: 'Wrong CSV file' })
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err: error
    });
  }
}
module.exports = {
  getOrder: getOrder,
  delOrder: delOrder,
  editOrder: editOrder,
  importCsvOrder: importCsvOrder,
}

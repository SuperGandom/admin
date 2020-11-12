const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');
const crypto = require('crypto');
const csvtojson = require('csvtojson');
const ctrlFile = require('../file');
const categoryDAO = require('../DAO/categoryDAO');
const productDAO = require('../DAO/productDAO');
const orderDAO = require('../DAO/orderDAO');
//API to get order list 
let getOrder = async (req, res) => {
  try{
    const result = await orderDAO.get({},{order_at:-1});
      res.status(200).json({message:'Success',result:result});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
   
  };
}
let editOrder = async (req, res) => {
  try{
    const criteria={
      _id:req.body._id
    }
    delete req.body._id;
      const result = await orderDAO.update(criteria,req.body,{});
      if(!result.errors) res.status(200).json({message:'Success',result:result})
      else      res.status(401).json({message:'Failure',result:result})  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
   
  };
}
let delOrder = async (req, res) => {
  try{
    const {_id} = req.body;
       criteria = {
         _id:_id
       }
       const result = await orderDAO.deletes(criteria);
       if(!result.errors) res.status(200).json({message:'Success',result:result})
       else  res.status(401).json({message:'Failure',result:result});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
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
      for(let i=0; i<result.length; i++){
        delete result[i]._id;
        delete result[i].__v;
      }
      const dell= await orderDAO.remove({});
      const insert = await orderDAO.insert(result);
      if (!insert.errors) {
        res.status(200).json({ message: 'Success', result: insert });
      }
      else res.status(401).json({ message: 'Failure' })
    }
    else res.status(401).json({ message: 'Wrong CSV file' })
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
module.exports = {
  getOrder: getOrder,
  delOrder: delOrder,
  editOrder: editOrder,
  importCsvOrder:importCsvOrder,
 }

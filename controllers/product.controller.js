const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');
const crypto = require('crypto');
const csvtojson = require('csvtojson');
const ctrlFile = require('../file');
const categoryDAO = require('../DAO/categoryDAO');
const productDAO = require('../DAO/productDAO');
// API to create new Category list
let createCategory = async (req, res) => {
  try{
    //check category double exist
    const double=await categoryDAO.get({name:req.body.name});
    if(double.length>0) return res.status(401).json({message:'Category doublicated'})
    //create to database
    delete req.body._id;
    const users = await categoryDAO.create(req.body);
    if(!users.errors) res.status(200).json({message:'Success'})
    else res.status(401).json({message:'Failure'})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
// API to get Category information
let getCategory = async (req, res) => {
  try{
      let criteria = {
      }
      const users = await categoryDAO.get(criteria);
      return res.json({result:users});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
// API to update category information
let updateCategory = async (req, res) => {
  try{
    //check category double exist
    const double=await categoryDAO.get({name:req.body.name,_id:{$ne:req.body._id}});
    if(double.length>0) return res.status(401).json({message:'Category doublicated'})
    //update database
    let criteria={
      _id: req.body._id
    }
    delete req.body._id;
    const users = await categoryDAO.update(criteria,req.body,{});
    if(!users.errors) res.status(200).json({message:'Success',result:users})
    else      res.status(401).json({message:'Failure',result:users})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
//API to delete category 
let delCategory = async (req, res) => {
  try {
       const {_id} = req.body;
       criteria = {
         _id:_id
       }
       const users = await categoryDAO.deletes(criteria);
       if(!users.errors) res.status(200).json({message:'Success',result:users})
       else  res.status(401).json({message:'Failure',result:users});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
//api to import csv file
let importCsvCategory = async (req, res) => {
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
      const dell= await categoryDAO.remove({});
      const insert = await categoryDAO.insert(result);
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
// API to create new Product list
let createProduct = async (req, res) => {
  try{
    //check Product double exist
    const double=await productDAO.get({title:req.body.title});
    if(double.length>0) return res.status(401).json({message:'Product doublicated'})
    //create to database
    delete req.body._id;
    const users = await productDAO.create(req.body);
    if(!users.errors) res.status(200).json({message:'Success'})
    else res.status(401).json({message:'Failure'})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
// API to get Product information
let getProduct = async (req, res) => {
  try{
      let criteria = {
      }
      const users = await productDAO.get(criteria);
      return res.json({result:users});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
// API to update Product information
let updateProduct = async (req, res) => {
  try{
    //check Product double exist
    const double=await productDAO.get({title:req.body.title,_id:{$ne:req.body._id}});
    if(double.length>0) return res.status(401).json({message:'Product doublicated'})
    //update database
    let criteria={
      _id: req.body._id
    }
    delete req.body._id;
    const users = await productDAO.update(criteria,req.body,{});
    if(!users.errors) res.status(200).json({message:'Success',result:users})
    else      res.status(401).json({message:'Failure',result:users})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
//API to Product category 
let delProduct = async (req, res) => {
  try {
       const {_id} = req.body;
       criteria = {
         _id:_id
       }
       const users = await productDAO.deletes(criteria);
       if(!users.errors) res.status(200).json({message:'Success',result:users})
       else  res.status(401).json({message:'Failure',result:users});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
//api to import csv file
let importCsvProduct = async (req, res) => {
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
      const dell= await productDAO.remove({});
      const insert = await productDAO.insert(result);
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
   getCategory:getCategory,
   updateCategory:updateCategory,
   createCategory:createCategory,
   delCategory:delCategory,
   importCsvCategory:importCsvCategory,
   getProduct:getProduct,
   updateProduct:updateProduct,
   createProduct:createProduct,
   delProduct:delProduct,
   importCsvProduct:importCsvProduct,
 }

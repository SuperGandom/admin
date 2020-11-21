const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');
const crypto = require('crypto');
const csvtojson = require('csvtojson');
const DAO = require('../DAO/customerTypeDAO');
// API to create new  list
let add = async (req, res) => {
  try{
    //create to database
    delete req.body._id;
    const users = await DAO.create(req.body);
    if(!users.errors) res.status(200).json({message:'Success'})
    else res.status(401).json({message:'Failure',err:users.errors})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to get information
let get = async (req, res) => {
  try{
      let criteria = req.body;
      const users = await DAO.get(criteria);
      return res.json({result:users});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to update information
let edit = async (req, res) => {
  try{
    //update database
    let criteria={
      _id: req.body._id
    }
    delete req.body._id;
    const users = await DAO.update(criteria,req.body,{});
    if(!users.errors) res.status(200).json({message:'Success',result:users})
    else      res.status(401).json({message:'Failure',result:users.errors})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
//API to del 
let del = async (req, res) => {
  try {
       const {_id} = req.body;
       criteria = {
         _id:_id
       }
       const users = await DAO.deletes(criteria);
       if(!users.errors) res.status(200).json({message:'Success',result:users})
       else  res.status(401).json({message:'Failure',result:users.errors});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
//api to import csv file
let importCSV = async (req, res) => {
  try {
    let csvDataBuffer = JSON.stringify(req.body);
    let csvData = JSON.parse(csvDataBuffer).data;
    let csvDataString = csvData.toString("utf8");
    let result = await csvtojson().fromString(csvDataString);
    let count = 0;
    if (result.length > 0) {
      for(let i=0; i<result.length; i++){
        const id=result[i]._id;
        delete result[i]._id;
        const exist=await DAO.get({name:result[i].name});
        if(exist.length>0) {
          const u = await DAO.update({name:result[i].name},result[i],{});
          if(!u.errors) count++;
        }else {
          const a = await DAO.create(result[i]);
          if(!a.errors) count++;
        }
      }
      return res.status(200).json({ message: ''+count+' of '+result.length+' items imported!'}); 
    }
    else res.status(401).json({ message: 'Wrong CSV file' })
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
module.exports = {
   get:get,
   edit:edit,
   add:add,
   del:del,
   importCSV:importCSV,
 }

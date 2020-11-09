// const async = require("async");
const employDAO = require('../DAO/employDAO');
const customerDAO = require('../DAO/customerDAO');
const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');
const crypto=require('crypto');/* API to register new user */
const ctrlFile = require('../file');
/* API to login user */
let login = async (req, res) => {
  const result = validationResult(req);
  try {
    if (!result.isEmpty()) return res.status(403).json({message: 'validation incorrect'});
    const { username, password } = req.body;
    //username
    const user = await employDAO.get({username: username});
    if (!user) return res.status(403).json({message: 'username incorrect'});
    //password
    const passwordValid = await verifyPassword(password, user[0].password);
    if (passwordValid) {
      const token = createToken(user[0]);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const userInfo = user[0];
      res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt
      });
    }else res.status(403).json({message: 'password incorrect'});
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
};
let resetPassword = async (req, res) => {
  try{
    const {previous,password,username}=req.body.data;
    const newHash = await hashPassword(password);
    //username
    const user = await employDAO.get({username: username});
    if (!user) return res.status(403).json({message: 'username incorrect'});
    //password
    const passwordValid = await verifyPassword(previous, user[0].password);
    if (passwordValid) {
    const p= await employDAO.update({username: username},{password:newHash},{});
    if(!p.errors) res.status(200).json({message:'Success'})
    else res.status(401).json({message:'Failure'})
    }else return res.status(403).json({message: 'Previous password incorrect'});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let createEmployee = async (req, res) => {
  try{
    //username doublication
    const double=await employDAO.get({username:req.body.username});
    if(double.length>0) return res.status(401).json({message:'Username doublicated'})
    delete req.body._id;
    req.body.password = await hashPassword(req.body.password);
    const users = await employDAO.create(req.body);
    if(!users.errors) res.status(200).json({message:'Success'})
    else res.status(401).json({message:'Failure'})
  }catch (error) {
    ctrlFile.deleteItem(req.body.avatar);
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let getEmployee = async (req, res) => {
  try{
      const {username} = req.body;
      let criteria = {
         username:{
           $ne:username
         }
      }
      const users = await employDAO.get(criteria);
      return res.json({result:users});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let updateEmployee = async (req, res) => {
  try{
    //doublicate
    const double=await employDAO.get({username:req.body.username,_id:{$ne:req.body._id}});
    if(double.length>0) return res.status(401).json({message:'Username doublicated'})
    let criteria={
      _id: req.body._id
    }
    delete req.body._id;
    const users = await employDAO.update(criteria,req.body,{});
    if(!users.errors) res.status(200).json({message:'Success',result:users})
    else      res.status(401).json({message:'Failure',result:users})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let delEmployee = async (req, res) => {
  try {
       const {_id} = req.body;
       criteria = {
         _id:_id
       }
       const users = await employDAO.delete(criteria);
       if(!users.errors) res.status(200).json({message:'Success',result:users})
       else  res.status(401).json({message:'Failure',result:users});
  }catch (error) {
    ctrlFile.deleteItem(req.body.avatar);
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let createCustomer = async (req, res) => {
  try{
    //username doublication
    const double=await customerDAO.get({username:req.body.username});
    if(double.length>0) return res.status(401).json({message:'Username doublicated'})
    delete req.body._id;
    req.body.password = await hashPassword(req.body.password);
    const users = await customerDAO.create(req.body);
    if(!users.errors) res.status(200).json({message:'Success'})
    else res.status(401).json({message:'Failure'})
  }catch (error) {
    ctrlFile.deleteItem(req.body.avatar);
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let getCustomer = async (req, res) => {
  try{
      const {username} = req.body;
      let criteria = {
      }
      const users = await customerDAO.get(criteria);
      return res.json({result:users});
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let updateCustomer = async (req, res) => {
  try{
    //doublicate
    const double=await customerDAO.get({username:req.body.username,_id:{$ne:req.body._id}});
    if(double.length>0) return res.status(401).json({message:'Username doublicated'})
    let criteria={
      _id: req.body._id
    }
    delete req.body._id;
    const users = await customerDAO.update(criteria,req.body,{});
    if(!users.errors) res.status(200).json({message:'Success',result:users})
    else      res.status(401).json({message:'Failure',result:users})
  }catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
let delCustomer = async (req, res) => {
  try {
       const {_id} = req.body;
       criteria = {
         _id:_id
       }
       const users = await customerDAO.delete(criteria);
       if(!users.errors) res.status(200).json({message:'Success',result:users})
       else  res.status(401).json({message:'Failure',result:users});
  }catch (error) {
    ctrlFile.deleteItem(req.body.avatar);
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
module.exports = {
  login: login,
  resetPassword:resetPassword,
  getEmployee:getEmployee,
  createEmployee:createEmployee,
  updateEmployee:updateEmployee,
  delEmployee:delEmployee,
  getCustomer:getCustomer,
  createCustomer:createCustomer,
  updateCustomer:updateCustomer,
  delCustomer:delCustomer,
 }

// const async = require("async");
const DAO = require('../DAO/orderDAO');
const userDAO = require('../DAO/userDAO');
let getOrder = async (req, res) => {
    const users = await DAO.gets({});
    if (users.length>0) {
      res.status(200).json({message:'Success',result:users});
    } else {
      res.status(200).json({message:'No record',result:[]});
  };
}
let delOrder = async (req, res) => {
  const users = await DAO.deletes({
    _id:req.body.data._id
  });
  const del = await DAO.createHistory(req.body.data);
  if (users.length>0) {
    res.status(200).json({message:'Success',result:users});
  } else {
    res.status(200).json({message:'No record',result:[]});
};
}
let confirm = async (req, res) => {
  let criteria = {
    username: req.body.username,
    password: req.body.password
  };
  const checkUser = await userDAO.getUsers(criteria);
  if (checkUser && checkUser.length==1) {
       criteria = {
        _id: req.body.data._id
       }
       const result1 = await DAO.updates(criteria,req.body.data,{});
       if(!result1.errors){
        res.status(200).json({message:'Confirm Success',result:result1});
       } 
       else res.status(401).json({message:'Confirm failure',result:result1})
  }
}
let delHistory = async (req, res) => {
    let criteria = {
      username: req.body.username,
      password: req.body.password
    };
    const check = await userDAO.getUsers(criteria);
    if (check && check.length==1) {
         criteria = {
           _id: req.body.data._id
         }
         const result = await DAO.deletes(criteria);
         if(!result.errors)      res.status(200).json({message:'Delete Success',result:result})
         else      res.status(401).json({message:'Delete Failure',result:result})
    }
  }
  let getHistory = async (req, res) => {
    const users = await DAO.getHistory({});
    if (users.length>0) {
      res.status(200).json({message:'Success',result:users});
    } else {
      res.status(401).json({message:'No record',result:users});
  };
}
module.exports = {
  getOrder: getOrder,
  delOrder: delOrder,
  confirm: confirm,
  delHistory: delHistory,
  getHistory: getHistory,
 }

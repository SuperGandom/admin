// const async = require("async");
const DAO = require('../DAO/ingredientDAO');
const userDAO = require('../DAO/userDAO');
const MD5 = require('md5');
let all = async (req, res) => {
    const users = await DAO.gets({});
    if (users.length>0) {
      res.status(200).json({message:'Success',result:users});
    } else {
      res.status(401).json({message:'No record',result:users});
  };
  }
let del = async (req, res) => {
  let criteria = {
    username: req.body.username,
    password: req.body.password
  };
  const check = await userDAO.getUsers(criteria);
  if (check && check.length==1) {
       criteria = {
         _id: req.body.data._id
       }
       const users = await DAO.deletes(criteria);
       if(!users.errors)      res.status(200).json({message:'Success',result:users})
       else      res.status(401).json({message:'No record',result:users})
  }
}
let add = async (req, res) => {
  console.log(req.body)
  let criteria = {
    username: req.body.username,
    password: req.body.password
  };
  const checkUser = await userDAO.getUsers(criteria);
  if (checkUser && checkUser.length==1) {
       const users = await DAO.creates(req.body.data);
       if(!users.errors) res.status(200).json({message:'Success',result:users})
       else res.status(401).json({message:'No record',result:users})
  }
}
let edit = async (req, res) => {
  let criteria = {
    username: req.body.username,
    password: req.body.password
  };
  const checkUser = await userDAO.getUsers(criteria);
  if (checkUser && checkUser.length==1) {
       let criteria={
         name: req.body.data.name
       }
       delete req.body.data._id;
       const users = await DAO.updates(criteria,req.body.data,{});
       if(!users.errors) res.status(200).json({message:'Success',result:users})
       else      res.status(401).json({message:'No record',result:users})
    }
}
module.exports = {
  all: all,
  edit: edit,
  del: del,
  add: add,
 }

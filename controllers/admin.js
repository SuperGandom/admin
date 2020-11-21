const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');
const crypto = require('crypto');
const csvtojson = require('csvtojson');
const ctrlFile = require('../file');
const employDAO = require('../DAO/employDAO');
const customerDAO = require('../DAO/customerDAO');
/* API to login*/
let login = async (req, res) => {
  const result = validationResult(req);
  try {
    if (!result.isEmpty()) return res.status(403).json({ message: 'validation incorrect' });
    const { username, password } = req.body;
    //check username and user status
    const user = await employDAO.get({ username: username });
    if (user.length==0) return res.status(403).json({ message: 'username incorrect' });
    if (user[0].status == "off") return res.status(403).json({ message: 'Your account is suspended.' });
    //password test
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
    } else res.status(403).json({ message: 'password incorrect' });
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
};
// API to reset password
let resetPassword = async (req, res) => {
  try {
    const { previous, password, username } = req.body.data;
    const newHash = await hashPassword(password);
    //check username
    const user = await employDAO.get({ username: username });
    if (!user) return res.status(403).json({ message: 'username incorrect' });
    //set new password
    const passwordValid = await verifyPassword(previous, user[0].password);//check previous password
    if (passwordValid) {//update new password
      const p = await employDAO.update({ username: username }, { password: newHash }, {});
      if (!p.errors) res.status(200).json({ message: 'Success' })
      else res.status(401).json({ message: 'Failure' })
    }
    else return res.status(403).json({ message: 'Previous password incorrect' });
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
}
// API to create new Employee
let createEmployee = async (req, res) => {
  try {
    //check double username exist
    const double = await employDAO.get({ username: req.body.username });
    if (double.length > 0) return res.status(401).json({ message: 'Username doublicated' })
    //create new user to database
    delete req.body._id;
    req.body.password = await hashPassword(req.body.password);
    const users = await employDAO.create(req.body);
    if (!users.errors) res.status(200).json({ message: 'Success' })
    else res.status(401).json({ message: 'Failure' })
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to get information of Employee from Employee Table
let getEmployee = async (req, res) => {
  try {
    const { username } = req.body;
    console.log(username)
    let criteria = {
        username: {$ne: 'admin'},
        username: {$ne: username},
    }
    const users = await employDAO.get(criteria);
    return res.json({ result: users });
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to update information of Employee
let updateEmployee = async (req, res) => {
  try {
    //check double username exist
    const double = await employDAO.get({ username: req.body.username, _id: { $ne: req.body._id } });
    const avatar = await employDAO.get({ _id: req.body._id });
    if (double.length > 0) return res.status(401).json({ message: 'Username doublicated' })
    //update infromaion
    let criteria = {
      _id: req.body._id
    }
    delete req.body._id;
    const users = await employDAO.update(criteria, req.body, {});
    if (!users.errors) {
      ctrlFile.deleteItem(avatar[0].avatar);
      res.status(200).json({ message: 'Success', result: users });
    }
    else res.status(401).json({ message: 'Failure', result: users })
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
let importCsvEmployee = async (req, res) => {
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
      const dell= await employDAO.remove({username:{$ne:'admin'}});
      const insert = await employDAO.insert(result);
      if (!insert.errors) {
        res.status(200).json({ message: 'Success', result: insert });
      }
      else res.status(401).json({ message: 'Failure' })
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
// API to delete information of Employee
let delEmployee = async (req, res) => {
  try {
    const { _id } = req.body;
    criteria = {
      _id: _id
    }
    const users = await employDAO.deletes(criteria);//delete from database
    if (!users.errors) res.status(200).json({ message: 'Success', result: users })
    else res.status(401).json({ message: 'Failure', result: users });
  } catch (error) {
    ctrlFile.deleteItem(req.body.avatar);
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to create new customer
let createCustomer = async (req, res) => {
  try {
    //check username double exist
    const double = await customerDAO.get({ username: req.body.username });
    if (double.length > 0) return res.status(401).json({ message: 'Username doublicated' })
    //create new customer to database
    delete req.body._id;
    req.body.password = await hashPassword(req.body.password);
    const users = await customerDAO.create(req.body);
    if (!users.errors) res.status(200).json({ message: 'Success' })
    else res.status(401).json({ message: 'Failure' })
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to get customer information
let getCustomer = async (req, res) => {
  try {
    const { username } = req.body;
    let criteria = {
    }
    const users = await customerDAO.get(criteria);
    return res.json({ result: users });
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to update customer information
let updateCustomer = async (req, res) => {
  try {
    //check double username exist
    const double = await customerDAO.get({ username: req.body.username, _id: { $ne: req.body._id } });
    const avatar = await customerDAO.get({ _id: req.body._id });
    if (double.length > 0) return res.status(401).json({ message: 'Username doublicated' })
    //undate info from database
    let criteria = {
      _id: req.body._id
    }
    delete req.body._id;
    const users = await customerDAO.update(criteria, req.body, {});
    if (!users.errors) {
      ctrlFile.deleteItem(avatar[0].avatar);
      res.status(200).json({ message: 'Success', result: users })
    }
    else res.status(401).json({ message: 'Failure', result: users })
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
// API to delete customer
let delCustomer = async (req, res) => {
  try {
    const { _id } = req.body;
    criteria = {
      _id: _id
    }
    const users = await customerDAO.deletes(criteria);
    if (!users.errors) res.status(200).json({ message: 'Success', result: users })
    else res.status(401).json({ message: 'Failure', result: users });
  } catch (error) {
    ctrlFile.deleteItem(req.body.avatar);
    return res.status(400).json({
      message: 'Something went wrong.',
      err:error
    });
  }
}
//API to import csv file 
let importCsvCustomer = async (req, res) => {
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
      const dell= await customerDAO.remove();
      const insert = await customerDAO.insert(result);
      if (!insert.errors) {
        res.status(200).json({ message: 'Success', result: insert });
      }
      else res.status(401).json({ message: 'Failure' })
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
  login: login,
  resetPassword: resetPassword,
  getEmployee: getEmployee,
  createEmployee: createEmployee,
  updateEmployee: updateEmployee,
  delEmployee: delEmployee,
  importCsvEmployee: importCsvEmployee,
  getCustomer: getCustomer,
  createCustomer: createCustomer,
  updateCustomer: updateCustomer,
  delCustomer: delCustomer,
  importCsvCustomer:importCsvCustomer,
}

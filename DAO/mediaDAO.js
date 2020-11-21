const mongoose = require('mongoose');
const Schema = require('../models/media');
const Models = mongoose.model('Media',Schema);
const get = criteria =>
  new Promise((resolve, reject) => {
    Models.find(criteria)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const create = objToSave =>
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then(client => resolve(client))
      .catch(err => reject(err));
  });
const insert = (objToSave) =>

  new Promise((resolve, reject) => {
    Models.insertMany(objToSave,{ ordered: true })
      .then(client => resolve(client))
      .catch(err =>   reject(err));
  });
  const remove = (objToSave) =>

  new Promise((resolve, reject) => {
    Models.remove(objToSave)
      .then(client => resolve(client))
      .catch(err =>   reject(err));
  });  
const update = (criteria, dataToSet, options) =>
  new Promise((resolve, reject) => {
    options.lean = true;
    options.new = true;
    Models.findOneAndUpdate(criteria, dataToSet, options)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const deletes = criteria =>
  new Promise((resolve, reject) => {
    Models.findOneAndRemove(criteria)
      .exec()
      .then(client => resolve(client))
      .catch(err => reject(err));
  });


module.exports = {
  update: update,
  create: create,
  deletes: deletes,
  get: get,
  insert: insert,
  remove:remove,
};
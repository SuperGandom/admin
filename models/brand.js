const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'brand name can\'t be empty', unique: true},
    desc: { type: String},

});
module.exports = Schema;
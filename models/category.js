const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'name can\'t be empty', unique: true },
    created_by: { type: String},
});
module.exports = Schema;
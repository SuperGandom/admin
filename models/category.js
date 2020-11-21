const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'name can\'t be empty', unique: true },
    description: { type: String},
    report: { type: String},
});
module.exports = Schema;
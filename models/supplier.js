const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'supplier name can\'t be empty', unique: true},
    detail: { type: String, required: 'supplier name can\'t be empty'},
});
module.exports = Schema;
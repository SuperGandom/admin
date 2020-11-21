const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'type can\'t be empty'},
    productID: { type: Object},
    price: { type: Number},
});
module.exports = Schema;
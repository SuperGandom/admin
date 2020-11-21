const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    productID: { type: Object},
    current: { type: Number, default:0},
    min: { type: Number, default:0},
    max: { type: Number, default:0},
})    
module.exports = Schema;
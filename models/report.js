const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    orderName: { type: String, unique:true},
    customer: { type: String},
    product: { type: String},
    category: { type: String},
    quantity: { type: Number},
    price: { type: Number},
    brand: { type: String},
    supplier: { type: String},
    customer: { type: String},
    created_at: { type: String},
    status:{ type: String, enum:["Delivered","Rejected"], default:"Delivered"},
});
module.exports = Schema;
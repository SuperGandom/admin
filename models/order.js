const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'name can\'t be empty', unique: true },
    customer: { type: String, required: 'Customer can\'t be empty' },
    product: { type: String, required: 'Product can\'t be empty' },   
    quantity: { type: Number, default:0},               
    total: { type: Number, default:0},
    order_at: { type: Date},
    status:{ type: String, enum:["On Hold","Delivered","Paid","Rejected"], default:"On Hold"},
});
module.exports = Schema;
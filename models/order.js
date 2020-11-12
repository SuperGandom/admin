const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'name can\'t be empty', unique: true },
    customer: { type: String,required: 'Customer can\'t be empty' },
    puchased: {
        type: Array //[['item',3],['item',5]]
    },
    total: {
        type: String,
        required: 'total can\'t be empty'
    },
    order_at: {
        type: Date
    },
    status:{
        type: String,
        enum:["On Hold","Delivered","Paid"],
        default:"On Hold"
    },
});
module.exports = Schema;
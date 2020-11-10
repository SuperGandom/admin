const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'name can\'t be empty', unique: true },
    customer: { type: String,required: 'Customer can\'t be empty' },
    puchased: {
        type: String
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
        enum:["Hold","delivered","rejected"],
        default:"Hold"
    },
});
module.exports = Schema;
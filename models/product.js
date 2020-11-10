const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    title: { type: String, required: 'title can\'t be empty', unique: true },
    category: { type: String,required: 'Category can\'t be empty' },
    regularPrice: {
        type: Number,
        default:0
    },
    salePrice: {
        type: Number,
        default:0
    },
    quantity: {
        type: Number,
        default:0
    },
    sku: {
        type: String,
    },
    image: {
        type: String,
    },
    detail: {
        type: String,
    },
    created_at:{
      type: Date,
      default: new Date()
    },
    status:{
        type: String,
        enum:["out of stock","in stock"],
        default:"in stock"
    },
});
module.exports = Schema;
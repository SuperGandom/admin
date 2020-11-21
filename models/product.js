const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    title: { type: String, required: 'title can\'t be empty', unique:true},
    detail: {
        type: String,
    },
    category: { type: String,required: 'Category can\'t be empty' },
    regularPrice: {
        type: Number,
        default:0
    },
    salePrice: {
        type: Number,
        default:0
    },
    taxRate: {
        type: Number,
        default:0
    },
    barcode: {
        type: Number,
    },
    brand: {
        type: String,
    },
    supplier: {
        type: String,
    },
    currency:{
        type: String,
        enum:["USD","Euro"],
        default:"USD"
    },
    created_at:{
      type: Date
    },
    currentStock: { type: Number, default:0},
    minStock: { type: Number, default:0},
    maxStock: { type: Number, default:100},
    status:{
        type: String,
        enum:["out of stock","in stock"],
        default:"in stock"
    },
});
module.exports = Schema;
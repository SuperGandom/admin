const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    productID: { type: Object, required: 'productID name can\'t be empty'},
    image: {
        type: Array,
    },
    video: {
       type: String,
    },
});
module.exports = Schema;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = new mongoose.Schema({
    username: { type: String, required: 'fullname can\'t be empty', unique: true },
    avatar: { type: String,required: 'Avatar can\'t be empty' },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [8, 'Password must be atleast 8 character long']
    },
    fullname: {
        type: String,
        required: 'fullname can\'t be empty'
    },
    email: {
        type: String,
        required: 'email can\'t be empty'
    },
    phone: {
        type: String,
        required: 'email can\'t be empty'
    },
    status:{
        type: String,
        enum:["on","off"],
        default:"on"
    },
});
module.exports = Schema;
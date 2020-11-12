require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const formData = require('express-form-data');
const app = express();
const bodyParser = require('body-parser');
var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' })
app.use(jsonParser);
app.use(urlencodedParser);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
//setting dist folder
app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.resolve(__dirname, "dist")));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "dist","index.html"));
});
app.use(cors());
app.use(morgan('dev'));
app.set('trust proxy', true);
require('./routes.js')(app);

module.exports = app;
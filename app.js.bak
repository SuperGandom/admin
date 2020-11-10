require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, '')));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true}));
app.use(bodyParser.json({ limit: '1000mb', extended: true}));
app.set('trust proxy', true);
require('./routes.js')(app);

module.exports = app;
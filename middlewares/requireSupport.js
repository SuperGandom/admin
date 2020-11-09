const jwt = require('jsonwebtoken');
const config = require('../config');

const requireSupport = (req, res, next) => {
  if (req.user.role==='support'||req.user.role==='admin'){
    next();
    
  } else{
    return res.status(401).json({
      message: "not an support account"
    });
  }
};

module.exports = requireSupport;

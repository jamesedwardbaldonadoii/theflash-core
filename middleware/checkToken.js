let jwt = require('jsonwebtoken');
const config = require('../config/keys.js');

let checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
	
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secretOrKey, (err, decoded) => {
      if (err) {
        return res.send(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.send(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
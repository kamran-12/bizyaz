const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config')

module.exports = async (req, res, next) => {
  let token = req.headers.auth
  if (token && token != 'null') {
    // console.log('there is token')
    try {
      let decoded = await jwt.verify(token, JWT_KEY);
      req.userId = decoded.userId;
      // console.log("id:",decoded.userId)
    } catch (error) {
      // console.log('error on decoding token:', error)
    }
  } else {
    // console.log('there is no token')
  }
  next();
}
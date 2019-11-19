//*4.1
const jwt = require('jsonwebtoken');
const secret = 'mysecrettoken';

module.exports = function(req, res, next) {
  // Get token form header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    
    next();
  } catch (err) {
    res.staus(401).json({ msg: 'Token is not valid' });
  }
};

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.id){
      req.user = { userId: decoded.id }
    }else{
      req.user = decoded
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

module.exports = auth;

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    };

    if (!token) {
      return res.status(401).json({msg: 'You are not logged!'})
    };

    const decodedToken = await promisify(jwt.verify)(
        token, 
        process.env.JWT_SECRET_KEY
      );

    if (!decodedToken) {
      return res.status(400).json({ msg: 'Invalid token' })
    }

    const user = await User
      .findOne({ _id: decodedToken.id })
      .select('-password')
      .populate({path: 'projects'});

    if (!user) {
      return res.status(400).json({ msg: 'User was deleted' });
    }
    
    req.userProjects = user.projects;
    req.user = user;

  } catch(err) {
    console.log(err);
    return res.status(500).json({ error: err })
  }
  
  next();
};
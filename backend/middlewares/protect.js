const User = require('../models/User');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = await User
    .findOne({ email: authorization })
    .select('-password')
    .populate({path: 'projects'})
  req.userProjects = user.projects;
  req.user = user;
  
  next();
};
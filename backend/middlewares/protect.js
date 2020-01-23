const User = require('../models/User');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const projects = await User
    .findOne({ email: authorization })
    .select('projects')
    .populate({path: 'projects'})

  req.userProjects = projects.projects;
  next();
};
const User = require('../models/User');
const Project = require('../models/Project');
const AppError = require('../models/AppError');
const { createAuthToken } = require('../utils/token-creator');

exports.getCurrentUser = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success', 
    user 
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body,
    });

    const bookmarks = Project.initBookmarks();
    const newProject = new Project({
      user: newUser._id,
      userProjects: [...bookmarks]
    });
    
    newUser.projects = newProject._id;
    await newProject.save();
    await newUser.save();

    const user = {
      _id: newUser._id,
      username: newUser.username      
    }

    createAuthToken(user, 201, req, res);

  } catch (err) {
      return next(new AppError(500, err)); 
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await user.isCorrectPassword(req.body.password, user.password))) {
      return next(new AppError(400, 'Credentials was wrong. Check your inputs'));  
    }
    
    const currentUser = {
      _id: user._id,
      username: user.username
    };

    createAuthToken(currentUser, 200, req, res);

  } catch (err) {
      return next(new AppError(500, err)); 
  }
};
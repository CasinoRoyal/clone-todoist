const User = require('../models/User');
const Project = require('../models/Project');
const { createAuthToken } = require('../utils/token-creator');

exports.getCurrentUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ msg: 'Fail'})
  }

  res.status(200).json({
    status: 'success', 
    user 
  });
};

exports.signup = async (req, res) => {
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

    createAuthToken(newUser, 201, req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await user.isCorrectPassword(req.body.password, user.password))) {
      return res.status(500).json({ msg: 'incorrect credentials' }); 
    }
    
    createAuthToken(user, 200, req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};
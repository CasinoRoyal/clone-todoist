const User = require('../models/User');
const Project = require('../models/Project');

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

    res.status(201).json({
      status: 'success',
      user: newUser
    });          
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

exports.login = async (req, res) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(500).json({ msg: 'incorrect credentials' }); 
  }

  res.status(200).json({
    status: 'success',
    user
  });
};
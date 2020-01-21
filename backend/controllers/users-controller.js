const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const newUser = new User({
      ...req.body
    });
    await newUser.save();
  
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }

  res.status(201).json({
    status: 'success',
    user: newUser
  });
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
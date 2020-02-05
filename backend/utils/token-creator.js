const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign(
    {id},
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.createAuthToken = (user, statusCode, req, res) => {
  const token = generateToken(user._id);
  const tokenOptions = { maxAge: 1000*60*60, httpOnly: true };

  res.cookie('token', token, tokenOptions);
  
  return res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};
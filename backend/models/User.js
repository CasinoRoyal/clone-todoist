const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Incorrect email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: true    
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
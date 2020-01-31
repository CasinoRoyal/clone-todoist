const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Please enter your password']    
  },
  confirmPassword: {
    type: String,
    validate: {
      validator(confirmPassword) {
        return confirmPassword === this.password
      },
      messsage: 'Incorrect password'
    }
  },
  projects: { type: mongoose.Schema.ObjectId, ref: 'Project' }
});

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.isCorrectPassword = async function(confirmPass, userPass) {
  return await bcrypt.compare(confirmPass, userPass);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
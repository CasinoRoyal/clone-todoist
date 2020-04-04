const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.ObjectId
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    minlength: [1, 'Task must contains characters']
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
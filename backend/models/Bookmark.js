const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required!']
  },
  tasks: []
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
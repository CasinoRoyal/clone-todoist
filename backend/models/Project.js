const mongoose = require('mongoose');

const bookmarksTitle = ['Inbox', 'Today', 'Next 7 days'];

const projectSchema = new mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  userProjects: [{
    isBookmark: {
      type: Boolean,
      default: false
    },
    title: String,
    tasks: [{ type: mongoose.Schema.ObjectId, ref: 'Task' }]  
  }]
});

projectSchema.statics.initBookmarks = function() {
   return bookmarksTitle.map(title => ({
     title,
     isBookmark: true,
     tasks: []
   }))
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
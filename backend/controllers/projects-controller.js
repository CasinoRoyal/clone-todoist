const Project = require('../models/Project');
//const User = require('../models/User');

exports.createProject = async (req, res) => {
  try {
    const currentProject = await Project.findOne({_id: req.userProjects._id});
    const newProjectValues = {
      title: req.body.title,
      tasks: []
    }
    currentProject.other.push(newProjectValues);

    await currentProject.save();

    res.status(201).json({
      status: 'success',
      project: currentProject
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ msg: err });
  }
}
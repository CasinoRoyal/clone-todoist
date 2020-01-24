const Project = require('../models/Project');

exports.getAllUsersProjects = async (req, res) => {
  try {
    const projects = await Project
      .findOne({ _id: req.userProjects._id })
      .populate({path: 'userProjects.tasks'});

    res.status(200).json({
      status: 'success',
      length: projects.length,
      projects: projects.userProjects
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err })
  }
};

exports.createProject = async (req, res) => {
  try {
    const currentProject = await Project.findOne({_id: req.userProjects._id});
    const newProjectValues = {
      title: req.body.title,
      tasks: []
    }
    currentProject.userProjects.push(newProjectValues);

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
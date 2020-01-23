const Task = require('../models/Task');
const Project = require('../models/Project');

exports.getAllTaskFromProject = async (req, res) => {};

exports.createTask = async (req, res) => {
  const { projectTitle } = req.params;

  try {
    const newTask = new Task({ body: req.body.task });
    const projectA = await Project.findOne({ _id: req.userProjects._id});
    
    projectA.userProjects.map(project => {
      if (project.title == projectTitle) {
        newTask.project = project._id;
        project.tasks.push(newTask);
      }
    });
    
    await newTask.save();
    await projectA.save();
    
    res.status(201).json({
      status: 'success',
      task: newTask
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err });
  }
};

exports.updateTask = async (req, res) => {};

exports.deleteTask = async (req, res) => {};
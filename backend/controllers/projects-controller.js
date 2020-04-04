const Project = require('../models/Project');
const Task = require('../models/Task');
const AppError = require('../models/AppError');

exports.getAllUsersProjects = async (req, res, next) => {
  try {
    const projects = await Project
      .findOne({ _id: req.userProjects._id })
      .populate({path: 'userProjects.tasks'});

    if (!projects) {
      return next(new AppError(404, 'User projects not found'))
    }

    res.status(200).json({
      status: 'success',
      length: projects.length,
      projects: projects.userProjects
    })
  } catch (err) {
    return next(new AppError(500, err))
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const currentProject = await Project.findOne({_id: req.userProjects._id});

    if (!currentProject) {
      return next(new AppError(400, 'User do not have any projects yet'))
    }

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
      return next(new AppError(500, err))
  }
}


exports.deleteProject = async (req, res, next) => {
  const { projectDeleteId } = req.body;
  try {
    const projects = await Project.findOne({_id: req.userProjects._id});
    
    if (!projects) {
      return next(new AppError(400, 'User do not have any projects yet'))
    }

    const filtredProjects = projects.userProjects.filter((project) => {
      if (!project.deleteble) {
        return next(new AppError(403, 'Delete is not allowed'));
      }

      return project._id != projectDeleteId;
    });

    projects.userProjects = filtredProjects;
    await projects.save();
    await Task.deleteMany({ project: projectDeleteId });

    res.status(201).json({ 
      status: 'success',
      projects
    });
  } catch (err) {
      return next(new AppError(500, err))
  }
}
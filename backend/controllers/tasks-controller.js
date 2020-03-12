const Task = require('../models/Task');
const Project = require('../models/Project');
const AppError = require('../models/AppError');

exports.createTask = async (req, res, next) => {
  const { projectId, task } = req.body;

  try {
    const newTask = new Task({ body: task });
    const currentUserProjects = await Project.findOne({ _id: req.userProjects._id});
    
    if (!currentUserProjects) {
      return next(new AppError(400, 'User do not have any projects yet'));
    }

    currentUserProjects.userProjects.map(project => {
      if (project._id == projectId) {
        newTask.project = project._id;
        project.tasks.push(newTask);
      }
    });
    
    await newTask.save();
    await currentUserProjects.save();
    
    res.status(201).json({
      status: 'success',
      task: newTask
    });
  } catch (err) {
      return next(new AppError(500, err));
  }
};

exports.bindTaskToAnotherProject = async (req, res, next) => {
  const { projectId, taskId } = req.body;
  try {

    const task = await Task.findOne({ _id: taskId  });
    
    if (!task) {
      return next(new AppError(404, 'Task not found or was deleted'));
    }

    const project = await Project.findOne({ _id: req.userProjects._id }) 
    
    if (!project) {
      return next(new AppError(404, 'Project not found or was deleted'));
    }

    // delete task from current project 
    project.userProjects.forEach((project) => {
      if (project._id.toString() == task.project.toString()) {
        const index = project.tasks.findIndex(({ _id }) => _id == taskId);
        project.tasks.splice(index, 1);
      }
    })

    // add task to new project and change task ref to new project
    project.userProjects.forEach((project) => {
      if (project._id == projectId) {
        task.project = project._id;
        project.tasks.push(task);
      }
    })

    await task.save();
    await project.save();

    res.status(200).json({ status: 'success' })
  } catch (err) {
      return next(new AppError(500, err));
  }
};

exports.archiveTask = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const task = await Task.findOne({ _id });

    if (!task) {
      return next(new AppError(404, 'Task not found'));
    }

    task.isArchived = !task.isArchived;
    await task.save();
    
    res.status(200).json({task})
  } catch(err) {
      return next(new AppError(500, err));
  }
};


exports.updateTask = async (req, res, next) => {
  const { _id, taskBody } = req.body;
  try {
    const task = await Task.findOneAndUpdate({ _id }, { body: taskBody });

    if (!task) {
      return next(new AppError(404, 'Task not found'));
    }

    res.status(200).json({task})
  } catch(err) {
      return next(new AppError(500, err));    
  }
};

exports.deleteTask = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const task = await Task.findByIdAndDelete({ _id });
    
    if (!task) {
      return next(new AppError(404, 'Task not found'));
    }

    res.status(204).json({ status: 'success' })
  } catch(err) {
      return next(new AppError(500, err)); 
  }
};

exports.getAllTaskFromProject = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ project: projectId });

    if (!tasks) {
      return next(new AppError(404, 'Project not found or was deleted'));
    }

    return res.status(200).json({
      status: 'success',
      tasks
    });
  } catch(err) {
      return next(new AppError(500, err)); 
  }
};
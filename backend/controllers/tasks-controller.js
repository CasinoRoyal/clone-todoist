const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  const { projectId, task } = req.body;

  try {
    const newTask = new Task({ body: task });
    const currentUserProjects = await Project.findOne({ _id: req.userProjects._id});
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
    console.error(err);
    return res.status(500).json({ msg: err });
  }
};

exports.bindTaskToAnotherProject = async (req, res) => {
  const { taskId } = req.params;
  const { projectId } = req.body;
  try {

    const task = await Task.findById({ taskId });
    if (!task) return res.status(404).json({ msg: 'task not found' });

    const project = await Project.findById({ projectId })
    if (!project) return res.status(404).json({ msg: 'project not found' });

    console.log(task);
    console.log(project)

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
};

exports.archiveTask = async (req, res) => {
  const { _id } = req.body;

  const task = await Task.findOne({ _id });

  if (!task) {
    return res.status(404).json({ msg: 'Task not found' });
  }

  task.isArchived = !task.isArchived;
  await task.save();
  
  res.status(200).json({task})
};


exports.updateTask = async (req, res) => {
  const { _id, taskBody } = req.body;

  const task = await Task.findOneAndUpdate({ _id }, { body: taskBody });

  if (!task) {
    return res.status(404).json({ msg: 'Task not found' });
  }

  res.status(200).json({task})
};

exports.deleteTask = async (req, res) => {
  const { _id } = req.body;
  const task = await Task.findByIdAndDelete({ _id });
  console.log(task)
  if (!task) {
    return res.status(404).json({ msg: 'Task not found' });
  }

  res.status(204).json({ status: 'success' })
};

exports.getAllTaskFromProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ project: projectId });

    if (!tasks) {
      return res.status(400).json({ msg: 'Project was deleted' });
    }

    return res.status(200).json({
      status: 'success',
      tasks
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ msg: err });    
  }
};
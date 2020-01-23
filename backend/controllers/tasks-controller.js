const Task = require('../models/Task');
const Project = require('../models/Project');

exports.getAllTaskFromProject = async (req, res) => {};

exports.createTask = async (req, res) => {
  const { projectId } = req.params;

  const userProjectsArray = req.userProjects.other.concat(req.userProjects.bookmarks);
  const currentProject = userProjectsArray.filter(project => {
    return project._id.toString() === projectId;
  })
  console.log(currentProject)
  try {
    const newTask = new Task({
      project: currentProject[0]._id,
      body: req.body.task
    });
    console.log(currentProject[0]._id)
    const projectA = await Project.findOne({$or:[{'bookmarks._id': currentProject[0]._id}, {'other._id': currentProject[0]._id}]});
    console.log(projectA)
    /*Проблема 1. Айдишник в квери проджекта возвращает снова объект, нам нужно
      узнать каким то образом в какой из проектов добавляеться таск
    */
    //await newTask.save();

    console.log(newTask);
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
const express = require('express');

const protect = require('../middlewares/protect');
const { 
  createTask, 
  archiveTask, 
  getAllTaskFromProject,
  updateTask,
  deleteTask,
  bindTaskToAnotherProject
} = require('../controllers/tasks-controller');

const router = express.Router();

router
  .route('/')
  .post(protect, createTask)
  .patch(protect, archiveTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask)

router
  .route('/moveTask')
  .post(protect, bindTaskToAnotherProject)

router
  .route('/:projectId')
  .get(protect, getAllTaskFromProject)

module.exports = router;
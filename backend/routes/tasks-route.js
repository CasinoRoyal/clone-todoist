const express = require('express');

const protect = require('../middlewares/protect');
const { 
  createTask, 
  archiveTask, 
  getAllTaskFromProject,
  updateTask
} = require('../controllers/tasks-controller');

const router = express.Router();

router
  .route('/')
  .post(protect, createTask)
  .patch(protect, archiveTask)
  .put(protect, updateTask)

router.get('/:projectId', protect, getAllTaskFromProject);

module.exports = router;
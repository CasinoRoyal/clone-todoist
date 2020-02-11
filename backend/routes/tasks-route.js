const express = require('express');

const protect = require('../middlewares/protect');
const { createTask, getAllTaskFromProject } = require('../controllers/tasks-controller');

const router = express.Router();

router
  .route('/')
  .post(protect, createTask)
//  .patch()
//  .delete()

router.get('/:projectId', protect, getAllTaskFromProject);

module.exports = router;
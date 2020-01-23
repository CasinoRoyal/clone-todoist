const express = require('express');

const protect = require('../middlewares/protect');
const { createTask } = require('../controllers/tasks-controller');

const router = express.Router();

router
  .route('/:projectTitle')
//  .get()
  .post(protect, createTask)
//  .patch()
//  .delete()

module.exports = router;
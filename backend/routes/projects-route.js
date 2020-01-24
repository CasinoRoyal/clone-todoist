const express = require('express');

const protect = require('../middlewares/protect');
const { createProject, getAllUsersProjects } = require('../controllers/projects-controller');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllUsersProjects)
  .post(protect, createProject)
  // .patch()
  // .delete()

module.exports = router;
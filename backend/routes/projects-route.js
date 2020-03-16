const express = require('express');

const protect = require('../middlewares/protect');
const { 
  createProject, 
  getAllUsersProjects, 
  deleteProject 
} = require('../controllers/projects-controller');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllUsersProjects)
  .post(protect, createProject)
  .delete(protect, deleteProject)
  // .patch()

module.exports = router;
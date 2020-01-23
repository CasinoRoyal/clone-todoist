const express = require('express');

const protect = require('../middlewares/protect');
const { createProject } = require('../controllers/projects-controller');

const router = express.Router();

router
  .route('/')
  // .get()
  .post(protect, createProject)
  // .patch()
  // .delete()

module.exports = router;
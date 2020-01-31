const express = require('express');

const { signup, login, getCurrentUser } = require('../controllers/users-controller');
const protect = require('../middlewares/protect');

const router = express.Router();

router.get('/', protect, getCurrentUser);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
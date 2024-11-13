const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authMiddleware);

router.get('/teachers', userController.getTeachers);
router.get('/students', userController.getStudents);
router.get('/profile', userController.getProfile);

module.exports = router;
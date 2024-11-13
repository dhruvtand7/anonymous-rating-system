const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authMiddleware);

router.post('/', feedbackController.submitFeedback);
router.get('/', feedbackController.getFeedback);
router.get('/admin', roleMiddleware(['Admin']), feedbackController.getAllFeedback);

module.exports = router;
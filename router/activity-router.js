const Router = require('express');
const controller = require('../controllers/activity-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();

router.get('/activities', authMiddleware, controller.getActivities);
router.get('/activities/:id', authMiddleware, controller.getActivityById);

router.post('/activities', authMiddleware, controller.createActivity);

router.patch('/activities/:id', authMiddleware, controller.patchActivity);

module.exports = router;

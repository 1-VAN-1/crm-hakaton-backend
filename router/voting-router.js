const Router = require('express');
const controller = require('../controllers/voting-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();

router.get('/voting', authMiddleware, controller.getVoting);
router.get('/voting/:id', authMiddleware, controller.getVotingById);

router.post('/voting', authMiddleware, controller.createVoting);

router.patch('/voting/:date', authMiddleware, controller.patchVoting);

module.exports = router;
